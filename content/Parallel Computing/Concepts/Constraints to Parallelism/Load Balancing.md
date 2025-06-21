---
aliases:
  - Load Balance
  - Load Imbalance
---

Load imbalance when there there are amount of **[[Work]]** between processes/threads.

> [!important] "Work": Computation AND Communication (and others...)
> You have an algorithm or are designing an algorithm to do some work. Need to divide the work among the threads or processes such that *each gets roughly the same amount of work*.
> 
> Important Distinctions:
> - "Work" **is not just computation**. It could include any (or all) of the following
> 	- [[Memory Access]] pattern
> 	- Communication amount
> 	- Amount of cache misses or page faults
> - "Roughly the same" is important because we want all the threads/processes to **finish at roughly the same time**. Otherwise, the faster thread/process will have to wait for others.

This is bad because the entire program has to wait for the slowest process/thread to finish.

Also, if one thread has a huge amount of computation (waaaaaaay more than the others), the core that is executing all these computations will get hotter and hotter. To account for this, system will perform [[Core|dynamic and voltage frequency scaling]], making that core even slower.

So not only are you waiting for that thread, the core is moving even slower.

## Relation with Barrier [[Synchronization]]

Load Imbalance and synchronization has a very interesting relationship.

![[Load balancing.png|400]]

Load imbalance is bad on its own, but is **worse** with lots of barriers. **Every synchronization point forces the other threads to wait for the slow thread.**

As a result, the **more synchronization point** you have, the **more sensitive your code will be to imbalance**.

## What To Do?

To avoid this, do two things:
1. Try to reduce synchronization points
2. Try to reduce load imbalance (not just computation, but number/pattern of memory access, and communication)

When there is load balance, threads/processes will finish roughly finish in the same time. 

You want to assign to the "right" core: give the task with more computation to the [[Core|performance core]], and the task with less to the efficiency core. 
- Even if it looks like there is load imbalance (since one core does more computation), there really isn't. **What's important is the time they finish**

If you cannot eliminate it, at least reduce it.
**Static Assignment** of work to threads
- From the beginning of execution, you have fixed number of threads, and each one is assigned a pre-defined amount of work.

If the amount of work will come during execution, you get...
**Dynamic assignment** of works to threads
- Number of threads and amount of work is not known in advance
- Threads are created and work assigned to them dynamically
- Has its own overhead

> [!note] Related to [[Parallel Code on a Shared Memory System#Managing Threads|Thread Management]]
> When do you create a pool of threads at the beginning vs create new threads as user adds more input (more task)