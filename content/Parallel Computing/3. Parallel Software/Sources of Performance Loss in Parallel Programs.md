## Extra Overhead

**[[Synchronization]]**: code barriers, forcing code to wait before moving forward

**[[Communication (Constraint)|Communication]]**

**Overhead of creating [[Threading|threads]] and [[Process (PL)|processes]]**
- Creating threads and processes are system calls, which have overheads.
- For multi-threaded code, it costs much less to call the OS 1 time to create 10 threads, then call the OS 10 times and create 1 thread each time.
- Also, creating a process is more expensive than creating a thread.
## Artificial Dependencies

These are:
- Hard to find (because its not a bug)
- May introduce more bugs
- A lot of efforts to get rid of

> [!note] More on Artificial Dependencies
> These are performance related "problems" that **comes from you**. They are not bugs, so they are hard to find. In fact, it's probably a good idea to start thinking about how to eliminate these dependencies from the beginning.
>
> Unlike other problems in parallel computing, artificial dependencies can be **totally eliminated**.

> [!example]-
> ```
int result; // Global Variable
> 
> main() {
> 	...
> 	for (...) // Outer Loop
> 	{
> 		modify_result(...);
> 		if (result > threshold)
> 			break;
> 	}
> } // end main
> 
> void modify_result(...) {
> 	...
> 	result = ...
> }
> ```
> 
> What is wrong with that program when we try to parallelize the iterations?
> *Basically you will get wrong result cuz like multiple threads accessing result.*
> 
> Easiest fix: **make `result` private**. This removes the "artificial" aspect (introduced due to bad programming)
> 
> Rule of thumb: **try as much as possible to avoid global variables**

**Contention due to hardware resources**
- Example: Suppose core is [[Hyperthreading]], if the two threads both need the execution unit, they will be competing for the execution units, the L1 [[Cache]], the interconnect for sending data up and down, etc.

**[[Cache Coherence#Cache Coherence and Sources of Performance Loss in Parallel Programs Performance|Cache Coherence]]**

**[[Load Balancing|Load Imbalance]]**

## Others
(i just don't know how to categorize these)

Extra Computation
- We know from [[Pro and Con of Multiple Processors|earlier]] that computation is fast in performance (communication -> memory access -> computation)
- However, that does not mean computation doesn't take time. We shouldn't give a parallel program 10 times the computation of a sequential program simply to expose more [[Parallelism]]
- It's ok to have a thread do some more calculations and omit some communication, but doing this on a large scale leads to tons of redundant extra calculation that can slow things down

Memory Access
- As a programmer, you should try to access memory sequentially - cache friendly code
- This kind of code also reduces coherence from kicking in (prevent false sharing)