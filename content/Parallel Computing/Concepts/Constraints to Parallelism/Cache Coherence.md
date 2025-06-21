Keeping shared data consistent across multiple caches in a system with multiple processors. (Generally for [[Shared Memory System]]).

> [!info] *Pacheco* 2.3.5

On an important note: Cache coherence is to make sure that **all copies are coherent** - all copies have the latest value. It's *not to ensure that there are no unnecessary copies of the cache*
## The Cache Coherence Problem

Recall that CPU **[[Cache|caches]]** are controlled by system hardware, and programmers have no control over them. This is primarily a problem in [[Shared Memory System]], where each processor has its own cache. The problem arises two cores tries to write to the same memory [[Cache Block|block]].

![[cache example.png|200]]

> [!Example]- Example
> Suppose we have two cores, each core has a cache and a shared memory. Suppose each one of these two cores is running a thread, and both threads needs to access `x`, a global variable. Suppose `x` is not in both cache.
> - `x` will be brought into both cache. That means we will have **3** copies of the cache (1 in original memory, 2 copies in each cache)
> - As soon as one of the threads try to update `x`, there is a problem - we have TWO MORE COPIES OF THE `x`. Even worse, what if both two threads are trying to update the same `x`? (and this is not uncommon with threads - program becomes unpredictable)
> 
> More specifically, see the following:
> ![[cache coherence example.png|500]]
> 
> | Time | Core 0       | Core 1       | Comments                                                                                      |
> | ---- | ------------ | ------------ | --------------------------------------------------------------------------------------------- |
> | 0    | `y0 = x`     | `y1 = 3*x`   | After time 0, we have **3** copies of `x` <br>(cache 0, cache 1, and original copy in memory) |
> | 1    | `x = 7`      | No `x` usage |                                                                                               |
> | 2    | No `x` usage | `z1 = 4*x`   |                                                                                               |
> 
> Problem: after time 2, `y0=2`, but **what is z1**? We don't know, because we have 3 copies of `x`.

Solution: Cache Coherence!

## Cache Coherence Protocol Type

Summary:
- Snooping: everyone knows everything that happens on the bus. Hence whenever something is updated each core knows what happens
- Directory-based: a piece of hardware, it has a list of which hardware has a piece of cache block. So whenever global variable is udpated it also goges to the directory and goes to the right caches to update other caches
directory-based is more scalable so is more widely used

![[cache coherence protocols.png|400]]
### Snooping Cache Coherence

The initial solution to the cache coherence problem. It does the following:

1. The cores must share a bus
2. Any signal transmitted on the bus can be "seen" by all cores connected to the bus
3. When core 0, or any other core, updates the copy of `x` stored in its cache, it also broadcasts (the bus is a broadcast medium) this information across the bus
4. If another core is "snooping" the bus, it will see that `x` has been updated and it can mark its copy of `x` as invalid

In the above picture, the "bus" is the [[Interconnection Network|interconnect]]. However, it doesn't *have* to be a bus - as long as it supports broadcasts from each processor to all other processors.

Additionally, snooping works with both write-through and write-back caches. Write-through doesn't need additional traffic since cores simply can "watch" for writes, while write-back requires extra communication because updates don't get immediately send to memory.

However, this is not scalable (because the [[Shared Memory Interconnect#Bus Interconnect|bus is not scalable]]).

### Directory Based Cache Coherence

Uses a (hardware) data structure called a **directory** that **stores the status of each [[Cache Block|cache line]]**.
- When a variable is updated, the directory is consulted, and the cache controllers of the cores that have the variable's cache line in their caches will invalidate those cache lines.

> [!note] My Interpretation of Directory
> Basically like a metadata table that keeps track of which cache has what block of memory

If the caches in the system is empty, then the directory is empty. Once a block that contains a variable `x` is moved to cache 0, or cache 1, or both, it will be updated in the directory. 

Whenever global variable is updated, the system also goes to the directory to find and update other caches.

## Cache Coherence Protocols

There are **several coherence protocols**
- MESI
- MSI
- MOESI
- ...

### MESI

> [!warning] I did not organize this note

![[MESI Protocol.png]]
The protocol can be applied *snoopy* or *directory* based pov, but we will consider it from a directory pov since snoopy is not used anywhere.

Any block inside a cache will always be in one of the four states below:
- modified: I am the only one who has the copy, but modified and different from main memory
- shared: multiple core has access to the copy
- invalid: I do not have the copy (could be holding an incorrect one, or just not holding any)
- exclusive: i am the only one who has the copy, and identical to the main memory

Almost most of the arrows have two letters. The second letter is always `W` or `R` (read or write), the first letter is always `P` or `B` (Processor or Bus) (if a cache is initiated by me, it will be `P` - I THINK)

Suppose we are in **exclusive** state (I have a copy of the cache block). I decided to write to a cache block - so we are now **modified** state. If we keep writing to that same block, we are still in that same cache block

suppose another block on the core wants to read `x`. In order to for somebody else to read it, that means it needs to be updated in the directory.
- now, they will get a cache miss, so either they will get the block from me or get memory from the other cache depending on the design. *Now, both caches will have a copy* - now it moves from **modified** to **shared**.
- If somebody else keeps reading from it, it's still shared

Now, what if somebody else has a copy of the block and needs to write to that block. In order for that to happen, i must *invalidate my copy* so that the other person has *exclusive* ownership
- you will not be able to write to a block unless you have *exclusive* ownership

**Modified** to **Invalid**:
- to get to modified we basically write first (exclusive -> modified)
- But if somebody else needs to write to it, they will get a cache miss, and they will get *exclusive* ownership of the block, and so i have to invalidate mine.

> [!Question]
> Is the states for each cache? like each cache will have a different state for a cache block
> 
> **ANSWER**: The state is for *every cache block for every cache* - e.g. a cache block can be invalid in one cache and shared in another one.
> 
> *Every cache block in every cache has its own MESI graph*


> [!question] (double check if true)
> An invalid cache remains invalid when it observes a bus read
> As long as i dont want to read or write to my cache block, it will remain invalid. i do not care about what other poeple need for the block. But as long as I decided that i don't need it (i.e. using P) i will remain invalid.



**PR/~S**: suppose i need to read or write `x`.
- for read `x`, if nobody has a copy of `x` cache block and i also do not, then i will have exclusive ownership
	- if i do not have it, but someone else has it, then when i read `x` it will become shared
	- Hence the ~S: means *nobody else has a copy of that block* (not shared) - hence Invalid -> Exclusive happens when its PR/~S (i wanna read it and nobody else has a copy of that blocked)

## Cache Coherence and [[Sources of Performance Loss in Parallel Programs|Performance]]

Cache Coherence is bad for performance! Primarily, cache coherence is needed for [[Synchronization]]. There are three reasons they are bad

1. Extra bandwidth (scarce resource)
2. Latency due to the protocol: cache coherence and its required operations inherently adds time, causing performance loss

| Cache Coherence Protocols                                                                                                                                             | Effects                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Directory "stops/delays" the core that wants to write back, and has to wait until all invalidation is done                                                            | Stopping the core obviously affects performance          |
| Other caches, if any, will [[Cache Coherence#MESI\|invalidate]] (i.e.) remove the block from their caches. This increases the number of cache misses                  | Cache miss means fetching data from memory which is slow |
| Directory needs to tell other blocks to invalidate their cache blocks; After invalidation, there is more communication to tell other blocks that they are invalidated | Communication overhead (time in interconnect)            |

3. False Sharing: when you update different variables, if they are **in the same [[Cache Block]]**, cache coherence will think you are updating the same thing!

For more on false sharing (and a rlly good example), see [[False Sharing]]

