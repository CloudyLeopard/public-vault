See [[Matrix Multiplication (PC)]]

Matrix multiplication is *very suitable* for [[GPU]] (it matches the [[Suitable Applications for GPU|four conditions]])
- [[Data Level Parallelism]]

> [!info] Matrix Storage
> Recall how matrices are stored in C: [[Matrix Multiplication (PC)#Matrix in C|Matrix in C]]
> ![[storing matrix in C.png]]
>
> In order to make our lives easier, we will access 2D matrix as if its 1D:
> if i want to access `M[i][j] = M[i*row_size + j]`

We will do exactly same as we did in [[CUDA Programming#CUDA Memory Allocation|vector addition]]
1. allocate and initialize matrix M, N, P; I/O to read the input matrices M, and N
2. M * N on the device (`MatrixMultiplication(M, N, P, Width)`)
3. I/O to write output matrix P, free matrices M, N, P

## Sequential Code

```C
// Matrix multiplication on the (CPU) host
void MatrixMulOnHost(float* M, float* N, float* P, int Width)
{
    for (int i = 0; i < Width; ++i) {
        for (int j = 0; j < Width; ++j) {
            double sum = 0;
            for (int k = 0; k < Width; ++k) {
                double a = M[i * Width + k];
                double b = N[k * Width + j];
                sum += a * b;
            }
            P[i * Width + j] = sum;
        }
    }
}
```

## CUDA Version 1

```C
void MatrixMultiplication(float* M, float* N, float* P, int Width)
{
    int size = Width * Width * sizeof(float);
    float* Md;
    float* Nd;
    float* Pd;

    // 1. Transfer M and N to device memory
    cudaMalloc((void**)&Md, size);
    cudaMemcpy(Md, M, size, cudaMemcpyHostToDevice);
    cudaMalloc((void**)&Nd, size);
    cudaMemcpy(Nd, N, size, cudaMemcpyHostToDevice);

    // Allocate P on the device
    cudaMalloc((void**)&Pd, size);

    // 2. Kernel invocation code – to be shown later
	// Matrix multiplication kernel – thread specification
	__global__ void MatrixMulKernel(float* Md, float* Nd, float* Pd, int Width)
	{
	    // 2D thread ID
	    int tx = threadIdx.x;
	    int ty = threadIdx.y;
	
	    // Pvalue stores the Pd element that is computed by this thread
	    float Pvalue = 0;
	
	    for (int k = 0; k < Width; ++k) {
	        float Mdelement = Md[ty * Width + k];
	        float Ndelement = Nd[k * Width + tx];
	        Pvalue += Mdelement * Ndelement;
	    }
	
	    // Each thread writes one element of the result matrix
	    Pd[ty * Width + tx] = Pvalue;
	}

    // 3. Transfer P from device to host
    cudaMemcpy(P, Pd, size, cudaMemcpyDeviceToHost);
    // Free device matrices
    cudaFree(Md);
    cudaFree(Nd);
    cudaFree(Pd);
}
```


Matrix multiplication dictates the geometry of the block (2D, every thread has two dimensions/numbers `threadIdx.x`, `threadIdx.y`) and the grid

We get the element in the matrix, add them to `Pvalu`, then we put the value to the matrix `Pd`.

look closely at this code. 
Q: the variable called `Pvalue`: why is it needed? why not just write directly to `Pd[...]` immediately? Why did the programmer here decide to use `PValue`?
A: accessing register (where `Pvalue` is stored) is faster than accessing the global memory where the `Pd` is stored
This is reducing the number of trips to the global memory.

## CUDA Version 2

> [!info] Shortcoming of previous version
> Main shortcoming of the previous version: can only handle 16 elements in each dimension
> - we used 1 block, and a block in most GPUs is limited to 512 threads (1024 in newer GPUs)
> - Can only handle a small matrix; our GPU is 1024x1024, still a very small matrix.
> 
> Need to introduce blocks to be able to deal with matrix multiplications that is very large:

Divide `Pd` into a small tile. we calculate the title such that it covers the whole thing (Pd). each block calculates one tile (this will dictate the block size
- each thread calculates on eleemnt
- block size equals tile size

![[cuda matrix multiplication visualization 2.png]]

We modify the kernel invocation code to be the following:
```C
// Setup the execution configuration
dim3 dimGrid(Width / TILE_WIDTH, Width / TILE_WIDTH);
dim3 dimBlock(TILE_WIDTH, TILE_WIDTH);

// Launch the device computation threads!
MatrixMulKernel<<<dimGrid, dimBlock>>>(Md, Nd, Pd, Width);

__global__ void MatrixMulKernel(float* Md, float* Nd, float* Pd, int Width)
{
    // Calculate the row index of the Pd element and M
    int Row = blockIdx.y * TILE_WIDTH + threadIdx.y;
    // Calculate the column index of Pd and N
    int Col = blockIdx.x * TILE_WIDTH + threadIdx.x;

    float Pvalue = 0;
    // each thread computes one element of the block sub-matrix
    for (int k = 0; k < Width; ++k) {
        Pvalue += Md[Row * Width + k] * Nd[k * Width + Col];
    }

    Pd[Row * Width + Col] = Pvalue;
}
```
Every thread uses `blockIdx` and its own `threadIdx`, and the **width dimension** and **tile length** to decide which elements `i` will be working on. ([[CUDA Indexing]])

## CUDA Version 3

uses the idea of [[Tiling]] to make the best out of [[CUDA Programming|CUDA Memory]] by increasing CGMA

![[Screenshot 2025-04-29 at 2.47.53 PM.png]]
Assuming matrices are all square. tile width is 2

P(0, 0) is done by thread(0, 0), and will be calculated from top to bottom.

![[Screenshot 2025-04-29 at 2.48.55 PM.png]]

First, remember that `M` and `N` are stored in [[CUDA Programming#`cudaMalloc`|global memory]]

However, notice this:
- thread (1,0) and thread (1,1) will both access N(1, 0)
- thread (0, 0) and thread (1, 0) will both access M(1, 0)
==> REDUNDANCY IN GLOBAL MEMORY ACCESS

We want to reduce global memory access. What if we make one thread get (for example) M(1, 0) and **put it in shared memory?** (shared memory faster than global memory)

That's the whole idea of tiling:
- Make threads that use common elements collaborate
- each thread can load different **incomplete notes**
	- Each thread can load different elements into the shared memory. 
	- Maybe thread (0,0) will load M(1, 0); while doing this, thread (1, 0) will load N(1, 0) and so on. 
- These elements will be used by the thread that loaded them and other threads that share them.

![[Screenshot 2025-04-29 at 2.53.53 PM.png]]

**Tile width is determined by how much shared memory is available**. The size of the tiles, along with the dimensions of the input matrices, affects how many **phases** the computation requires.

A **phase** consists of:
1. Loading a tile into shared memory
2. Performing partial computation
3. Repeating for the next tile

Example: If you can load 10 elements at a time into shared memory, and each matrix row/column has 50 elements, then you’ll need 50 / 10 = 5 phases to complete the full computation.

Using larger tiles (`NxN` blocks) reduces global memory access. The potential reduction in memory traffic is roughly proportional to the tile size. For NxN blocks, the traffic reduction factor is `N`.  

If a matrix has size `M` and tile size is `TILE_WIDTH`, then the dot product will be performed in `M / TILE_WIDTH` phases.

```C
__global__ void MatrixMulKernel(float* Md, float* Nd, float* Pd, int Width)
{
    // 1. Allocate shared memory for sub‐tiles of M and N
    __shared__ float Mds[TILE_WIDTH][TILE_WIDTH];
    __shared__ float Nds[TILE_WIDTH][TILE_WIDTH];

    // 2. Compute this thread’s block and thread indices
    int bx = blockIdx.x;
    int by = blockIdx.y;
    int tx = threadIdx.x;
    int ty = threadIdx.y;

    // 3. Identify the row and column of the Pd element to work on
    int Row = by * TILE_WIDTH + ty;
    int Col = bx * TILE_WIDTH + tx;

    // 4. Accumulate the partial dot‐product
    float Pvalue = 0.0f;

    // 5. Loop over all sub‐tiles of M and N required to compute Pd[Row,Col]
    for (int m = 0; m < Width / TILE_WIDTH; ++m) {
        // Collaborative load of M and N tiles into shared memory
        Mds[ty][tx] = Md[Row * Width + (m * TILE_WIDTH + tx)];
        Nds[ty][tx] = Nd[(m * TILE_WIDTH + ty) * Width + Col];

        // 6. Synchronize to make sure the tiles (needed
			// elements) are loaded
        __syncthreads();

        // 7. Multiply the two tiles together
        for (int k = 0; k < TILE_WIDTH; ++k) {
            Pvalue += Mds[ty][k] * Nds[k][tx];
        }

        // 8. Synchronize to make sure that computation using
        //    this tile is done before loading the next tile
        __syncthreads();
    }

    // 9. Write the result for this element
    Pd[Row * Width + Col] = Pvalue;
}
```

Note: in line 11 and 14, we have [[syncthreads|barriers]]. We cannot start calculating until we are sure that the stuff are in the shared memory, or that we need to make sure calculations are completed before we move onto the next iteration and load.

Note: this is a lot more complicated lol compared to previous versions, but because of these complications you can be much higher performance. this is one of the main reason that made machine learning much more effective today.

Performance increase
- 86.4 GB/s global memory bandwidth
- in matrix multiplication, if we use 16x16 tiles -> reduction in memory traffic by a factor of 16
- Global memory can now support ((86.4 / 4) x 16) = 345.6 gigaflops -> very close to the peak (367 gigaflops)