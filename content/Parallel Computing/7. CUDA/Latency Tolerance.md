Concept in [[CUDA]]

**Basically, with [[GPU]], switching warps takes *no* time**

When an instruction executed by the threads in a [[Warp]] must wait for the result of previously initiated long-[[Latency]] operation, the warp is not selected for execution -> **latency hiding**

> suppose when your block is assigned to SM, and divided into 4 warps. the number of [[Streaming Processor|SP]] in [[Streaming Multiprocessor|SM]] can execute two warps at the same time. And then, suppose one of the [[Warp]] needs to access [[CUDA Programming#CUDA Memory Model|global memory]], which is slow
> instead of keeping the warp there on the SPs waiting for global memory (which his a long latency operation), the hardware of SM will remove the warp and will put one of the two warps that are waiting in to be executed.

> another thing, if you have a [[syncthreads|barrier]] - a synchronization point - two warps will be there and execute until they reach the barrier. once they reach the barrier, the CUDA runtime will remove them and put in the two other warps. Now, all 4 warps have reached barrier ad they can continue

**Having long latency operation we can remove warp and put in another warp and hide the latency**

usually, when u have to wait, u can 
1. speed it up (i.e. use more advanced technology to speed up memory access) or 
2. hide it (while im watiing for memory, i will not just be idle; i will execute something else useful).

In some books, latency hiding is also called **latency tolerance**. I am not just waiting, but doing something useful.

By moving a warp and putting another warp in, takes almost 0 cycles. this is because **we do not have to do any context switching**. 

Scheduling does not introduce idle time -> **zero-overhead thread scheduling**

This is because [[Streaming Multiprocessor|SM]] gets all the [[Resource (CUDA)]] it needs at the beginning

Scheduling is used for tolerating long-latency operations.

![[GPU SM Latency tolerance.png]]

The above is an SM.

SFU: Special function units. they are not as many as SP, but they are pieces of hardware for specialized instruction, like for calculating tensors. we wont rlly be using it in this course.

The ability of tolerating long-latency operation is the main reason why GPUs do not dedicate as much area to cache memory and branch prediction mechanisms as traditinoal CPUs

> all of these things are trying to execute as many instruction as possible. here, we dont need [[Speculative Execution|branch prediction]] or [[Cache Coherence|coherence hardware]], it just depends on massive parallelism and having more threads then SP and then **we can just put in another warp when we gotta wait**


> [!important] Rule of Thumb
> To achieve good performance, try to alway maximize **threads/sm**. This ensures that we have more warps > SPs, so we always have more warps to put in when we have to wait for a warp. (switching warp takes no time)
