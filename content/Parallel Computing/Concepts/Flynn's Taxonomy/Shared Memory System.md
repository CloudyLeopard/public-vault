One of two types of [[MIMD]] System.

> [!info] *Pacheco* 2.3.3

Collection of **autonomous processors/cores** is **connected to a memory system** via an **interconnection network**.

Each processor/core can access each memory location.
The processors/cores usually communicate implicitly by accessing data shared in memory

Works with [[Threading|threads]]

![[shared memory system.png]]

A multicore processor has multiple [[Core|CPUs or cores]] on a single chip. Cores typically have private level 1 caches. In a shared memory system with multiple multicore processors, there are two types of interconnect:
1. **uniform memory access**: interconnect connect all processors directly to main memory.
	- time to access all memory locations is the same for all cores
	- usually easier to program (since programmer doesn't need to worry about different access time to memory location)
2. **nonuniform memory access**: each processor has direct connection to a block of main memory, and processors access each other's blocks of main memory through special hardware built into processor
	- memory location to which a core is directly connected can be accessed more quickly than a memory location that must be accessed through another chip
	- faster access to directly connected memory, and has potential to use larger amounts of memory than UMA.


> [!info] Example
> Suppose one CPU wants access `addr1`, and another CPU wants `addr2`. Assume we do not have cache. The two CPUs will *not* see the same **memory access delay**.
> 
> Answer: **Banks**. The first bank will contain addr 0-31, second bank will contain 32-63, etc. 
> - If two CPUs or cores access the same bank, one gotta wait for the other
> - If two CPUS or cores access two different banks, they will respond differently too if the system is **non uniform**
