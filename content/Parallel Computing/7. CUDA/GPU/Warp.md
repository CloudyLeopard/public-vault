A fundamental unit of dispatch in an [[Streaming Multiprocessor|SM]]

NVIDIA, up to this point, has defined each **warp** to be of 32 [[Threading|threads]] each.

Warps work because NVIDIA makes sure that all every [[Streaming Multiprocessor|SM]] has a number of [[Streaming Processor|SPs]] that are multiple of 32s. So, with warps, each thread can get its own SP

> [!info] Warps, Execution Unit, and Frontend
> any execution unit cannot exist by itself; it needs some hardware that fetches instruction and what not. NVIDIA decided that every 32 SPs inside an SM will share the same "frontend" (fetch code that issue, and instruction will go to the 32 SPs.)
> 
> If SM contains 128SP, that means there are 128/32=4 frontends. Those groups of 32 threads executing on the SP sharing the same frontend are called **warps**

There are two advantages to warps:
1. Don't require frontend for every SP. leave more space in chip to leave more SP; more parallelism
2. decouples relation between the number of threads per block and number of SPs per SM. 

**As a programmer, try to make the number of threads per bock as close to 32 as possible.**
## Scheduling

Once [[Block#Block Scheduling|a block is assigned to an SM]], it is divided into warps
- thread IDs within a warp are consecutive and increasing
- warp 0 starts with Thread ID 0 till thread ID 31, and so on.

Warp size is implementation specific
- but so far, all NVIDIA GPUs have warp of 32 threads


> [!Example] Example on Calculating Number of Warps
> lets say you have an Old GPU, where number of SPs/SM are 32 SPs. Assume that the programmer decides to have the block of 128 threads. How many warps are formed?
> 
> A: 128/32 = 4
>
> 
> Q: lets keep the number of SPs/SM 32. If programmer decides to have a block of 50 threads. how many warps?
> A: 2. One warp has first 32, the other warp has 18. but remember, when a warp is assigned threads, you take the whole 32 SPs of the warp. you cannot only take half a warp. so, you are underutilizing the SPs.
> cuz ull have 14 warps in teh SP doing nothing.

Warp is unit of thread scheduling in SMs.
- Partitioning is always the same (first 32 threads goes to firs twarp, etc.)
- We cannot determine which warp finishes first

## Branch Divergence

occurs when threads inside warps branches to different execution

(suppose we have 32 arrows in the diagram below)
Some of the threads will go into PathA, the other threads are doing nothing and just consuming power. When these are done, the other threads will start executing and the first few threads will wait and start consuming power.


![[GPU branch divergence.png]]

We executed if and else "sequentially" - **50% performance loss.**

from a programming pov, whenever we are writing in if-else inside kernel, start thinking is there a situation where i will have branch divergence. 

## Takeaway

based on this hardware description:
1. try to make number of threads per block as lock as possible to multiples of 32
2. be aware of number of scalar variables, because they may affect your kernel
3. be very careful whenever u put an if condition.
> example: if `threadIdx.x<16` - this will for sure cause branch diversion. some will for sure have if, some will for sure have else.

These are things that as a programmer you need to know, even if they are hardware.
