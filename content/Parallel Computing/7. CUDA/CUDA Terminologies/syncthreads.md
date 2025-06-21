[[CUDA]] [[Synchronization]] 

```C
__syncthreads()
```
You cannot synchronize across all the threads in the [[Grid]]. the threads in one block can only synchronize together, but cannot synchronize across [[Block|blocks]].

- called by a [[Kernel]] function
- the thread that makes the call will be held at the calling location until every thread in the block reaches the location

**threads in different blocks cannot synchronize!**

> [!important] No Global Barriers!
> Suppose there *is* global barriers. That means, all threads running in the [[Streaming Multiprocessor|SM]] must be call that barrier to move forward.
> 
> So, some blocks that is *in* the [[Streaming Multiprocessor|SM]] will be waiting at the barrier
> 
> But, there are left over blocks that are in the ready queue, and have not reached the barrier (they also *cannot reach the barrier* since they are not assigned to any [[Streaming Multiprocessor|SM]])
> --> deadlock

> [!important] Do not put `__syncthread` inside if/else
> - if you put `__syncthreads` inside the else, and another `__syncthreads` inside the if, these are not considered the same `__syncthreads`
> - so if part of kernels reach the one in if, the others reach else, they still nothing. **undefined behavior**

The only safe way to synchronize threads in different blocks is to terminate the kernel and start a new kernel for activities after the synchronization point.
> NVIDIA doesnt allow for synchronization across all the blocks. suppose there is one place in the kernel where you MUST have a global synchronization. the only way to ensrue this is to make sure that, at that line, you cut the kernel into two kernsl - i.e. make on kernel into two kernels at tha tpoint.

