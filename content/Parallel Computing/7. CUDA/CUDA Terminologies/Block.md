**Block**: a group of [[Threading|threads]] in [[CUDA]]

Every thread inside a block will be executed by an [[Streaming Processor|SP]].  all the blocks will execute the exact same code of the kernel, but different data
- They get different data by using [[CUDA Indexing]]

Can be 1D, 2D or 3D (dimension has no affect on performance; its to fit the problem)

![[GPU Block.png]]

## Dimensions

`blockDim`
- Type: `dim3`
- Dimension of the block, or how many threads exist in each direction (x, y, z) of the block
- `blockDim.x, blockDim.y, blockDim.z`

`threadidx`
- Type: `uint3`
- Index of current thread within its block
- `threadIdx.x, threadIdx.y, threadIdx.z`
- Ranges from: 0 to `blockDim.{x,y,z} - 1`

## Block Scheduling

To be assigned to an [[SM]], a block needs to have all its [[Resource (CUDA)|resources]] (registers, shared memory, number of threads, ...) assigned beforehand.

> [!info] Why? Because [[Latency Tolerance]]
> Blocks may get broken up into [[Warp|warps]] (sometimes block size ≠ warp size). Thus, when I remove a warp from the SM, and put in another warp, it needs to happen *simultaneously* (i.e. no time wasted doing context switch)

CUDA runtime automatically reduces number of blocks assigned to each SM until **resource usage** is under limit. Example:
- Suppose SM has enough resources to schedule 2.5 blocks ==> assign 2 blocks
- If enough resource for 1 block ==> assign 1 block
- If enough resource for 1.99 block ==> assign 1 block

[[Runtime]] system:
- maintains a list of blocks that need to execute
- assigns new blocks to SM as they compute previously assigned blocks.
	- when SM finishes executing a block, SM gets another block

> [!note] Evidence of Why Knowing Hardware Matters
> sometimes, people who do not know how hardware works, may find their code works very well. But then they add one more variable - no drastic change. once they did this, they realize - the performance dropped by 40%! Just by adding one variable!
> 
> When we add this one variable, `int x`, that means every thread will add an `int x`. This is because `x` is a scalar. if we make `int x, y`, every thread will have its own `int x, y`. the number of registers increased! it needs registers for `x`, and `y` to accomodate for each block. By adding one variable, its made the whole thing slower.

