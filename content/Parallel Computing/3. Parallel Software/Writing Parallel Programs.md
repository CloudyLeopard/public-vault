
## Goals For Parallel Program

1. **Divide** the work among the [[Process (PL)|processes]]/[[Threading|threads]] so that each process/thread gets roughly the same amount of work. In other words, ensure [[Load Balancing]]

> [!important] What is "Work"?
> You have an algorithm or are designing an algorithm to do some work. Need to divide the work among the threads or processes such that *each gets roughly the same amount of work*.
> 
> Important Distinctions:
> - "Work" **is not just computation**. It could be **computation AND communication**.
> - "Roughly the same" is important because we want all the threads/processes to **finish at roughly the same time**. Otherwise, the faster thread/process will have to wait for others.

2. Arrange for the processes/threads to **[[Synchronization|synchronize]]** if needed

> [!Note] Synchronization?
> For more, see my notes on [[Synchronization]]. In essence, synchronization is needed for correctness but bad for performance. Designing a good algorithm often means reducing the amount of synchronization needed.
>
> Sometimes you do not want to start a certain process until certain dependencies have been reached. Example:
> - Matrix multiplication. You do not want to start multiplying until both matrices are defined.
>
> Another type is when there is a piece of code and you do not want more than one thread to be in that piece of code at the same time, so you use **locks**.

3. Arrange for **[[Communication (Constraint)|communication]]** among processes/threads. Reduce communication as much as possible (communication is *expensive!*)

### Example of a parallelizable piece of software

```
double x[n], y[n]
...
for (i = 0; i < n; i++)
	x[i] += y[i];
```

The task is to add two arrays together. Even though each task is totally independent, guaranteeing **[[Load Balancing]]** is very hard
- Suppose we have two threads, `x` and `y`, and the arrays have size `n=100`
- We give each thread (on two different cores) 50 elements each. While this is the same amount of computation, it's easy to create load imbalance
	- Reason: two cores may be designed differently (multicore but heterogeneous, so the [[Core|performance core]] may finish much faster
	- Minor reason: one of the threads could have cache miss, and the other have cache hits; one have pitch falls and the other doesn't; one thread is near core and the other isn't

## Distributed vs Shared Memory System

[[Distributed Memory System]]: Hard to write at the beginning, but easier to debug (no locking, critical section, etc.). Overall, less time to solution

[[Shared Memory System]]: Easy to get a code that works at the beginning with bad performance. Difficult lies in getting good performance.

![[distributed vs shared memory effort.png|500]]

**Please see:**
- [[Parallel Code on a Shared Memory System]]
- [[Parallel Code on a Distributed Memory System]]

## Writing a Parallel Program


> [!Info]- Summary
> One advice in creating parallel code is **first start by writing purely sequential code**, then **translate to parallel code**
> 
> Then start testing as follow:
> 1. Test parallel code with only one thread. When you test with only one thread and debug it and make sure it works correctly, *you debug all the sequential bugs*. (note, the one thread version should usually be slower than sequential version, cuz overhead).
> 2. once 1-thread works correct, test with *two threads* only.
> 3. If that works correctly, test with *four threads*

Suppose we have a serial program. How do we parallelize it?
Goal: divide work, ensure load balancing, manage synchronization, and reduce communication
There is *no mechanical process*. in the end its gon be trial and error etc.

**First**, profile code to find **hotspots**
- parts of code that are taking most of the execution time, such as a function that is taking so much time then we need to focus our attention to that)

> [!important] Always write sequential first!
> Start by writing from sequential, then write parallel. There are several benefits to this:
> 1. A benchmark to compare the parallel code's performance
> 2. Easier to parallelize a sequential code than writing parallel code from scratch
> 3. if sequential code works, you move forward without needing to deal with sequential bugs.

**Second**, parallelize the hotspots
- note: its not just about the big O anymore, cuz algorithms like quick sort with good big O is very hard to parallelize, while bubble sort which has terrible O is easily parallelizable.
- Ian Foster has some nice framework, described in his book "Designing and Building Parallel Programs" (the specifics outdated or something but framework is good)

> [!important] The Best Algorithm for Sequential May Not Be the Best for Parallelization

### Foster's Methodology (PCAM)

See [[PCAM]]
