
GPU programming is *very different* from [[Processor|multicore]] programming

Suppose we have scalar program (i.e. sequential)
```C
float A[4][8];

fot (int i = 0; i < 4; i++) {
	for (int j = 0; j < 8; j++) {
		A[i][j]++;
	}
}
```
GPUs have thousands of execution units, we need MASSIVE amount of parallelism. So 32 threads - we can just do ++ ONCE. Dont think like multicore anymore.

## GPU Thread Organization

How do we divide the threads? Suppose the above example w/ 32 threads
- 4 groups of 8?
- 8 groups of 4?
- ...

**[[Block]]**: a group of thread in CUDA
**[[Grid]]**: function when sent to the GPU. you have to determine how many blocks in a grid, how many threads per block

> [!important] Block, Grid are software concepts

A grid and a block can be 1D, 2D or 3D. Dimension has no affect on performance - its only for fitting the problem size (e.g. matrix multiplication, you want 2D).

Example of 2D grid , where the blocks are also 2D
![[GPU block 2d 2d.png]]

## GPU Programming Model

![[gpu progamming model quick overview.png]]


When writing an application (e.g., in C), you need to decide which functions in the application are [[Suitable Applications for GPU|good candidates for GPU]], and send them to be executed in GPU.

These functions are called **kernels**. A [[Grid|kernel]] is a function marked to run on the GPU.

When a kernel starts executing, it becomes a **[[Grid]]**

An **application** can include multiple **kernels**.


Thread and Block Details
- **Threads in the same block** run on the **same SM**.
	- They can **share memory** and **cooperate**.
- A block is divided into **[[Warp|warps]]**, each made up of **32 threads each**.

> [!note] this warp size is a NVIDIA design choice, that has never been changed

- The **warp** is the basic unit of execution for the SM.

Threads from different blocks can only communicate using global memory, which is slower.

Each grid executes a kernel:
> We say each grid is a kernel. Every block in a grid executes the same piece of code ([[SIMD]]), but executing on different data.

## Scheduling Thread Blocks on SM

Connecting hardware concepts:
- [[Streaming Multiprocessor|SM]]
- [[Streaming Processor|SP]]
with software concepts:
- [[Threading|Thread]]
- [[Block]]
- [[Grid]]

![[gpu scheduling thread blocks on sm.png]]

Suppose programmer decides to use a 2D Grid and 2D Blocks 
- Blocks organized as 2D
- Threads organized as 2D within each block

The GPU’s **Thread Execution Manager** handles how these blocks are scheduled on the hardware

Suppose the program created 4 [[Block|blocks]].
Suppose the GPU has only 3 [[Streaming Multiprocessor|SMs]].

1. The Thread Execution Manager sees the available 4 blocks, to be scheduled into 3 SMs
2. It assigns 1 block per SM.
3. Once an SM finishes its assigned block, it will be given the next unassigned block.

NOTE: If an SM has enough resources (like registers and shared memory), it may run **more than one block at the same time**.

  
### Restrictions

- A [[Block]] must be **assigned fully** to an [[Streaming Multiprocessor|SM]] (i.e. cannot have half a block in an SM)
- Once a block is assigned to an SM, it has to stay there until the SM has finished working on the entire block (i.e. cannot move SM between cores, like in multicore when the core gets really hot)

#### Scheduling in NVIDIA GPUs

**Are You Limited by the Number of [[Streaming Multiprocessor|SMs]] When Choosing Number of [[Block|Blocks]]?** (i.e. cannot have more than 8 blocks when GPU has 8 SMs)

No. You can define as many blocks as you want, regardless of the number of SMs.

The GPU scheduler handles the assignment. It will queue blocks and assign them as SMs become available. If an SM has enough resources, it can even run multiple blocks at once.

This flexibility makes your code portable across GPUs with different numbers of SMs.
  

**Threads per [[Block]] vs. Number of [[Streaming Processor|SPs]] per SM**. Can you have a block that has more threads than the number of SPs?

You’re also not limited by how many SPs an SM has when choosing the number of threads per block. 

> intuitively, the answer is "no" because if there is a one-to-one relationship between Block and SM, then if theres more threads then SPs, and each SP run one thread, what happens to the extra threads?
> 
> but the answer is actually yes, because of *warps*

To solve this, NVIDIA introduced **[[Warp|warps]]**, which are fixed-size groups of 32 threads. When you define a block with, say, 64 threads, the hardware splits it into 2 warps. 

> [!important] Try to make each block of size 32 threads
> If you have 65 threads, you get 3 warps (32 + 32 + 1).

Every SM has a number of SPs that is always a multiple of 32. These 32 SPs share a single **frontend** (fetch, decode, and issue hardware). 

This means a warp executes in **lock-step**, or *together*: one instruction is fetched and sent to all 32 SPs, and they **execute it together**. Then the next instruction is fetched, and so on.

This setup leads to a key rule: if a warp has fewer than 32 threads, the rest of the SPs are idle. For example, a warp with 1 thread still takes up all 32 SPs—only one does work, and the other 31 wait. So it’s best to make the number of threads per block **as close as possible to a multiple of 32**.

Note that assigned warps can be removed before it is finished (and done so *very quickly*, unlike context switching in multicore). If a warp need stop do long latency operation (like access memory), other warps can proceed while the first warp waits for memory

> [!note] Why No Context Switching Time?
> This is because all the dependencies/registers and what not are already prepared and won't need to be changed or switched - every warp executes on the same code after all. We cover this later.

**Warp Scheduling**

There are two levels of scheduling, distributed to the thread scheduler

- Chip-level: a global work distribution engine schedules **blocks** to available SMs.
- SM-level: each SM’s warp scheduler assigns **warps** (groups of 32 threads) to its execution units ([[Streaming Processor|SPs]])

Benefit of warp model:
1. decouples number of threads per bock from number of SPs per SMs
2. Save space in SMs for execution units (one frontend for 32 SPs, rather than one for each SP)

It also lets GPUs run **multiple kernels from the same application at the same time**. 
- For example, if you write code using OpenMP with several CPU threads, each can launch its own kernel simultaneously. 
- Two **warps** from different blocks (or even different kernels) can be issued and executed simultaneously

You don’t manage warps directly in code—there’s no API for that. But like with caches, understanding how they work helps you write better-performing code. Specifically, try to use thread counts per block that are **multiples of 32** to avoid wasted SPs.


**Branch Divergence (Thread Divergence)**

A big performance issue arises when threads in a warp take different paths in an if-else statement. Since all 32 SPs execute the same instruction at once, they can’t take both branches in parallel. Instead:
- Threads where the condition is true run the “if” part while others stay idle.
- Then, threads where the condition is false run the “else” part while the rest stay idle.

This causes **sequential execution** of both paths within the same warp, reducing performance. This issue is called **branch divergence** or **thread divergence**. will be covered later

## GPU Parallelism


The parallel computing on GPUs can read 13,800+ GLOPS (FP32)
- available on laptops, clusters, etc.

GPU parallelism is doubling almost every year
> basically number of SPs

programming model scales transparently
- **Data parallelism**
> without any effort from your part, if you move your code from a GPU that has `x` SPs, to a GPU with `2x` SPs, assuming problem size is big enough, you will almost basically see a 2x performance increase

Multithreaded SPMD model uses application data parallelism and thread parallelism
- **SPMD** = Single Program Multiple Data (basically [[SIMD]], but nvidia doesnt like that name, cuz its technically not one instruction)

there are two important numbers in GPU environment:
1. CUDA version: tells you what new APIs are coming and so on, the higher the version the more APIs. version of language itself
> by the way, language evolves very fast; he needs to change the language like every 6 months; APIs get deprecated, new ones come, etc.
> need to review from their website new features and what not to see what APIs have been removed or added. NVIDIA does not care about backward compatibiltiy LOL

2. Compute capability: version number of teh GPU. higher compute capability = more feature GPU has. basically versio number of the hardware

![[GPU Compute capability.png]]

Compute capability will tell you something about the hardware
- e.g. the old Fermi has 16 SMs; the Ampere has 128 SMs

---
Notes i've taken down, verbatim. im too lazy to organize them

CUDA Cores/SM: number of cuda cores per sm; none will be less than 32, all are multiples of 32.
- Sometimes, you may see there are more SPs than SMs; the higher compute capability doesn't necessarily mean more SP/SM. sometimes NVIDIA may decide to decrease SPs/SMs. But they made the SPs faster (frequency)

By the way, SP frequency is much smaller than a traditional multicore.

if yuo multiple number of SM * SP/SM, you get the total number of SP in the whole thing
- In Ampere, we have a total of 4,096

Until Kepler, we couldnt do double flaoting point precision (hence no data in FP64 units)
- Turing also doesn't have - it was made for portable devices, so it was weaker than the others

Very recently, after machine learning become a buzz word, they decided to specialize in SPs (tensorcores) inside every SMs. 

What made NVIDIA very wealthy is that NVIDIA was doing GPUs, which stands for graphic processing units - calculating pixels and so on. The hello world for this is matrix multiplciation. ppl found machine and deep learning inference can be represented matrix multiplication
- GPU is very good at matrix multiplicatio
this is why NVIDIA now markets itself as a machine learning chip company thing

Threads/Warp: 32 all the way through.

We will not talk about things in the lower part, but it is important ot know sveral tings

Every SM has VERY LARGE number of registers
- in msot fo them we see like 65, 536. its not like a traditional CPU with like 8r gisters; no we have very alrge number
- unlike themulticore, the registers are under your control - you control which variable goes to which register, goes  to shared memory, or goes to global memory

Also important to konw that even though we decoupled threads per block from SPs/SMs, there is an upper bound on Threads/Block; and there is an upper bound on total blocks per grid

We also said that inside Sm we have two things: shared memory and L1 cache
- in new ones, "Config" means that, well in early GPU there is a piece of hardware has 64K and acts as whether 16K L1 cache, 48K shared memory, or otherway around, and using a specialized API to decide which configuration you want. Then, they decided after that to separate the L1 cache from the shared memory to be two pieces of the hardware
- Now, int he high end, they put them back again using the same piece of hardware, and use API to configure how much you want to be L1 cache and how much to be shared memory
- we wont be using it here rlly but its good to know they exist.