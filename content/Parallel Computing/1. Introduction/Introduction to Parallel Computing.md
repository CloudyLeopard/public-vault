
> [!info] Definition: Parallel Computing
> **Parallel computing**: using multiple processors (or cores) in parallel to solve problems more quickly than with a single processor/core.
> 
> Examples of parallel machines:
> - A cluster computer that contains multiple PCs combined together with a high-speed network
> 	- each desktop have its own memory, so you cannot have a program that are cut into two pieces (desktop does not share memory). So you have two full programs on different PCS that talk to each other
> 	- MPI - the first language we will learn.
> - A shared memory multiprocessor (SMP) by connecting multiple processors to a single memory system
> - A Multicore contains multiple cores on a single chip
> Number 2 and 3 can be programmed in the same way: this is the second language we will learn, OpenMP.
> 
> The third language we will learn: CODA. This is also very difficult lol. It's for GPU.

The goal of this course is to *think in parallel*, and achieve a *faster result using parallel computing*.

> [!warning] Use Sequential Code When Computation is Small
> Example:  multiply matrices of size 1000. It's always faster to use sequential computing because of communication cost and other overheads in parallel computing.

In this course, we will be using C as the main programming language.

Overall Conclusion:
- Due to technology constraints, we moved to multicore processors
- Parallel programming is now a **must**
- There are different flavors of parallel hardware that we will discuss and many flavors of parallel programming languages that we will deal with.

Relevant Concepts:
- [[Moore's Law]] and [[Dennard Scaling]]
- [[Exaflop]]
- Types of Parallelism
- Parallel Computing Terminologies
- Parallelizing Sequential Code: [["Tree" Trick]]
	- Constraints: [[Load Balancing]], [[Synchronization]], [[Memory Access]], [[Communication (Constraint)|Communication]]


See next: [[Trend to Parallel Computing]]