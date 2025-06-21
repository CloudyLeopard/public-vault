Parallelism among instructions - overlapping execution of multiple instructions. 

> [!Info] Random History
> In the 90s, they designed new types of CPU where when they are executing your code (machine code, assembly code), they look at several instruction to see if they are independent

Techniques to exploit ILP:
- [[Pipelining]]
- [[Superscalar]] (Multiple Issue)
	- Out-of-order execution
	- [[Speculative Execution]] (branch prediction)
- Simultaneous multithreading (aka [[Hyperthreading]] technology)

*all of these require very little, if at all, work from the side of the programmer*

The measurement of success (performance) is different: **instruction per cycle (IPC)**. In one cycle, how many instructions finish?