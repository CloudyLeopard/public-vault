---
title: PC Overview
---


Main goals of this course: 
- Three parallel programming languages 
- Parallel hardware: some parallel hardware cannot be programmed with certain langauges
- Challenges of parallel computing
- How to best write parallel programs and make best use of the underlying hardware

## Table of Content
[[Introduction to Parallel Computing]]
- [[Trend to Parallel Computing]]
- [[Pro and Con of Multiple Processors]]
- [[History of Multicore Programming]]
- [[Trend to Parallel Computing]]
- [[Parallelizing a Sequential Program]]

Parallel Hardware
- [[Computer History]]
- [[Parallel Hardware Evolution]]
	- parallel hardware implementations
	- techniques to exploit [[Instruction Level Parallelism|ILP]]
- [[Memory Wall]]: memory is the issue
- [[Flynn's Taxonomy]]
	- [[SIMD]]
	- [[MIMD]]
		- [[Shared Memory System]] vs [[Distributed Memory System]]
		- [[Interconnection Network]]
- [[Cache Coherence]]

> [!note] Parallel Hardware Trend Now
> The trend now is:
> - more cores per chip
> - more heterogeneity
> - non-bus interconnect
> - NUMA and NUCA (Non-Uniform Memory/Cache Access)

[[Parallel Software]]
- [[Writing Parallel Programs]]
	- Parallel Code on a [[Parallel Code on a Shared Memory System|Shared Memory System]] vs. on a [[Parallel Code on a Distributed Memory System|Distributed Memory System]]
	- [[PCAM]]: a framework on writing parallel programs
		- [[Threads vs. Processes]] (part of the "mapping" step)
- [[Concurrency]], [[Parallelism]]
- Measuring Parallel Program’s Efficiency
	- [[Amdahl's Law]]
	- [[DAG Model for Multithreading]]
- [[Programming Models]]
- [[Sources of Performance Loss in Parallel Programs]]
- Patterns in [[Parallelism]]
- [[Threading|Threads]] (have their own stack)

[[Performance Analysis]]
- Parallel Performance: [[Performance]], [[Speedup]], [[Efficiency]], [[Scalability]]
	- Pitfalls in Timing in parallel programs
- [[Timing]]
- Sequential Performance

[[MPI]]
- [[MPI Components]]
- [[MPI Example Programs]] (has lots of examples for of these concepts)
- [[MPI Terminal Commands]]
- [[MPI_Datatype#Derived Datatypes|MPI Derived Datatypes]]
- MPI Safety Functions
- [[MPI Communicator]]
- When to use MPI or not

[[OpenMP]]
- (yea my organization for this chapter is wack af. just look at [[OpenMP]])

[[CUDA]]
- [[GPU]], [[GPU Architecture]]
- [[CUDA Indexing]], [[CUDA Programming|CUDA Memory and Programming]], ... 
- (just read [[CUDA]])