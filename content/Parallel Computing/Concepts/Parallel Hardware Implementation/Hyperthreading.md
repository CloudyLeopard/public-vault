Also known as **Simultaneous Multithreading (SMT)**.

> [!info] *Pacheco* 2.2.6

Ability for instructions to be fetched from more than one thread. Example: media player being written in multiple thread, and we get them from both (using ONE processor)
- This exploits [[Superscalar]] processors by allowing multiple threads to make use of the multiple functional units (thus, hyperthreading needs to also be [[Pipelining|pipelined]])
- *However*, a processor does not need superscalar to have hyperthreading technology.

![[fourth generation core.png]]
**This whole picture is ONE CORE**

Double (or triple...) certain resources in the pipeline to host multiple programs *at the same time*. This allows better use of the execution resources (reduce [[Idle]] time).

Now, the CPU can get instruction from more than one thread at a time, while sharing a bunch of execution units. Finally, the CPU "commits" all these instructions by itself and ensures correct execution.

Getting instruction from more than one thread at a time, and they are all sharing a bunch of executing units. And, you will commit them all by itself.

> [!note] Hyperthreading vs [[Processor|multicore]]
> Hyperthreading minimizes [[Communication (Constraint)|communication]] (all the threads are in one processor, instead of needing to communicate across processors). However, all the threads are fighting for the *same execution units* of the hyperthreaded processors - so could slow down program if they all use the same operation

---

Here, we have [[Superscalar]] capabilities and [[Pipelining]], etc. **Starting from this generation, programmers have to do stuff**.
- run two different programs
- write a program that use multiple threads that can use both threads

Most of the [[Core|performance core]] have **hyperthreading technology** (note, this is a marketing term)