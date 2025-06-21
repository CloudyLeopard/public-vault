We now know we have three types of hardware
1. [[Shared Memory System|shared memory]]: processor with multi cores sharing a memory
2. [[Distributed Memory System]]: like big super computers with cabinets and motherboards and every node has its own memory. a process running on one board cannot access the memory on another board
3. [[SIMD|accelerators]]: chips and GPUs (SIMD) that are extremely good and fast at specific types of computations but bad at others.

Now, the burden moves from the hardware people to the software people:
1. In [[Shared Memory System]]:
	a. start a single **[[Process (PL)|process]]** and fork [[Threading|threads]]
	b. threads carry out *tasks*
2. In [[Distributed Memory System]]
	a. start multiple **processes**
	b. processes carry out *tasks*

> [!note] More on DMS
> Each motherboard has one or more process, and these processes will also be carrying out tasks (e.g. create several processes on different nodes, each one carry out parts of a task.)
> Processes talk to each through through *messages* (they do not share memory). This can be achieved through [[MPI]], or Message Passing Interface
	
3. When using [[SIMD|accelerators]] (e.g. GPUs)
	1. start a process with one or more threads
	2. the thread launches task to be done on the GPU
	3. GPU will do the same task on different data

> [!note] More on SIMD
> When using accelerators like GPU, we will start with 1 or more threads (as it is a shared memory). Each thread will carry out a task. The tasks are GPU friendly - GPU will do the same task but on different data (recall GPU is SIMD chip)

## Part 1: Writing Parallel Programs

See [[Writing Parallel Programs]], [[PCAM]]

## Part 2: Concurrency vs Parallelism and Amdahl's Law

See [[Concurrency]] and [[Parallelism]]. In essence, parallelism is a subset of concurrency

Simple Speaking
$$\text{Concurrency} + \text{Parallelism} = \text{High Performance}$$

However, in any program in the world, **there will always be parts of the code that is sequential that cannot be parallelized**. As a result, 
- even with as much hardware as we want, we cannot achieve as much parallelism as we wish
- In fact, if we have 2 [[Core|cores]], we don't even necessarily get 2x speedup.

This idea leads to our next topic: [[Amdahl's Law]]

> [!important] Main Takeaways for Amdahl's Law
> Decreasing the serialized portion is of greater importance than adding more cores blindly
> 
> Only when program is mostly parallelized (smallest $F$ we can get), does adding more processes help more parallelizing the remaining rest
> 
> Amdahl does not take into account of
> - Overhead of synchronization, communication, OS, etc.
> - Load may not be balanced among cores
> *Only use this law as guideline and theoretical bound only, not for just speed up.*

## Part 3: Determining Efficiency

How to analyze how good a parallel program/algorithm without executing it on a machine?

Yes! A good way to do so, in addition to [[Amdahl's Law]], is **[[DAG Model for Multithreading]]**

Note: DAG is more precise at determining efficiency than Amdahl's Law, but Amdahl's law is easier to use.

## Part 4: Programming Model

See [[Programming Models]]

## Part 5: Sources of Performance Loss in Parallel Programs

See [[Sources of Performance Loss in Parallel Programs]]


## Part 6: Patterns in Parallelism

See [[Parallelism#Patterns in Parallelism]]


