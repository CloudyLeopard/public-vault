Multiple instruction, multiple data. A type in [[Flynn's Taxonomy]].

> [!info] *Pacheco* 2.3.3

Supports multiple simultaneous instruction streams operating on multiple data streams. Typically consist of a collection of fully independent [[Core|processing units or cores]], each of which has its own ==control unit== and its own ALU.
- Example: multicore processors, multiprocessor systems

Unlike [[SIMD]], MIMD are usually **asynchronous** (processor can operate at their own pace). In other words, there are no global clock, and there may be no relation between the system times on two different processors. In fact, unless programmer puts in some synchronization, processors could be executing different statements at some instant even if they are given the same sequence of instructions.

## MIMD Classification

MIMD can be classified based on how memory is designed:
- [[Shared Memory System]]
- [[Distributed Memory System]]

> [!note]- More on MIMD and Programmability
![[SIMD MIMD summary.png]]
> - Master Worker: one node is more important than the others
> - SMP (Symmetric Multi Processor): All nodes are the same
> 
> [!important] Importance of Progammability Example
> There was one famous processor - and it went really viral and used in the Play Station 3, but then it died. It died because it was *very hard to program*.
> - Think about writing a parallel program where not every core is equal in terms of performance, but also in importance (one is generic (master), others are specialized (9 workers))
> - So, one of the important thing in hardware design, is **progammability** - you want to design a program that is very easy to code

## Interconnection Networks

The interconnect affects performance of both distributed and shared memory system. This is because [[Communication (Constraint)|communication]] is *very expensive*.

There are two categories:
1. [[Shared Memory Interconnect]]
2. [[Distributed Memory Interconnect]]

For more, see [[Interconnection Network]]