## Grid and Block Dimension

CUDA threads are organized in **[[Grid|grids]] of [[Block|blocks]]**, and **[[Block|blocks]] of [[Threading|threads]]**. There are four key built-in variables to understand how this structure works:

*These variables do not need to be initialized to be used*

`gridDim`
- Type: `dim3`
- Dimensions of the grid, or how many blocks exist in each direction (x, y, z) of the grid
- `gridDim.x, gridDim.y, gridDim.z`

`blockIdx`
- Type: `uint3`
- Index of current block within the grid
- `blockIdx.x, blockIdx.y blockIdx.z`
- Ranges from 0 to `gridDim.{x, y, z}-1`

`blockDim`
- Type: `dim3`
- Dimension of the block, or how many threads exist in each direction (x, y, z) of the block
- `blockDim.x, blockDim.y, blockDim.z`

`threadidx`
- Type: `uint3`
- Index of current thread within its block
- `threadIdx.x, threadIdx.y, threadIdx.z`
- Ranges from: 0 to `blockDim.{x,y,z} - 1`

> [!info] Connection to [[MPI]] and [[OpenMP]]
> In MPI, we have [[Rank]]; in OpenMP, we have tid; here, we have `blockIdx`.

### Blocks

Divide monolithic thread array into multiple blocks
- threads within a bock cooperate via **shared memory**
- threads in different blocks cannot cooperate except through global  memory

> threads in different blocks cannot use shared memory, has to use global memory or memory of the GPU card.

![[gpu blocks.png]]


### Thread Indexing

A common and fundamental challenge in CUDA programming is figuring out **which data element each thread should work on**—especially in large data-parallel problems like adding two big vectors.

![[GPU IDs.png]]

But we do this to make life easier, actually. imagine if everything is 1D, it will not be easy at all if you have to do matrix multiplication or astrophysics where stars are interacting with each other in 3 dimension. this is why you are given flexibility to organize things in 1d, 2d or 3d.

Let’s say you’re adding two large arrays `a` and `b`, and storing the result in array `c`. Each thread handles one element, so the total number of threads equals the number of elements. For simplicity, let’s work with a 1D layout: 1D grid and 1D blocks.

To get the **global index** of a thread (i.e., which element of the array it’s responsible for), you use the built in variables from above like:

```
int i = blockIdx.x * blockDim.x + threadIdx.x;
```

Intuition: index of the block in the grid * number of threads per block + index of the thread in the block
- intuitively its really similar to how C index 2d array ([[Matrix Multiplication (PC)#Matrix in C|matrix in C]])

**Example**

You have two arrays of 10 elements. You launch 2 blocks, each with 5 threads. That gives you 10 total threads. With 10 elements, each thread is responsible for 1 element.

What element will thread 2 in block 1 be responsible for in arrays `a` and `b`?

- `threadIdx.x = 2`
- `blockIdx.x = 1`
- `blockDim.x = 5`

Then:
```
i = 1 * 5 + 2 = 7
```

So thread 2 in block 1 handles element 7 of arrays a, b, and c.

![[GPU parallel threads.png]]

This kind of indexing is simple when:
- Each thread processes exactly one element
- Layout is 1D

It gets trickier when:
- Each thread handles **multiple** elements
- Layouts are **2D or 3D**

  
For example, if arrays have 100,000 elements. You need to figure out the start and end of each for loop (each thread will need to process a chunk of the array, instead of just one single element)

could be something like this (chatgpt generated)
```
int i = blockIdx.x * blockDim.x + threadIdx.x;
int stride = blockDim.x * gridDim.x;

for (; i < N; i += stride) {
    c[i] = a[i] + b[i];
}
```
### 1D Grid of 1D Blocks
```C
i = blockIdx.x * blockDim.x + threadIdx.x;
```
### 1D Grid of 2D Blocks

```C
i = (blockIdx.x * blockDim.x * blockDim.y) + (threadIdx.y * blockDim.x) + threadIdx.x;
```

## Decision GPU Programmer Makes

1. which Part(s) of the program will be executed on the GPU?
> need to determine the kernels
2. how many total threads will you spawn
3. how many blocks? that is, how many threads per block?
4. What iwll be the geometry of the block (1D, 2D or 3D)?
5. what will be the geometry of the grid (1D, 2D or 3D)?

if you make this five decisions well (not just correctly), then you will get much higher performance then if you run it on the multicore.
