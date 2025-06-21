---
aliases:
  - CUDA Memory
---

## CUDA Memory Model

See [[GPU Architecture#Basic GPU Hardware Memory|GPU Hardware Memory]]

**Global Memory**: main means of communicating R/W Data between [[Host]] to [[Device]]
- Contents visible to all threads
- long latency access

**Shared memory**
- per [[Streaming Multiprocessor|SM]]
- Shared by all threads in a [[Block]]

View of the GPU as seen by the *programmer*
![[CUDA Memory Model.png]]

Rectangles in orange are **under your control**.

Threads in the same block can talk to each other; threads in different blocks *cannot* talk to each other unless through global memory

Note that this diagram does not show cache: cache is *not* under your control

The diagram shows **registers** however, because in CUDA (unlike in MPI or OpenMP), you **have direct control over what goes into your register**
- the rule in CUDA is that every scalar variable in your kernel will be assigned to a register right away. so if you say int x, x will go to a register; float y, y will go to a register
- [[Streaming Multiprocessor|SM]] has **thousands** of registers

## CUDA Memory Allocation

Suppose we are trying to do vector addition:

```C
for (i=0, i<n, i++)
	C[i] = A[i]+B[i];
```

The three arrays `A`, `B`, `C` are in system memory (CPU)
- GPU cannot access system memory
- Need to send a copy of the array to the [[Device]]

![[gpu program steps.png]]

Part 1:
Then allocate memory in the device (dynamic allocation in global memory)
Then, copy the value of A and B in the system ([[Host]]) to the value of A and B in the [[Device]]. if you don't allocate but just move, you get a [[Segmentation Fault]]. and *you do not want segmentation fault on the device*.

[[CUDA Programming#`cudaMalloc`|cudaMalloc]]

Part 2:
launch the kernel code

[[CUDA Programming#Launching in a Kernel|Launching in Kernel]]

Part 3:
Once done, copy C (the results) from the device memory
Free device vectors
*Don't forget to free them! on average, the device memory size is smaller than the system one!*

[[CUDA Programming#`cudaMemcpy`|cudaMemcpy]]

```C
void vecAdd(float* A, float* B, float* C, int n)
{
    int size = n * sizeof(float);
    float* A_d, * B_d, * C_d;

    // 1. Transfer A and B to device memory
    cudaMalloc((void **)&A_d, size);
    cudaMemcpy(A_d, A, size, cudaMemcpyHostToDevice);
    cudaMalloc((void **)&B_d, size);
    cudaMemcpy(B_d, B, size, cudaMemcpyHostToDevice);

    // Allocate device memory for
    cudaMalloc((void **)&C_d, size);

    // 2. Kernel invocation code – to be shown later
	// A_d, B_d, C_d allocations and copies omitted
    // Run ceil(n/256) blocks of 256 threads each
    vecAddKernel<<<ceil(n/256), 256>>>(A_d, B_d, C_d, n);
	// each thread performs one pair-wise addition
	__global__
	void vecAddKernel(float* A_d, float* B_d, float* C_d, int n)
	{
	    int i = threadIdx.x + blockDim.x * blockIdx.x;
	    if (i < n)
	        C_d[i] = A_d[i] + B_d[i];
	}

    // 3. Transfer C from device to host
    cudaMemcpy(C, C_d, size, cudaMemcpyDeviceToHost);
    // Free device memory for A, B, C
    cudaFree(A_d);
    cudaFree(B_d);
    cudaFree(C_d);
}


```

### `cudaMalloc`
```C
cudaMalloc()
```
- allocates object (any data structure) in the device **global memory**
- requires two parameters
	- **address of a pointer** to the allocated object
	- **size** allocated object

```C
cudaFree()
```
- Free objects fromd evice Global Memory
- Parameter: pointer to freed object

For example, if you want to allocate an array of 64 x 64 floating point matrix:
```C
WIDTH = 64;
float* Md
int size = WIDTH * WIDTH * sizeof(float);

cudaMalloc((void**)&Md, size);
cudaFree(Md);
```

just to make `cudaMalloc` very generic, they typecast all the addresses with `void**`. after that, you can just use it like a real pointer.

So, simply, this is the size and then uc an use `Md` like a one dimensional array (`Md[...]`)

This will help us in part 1, which is allocating space.

### `cudaMemcpy`

Next, how to copy from one place to global memory?
```C
cudaMemcpy() // theres no typo here
```
- Memory data transfer
- requires four parameters
	- pointer to destination
	- pointer to source
	- number of bytes copied
	- type of transfer
		- host to host
		- host to device
		- device to host
		- device to device

> [!info] On types of transfer:
> The two mostly used is [[Host]] to [[Device]] or device to host. 
> - host to host is mostly for completeness. 
> - device to device is not copying from one GPU to another GPU memory. its actually from global memory of one device to global memory of the **same device**. sometimes ppl may use this to make an exact coy of an array.

Note that the transfers are **asynchronous**, or **non-blocking**

> [!important] `cudaMemcpy` cannot be used to copy between GPUs
> In a multi-GPU system, `cudaMemcpy` cannot be used to copy between GPUs. This is an advanced topic


![[CUDA memory allocation 2.png]]

`M` is a pointer to the source
`size` is how many bytes, and direction

## Launching in a Kernel

For more see [[Kernel]]

looks exactly like a function call - it has a name and it has arguments

In the middle, we have three triangular parenthesis and two numbers
- the one on the right is number of threads per block; the one on the left is total numbers of block.

Here, for example, the programmer decides to that 256 threads per block. ok, how many blocks? 

we use ceil to be safe

![[CUDA vector addition 2.png]]
![[gpu vector addition 2.5.png]]

this `__global__` means that called by the host, executed on the device. then, this code will be executed in every thread in every block, in that whole grid. every thread will ahve `int i`, every thread wil hae its own register. how many register? depends on how mnay local variables in the kernel, etc.

We have to ensure that the thread calculated by `i` is within the range. this is why we are putting this condition:  `if i < n)`. 

### Specifying Dimension

Now, we know programmer wants to use 2D block. how do we specify in <<< and >>> that we are using 2D?

```C
// Set up the execution configuration
// this is outside your code; this is also outside of CUDA Lol you can call it whatever
dim3 dimGrid(x, y, z);
dim3 dimBLock(x, y, z);

// launch the device computation threads!
MatrixMulKernel<<<dimGrid, dimBlock>>>(Md, Nd, Pd, Width);
```

Important:
- dimGrid and dimBlock are user efined
- gridDim and blockDim are built in predefined variable accessible in kernel functions

`dim3` is a type defined in `cuda.h` that is a small structure that contains three numbers, and its only used to tell CUDA runtime that we have 2D or 3D. (two numbers means 2D, but i assume then its `dim2`)

- Maximum dimensions of a block
- maximum numbers of threads per bock
- maximum dimensions of a grid
- maximum number of blocks per grid

## Examples
[[Matrix Multiplication (CUDA)]]

## Good Programming Configuration

Rule of thumb: in order to ensure best performance/parallelism, always look for **threads/sm** and try to **maximize it**. 
- this will ensure we have more [[Warp|warps]] than total number of [[Streaming Processor|SPs]], so we have more [[Latency Tolerance]] (we alway have more warps to put in when we need to wait)

## Advanced: Making the Best Use of GPU Memory System

How to make the best use of the GPU memory system?
How to deal with hardware limitation?

Measure of success: higher CGMA (Compute to global memory access)
### More On CUDA Memory

**Register Memory**
- Private to each thread
- Fastest type of memory
- Do not consume off-chip [[Bandwidth]].
- Only accessible by a thread.
- Lifetime of a thread

**Shared Memory**
- Accessible by all threads **within the same block**
- Located on the SM (Streaming Multiprocessor)
- Extremely fast
- Highly parallel
- Example: Fermi’s shared/L1 is 1+TB/s aggregate

**Global Memory**
- Accessible by **all blocks** in all grids
- Typically implemented in DRAM
- High access latency: 400-800 cycles
- Finite access bandwidth
- Potential of traffic congestion
- Throughput up to 936.2GB/s
	- Traffic congestion prevents all but a few threads from making progress.

**Constant Memory**
- Small, read-only memory (~64KB)
- Visible to **all threads and all blocks**
- Short latency and high bandwidth when all threads access the same Location

Overall goal: **reduce trip to global memory**

![[Screenshot 2025-04-29 at 2.34.20 PM.png]]

> [!error] Missing notes from recording 4/29/2025

| Variable declaration                       | Memory   | Scope  | Lifetime    |
| ------------------------------------------ | -------- | ------ | ----------- |
| `int LocalVar;`                            | register | thread | thread      |
| `__device__ __shared__ int SharedVar;`     | shared   | block  | block       |
| `__device__ int GlobalVar;`                | global   | grid   | application |
| `__device__ __constant__ int ConstantVar;` | constant | grid   | application |
(these are terms declared in [[Kernel]])

**Scope**: the range of threads that can access a variable  
**Lifetime**: the portion of the program’s execution when the variable is available for use

Notes:
- `__device__` is optional when used with `__shared__` or `__constant__`
- Automatic variables reside in a register (i.e. variables go directly to registers)
> [!example] `int x` ==> register

- Automatic array variables local to a thread reside in **local memory**.
> [!example] `int y[10]` ==> "local memory", which is actually global memory

> [!info] Local Memory Doesn't Exist!
> Does not physically exist. It is an abstraction to the local scope of a thread. Actually put in global memory by the compiler.
>
> From programmer's view, both `int x` and `int y[10]` are "local variable". But, from hardware view, the pointer is actually stored in the global memory, but CUDA Runtime will simulate it like local memory (only that, this part of the global memory is accessed per thread rather than by all the threads)
>
> This also tell us, from a pov of performance, try to refraine local variables from inside your kernel that do not fit inside your register.

In the above example...
- `LocalVar`, `SharedVar` must be declared within the kernel function body, and will only be available within the kernel code
- `GlobalVar`, `ConstantVar` must be declared outside of any function

In fact, about constant variables:
- Declaration of constant variables must be outside any function body.
- Currently total size of constant variables in an application is limited to 64KB.

By declaring a CUDA variable in one of the CUBDA memory types, a CUDA programmer dictates the **visibility** and **access speed** of the variable. 

### Reducing Global Memory Traffic
global memory is the slowest of them
- global memory access is performance bottleneck
- the lower **CGMA** (compute to global memory access) the lower the performance
- reducing global memory access enhances performance

Method: **[[Tiling]]**

### Memory as a Limiting Factor to Parallelism

The amount of **shared memory** and **registers** available per SM limits how many threads and blocks can be active at the same time.

One SM can host multiple blocks, but a block can only be scheduled if all its required resources fit. If a block uses all the shared memory or registers in the SM, no other blocks can run on that SM. Since all blocks in a kernel are the same, they all require the same amount of resources.

- More memory or registers per thread = fewer threads per SM
- More memory per block = fewer blocks per SM

A [[Block]] will not be [[Block#Block Scheduling|assigned]] to an SM unless it gets all the resources it needs.

#### Examples

**Registers**
- G80 architecture has 8,000 registers per SM (128,000 total across 16 SMs)
- Max of 768 threads per SM
- To fully utilize this, each thread can use up to 10 registers (8000 / 768 = ~10)
- If each thread uses 11 registers, thread count per SM drops
- For example, with 256 threads per block, using 11 registers per thread would reduce total threads from 768 to 512

**Shared Memory**
- G80 has 16KB shared memory per SM
- Up to 8 blocks per SM
- To reach this max, each block must use no more than 2KB (16KB / 8)
- If each block uses 5KB, only 3 blocks can be scheduled per SM


**Things to Watch Out For**

- Thread divergence
- Excessive use of local variables (may spill into global memory)
- High resource usage per block (registers, shared memory)
- See if shared memory can be used to reduce access to slower global memory

### Conclusion on Memory
- Using memory effectively will likely require the redesign of the algorithm
> i.e. see how many times we redid matrix multiplication
- the ability to reason about hardware limitations when developing an application is a key concept of **computational thinking**
