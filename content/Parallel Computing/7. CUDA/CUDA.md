**Compute Unified Device Architecture**
- Compute: does computation
- Unified: code looks like copy and paste ([[SIMD]])

Defacto language for writing [[GPU]] code for NVIDIA GPU

![[GPU toolkit or environment.png]]

General sequence of what happens:
**Kernel --> Grid --> Block --> Thread**
1. Start from [[Host]] (main function), until you reach a [[Grid|kernel]]
2. Programmer decides the dimension of [[Grid]] (how to organize blocks in a grid) and [[Block]] (how to organize threads in a block)
3. Send kernel to [[Device]] (basically the GPU)
4. Once done, go back to host (sequential code), where we can call on another kernel, and so on

![[CUDA general order.png]]

Cuda has [[Transparent Scalability]] (i think)
## CUDA Thread Indexing

See [[CUDA Indexing]]

## CUDA Memory and Programming

**arguably the most important note out of all of the CUDA notes**

See [[CUDA Programming]]

*random note thats important*: always try to maximize number of threads per SM (not number of blocks per SM, this doesn't matter *at all* cuz of warps and switching and latency tolerance)

### Matrix Multiplication

**example goes thru a lot of concepts**
See [[Matrix Multiplication (CUDA)]]
### Block Scheduling

- see [[Block]] for more on how blocks are scheduled into SMs
- And also [[Warp]] on what happens when a block is assigned into an SM
- Finally, [[Latency Tolerance]] (switching warps in and out costs nothing)

## CUDA Restrictions

[[CUDA Restrictions]]

## CUDA Myth

GPUs have very wide (1000s) SIMD machines
- NO, a CUDA warp is only 32 threads. The width is 32.
branching is not possible on GPUs
- Incorrect - we have branch, but we also have to deal with branch divergence
GPUs are power-inefficient
- Nope. GPUs consume more powers than multicore. But if you are running more GPU friendly code, you are getting way higher performance - performance per watt is quite good
CUDA is only for C or C++ programmers
- Not true, there are third party warppers fro Java, Python and more


## Some Exercises

**Exercise 1: Choosing the Best Block Configuration**

If an SM supports up to 1,536 threads and up to 4 blocks, which configuration results in the highest number of threads per SM?
- 128 threads per block → 4 blocks → 128 × 4 = 512 threads
- 256 threads per block → 4 blocks → 256 × 4 = 1,024 threads
- 512 threads per block → 3 blocks → 512 × 3 = 1,536 threads
- 1,024 threads per block → only 1 block fits → 1,024 threads

Best choice is 512 threads per block, using 3 blocks. That fills the SM completely with 1,536 threads.  

General rule: always try to [[CUDA Programming#Good Programming Configuration|maximize the number of threads per SM]], not the number of blocks. Maximum threads per SM is given in the exam or available through CUDA device queries in practice.


**Exercise 2: Vector Addition - Grid Configuration**
You have vectors of size 2,000. Each thread computes one output element. Block size is 512 threads.

To cover 2,000 elements:
- Minimum blocks needed: ceil(2000 / 512) = 4
- Total threads launched: 4 × 512 = 2,048

Even though only 2,000 threads are needed, 2,048 will be launched. In your kernel code, use a boundary check:
```
if (i < 2000) {
    c[i] = a[i] + b[i];
}
```
This prevents [[Segmentation Fault]] from extra threads accessing out-of-bound memory.

**Follow-up: Warp Divergence at Boundary**

[[Warp#Branch Divergence|Branch divergence]] happens when threads in the same [[Warp]] follow different execution paths. This can happen with boundary checks like the one above.

In this case:
- Threads from 0 to 1983 will all be active and aligned.
- Warp from thread 1984 to 2015 will have partial execution (some threads meet the condition, some don’t).
- Final warp (2016 to 2047) will be entirely outside the boundary and will do nothing. No divergence here, just idle. 

Only one warp (1984–2015) will experience divergence due to the boundary check.

**Exercise 3: 32 Threads per Block to Avoid __syncthreads()**

A CUDA programmer says they only use 32 threads per block to avoid writing [[syncthreads]], relying on the fact that a warp runs in lockstep.

Is this technically correct?

Yes. If a block has only 32 threads, it forms exactly one warp. All threads in that warp execute instructions together, so synchronization within that warp is effectively automatic.

Is this a good idea?

No. This approach is not future-proof. It assumes that warp size will always be 32 threads. If in the future NVIDIA increases warp size to 64:

- A block of 32 threads would underutilize the warp.
- You’d be using only half of the execution units; the other half would be idle.

If NVIDIA decreases warp size to 16:

- A block of 32 threads would now span two warps.
- [[syncthreads|Synchronization]] is no longer automatic across warps.
- Code that relied on lockstep behavior without barriers would now be incorrect.

You should always write CUDA code with explicit synchronization when needed, not based on assumptions about warp size. This ensures your code remains valid and efficient across different GPU generations.
