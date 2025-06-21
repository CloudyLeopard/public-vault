Primarily, see [[Shared Memory System]] for review on the system.

The goal is to write code for a hardware such that different cores are **accessing the same memory** installed on the motherboard.
- No assumption is made about the type of interconnect
- Cache is not programmer transparent (no explicit control over cache)

## Managing Threads

The number of [[Threading|threads]] you create depends on when you know the problem size:
1. know the problem size prior to execution (use static thread)
2. know the problem size as you start execution (use dynamic thread)
3. don't know problem size at all (use dynamic thread)

**Dynamic Threads**: master thread (like the main function; starts sequentially) waits for work (e.g. program that waits for user input), forks new threads. When threads are done, they terminate.
- Advantage: efficient use of resources
- Disadvantage: Thread creation and termination is time consuming: creating threads require operating system (every thread requires its own stack and stuff); create thread only when needed

**Static Thread**: pools of threads created and are allocated work, but do not terminate until cleanup
- Advantage: Better performance
- Disadvantage: potential waste of system resources (some therads may be staying idle doing nothing, which is waste of system resources)
*Static thread is good if you know the problem size before the program starts or from the command line*

## [[Nondeterminism]]

This is always a problem in parallel program

General idea is that, when you have more than one thread, each one executing a code, and you *cannot predict which program finishes first*. 
- Sometimes thread 0 will finish before thread 1, but then if you run the same program five minutes later, thread 1 finish before thread 0

Example:
```C
printf("Thread %d: my_val = %d\n", my_rank, my_x);
```

Print order possibility 1
- `thread 0: my_val=19`
- `thread 1: my_val=7`
Print order possibility 2
- `thread 1: my_val=7`
- `thread 0: my_val=19`

**[[Race Condition]]**: A consequence of [[Nondeterminism]] - there is a race on which thread will execute first, so the result will not be the same. Running the program at different times will get different possibilities

**[[Critical Section]]**: a piece of code where you don't want more than one thread to be at in any point of time
1. **[[Mutual Exclusion]]**: no more than one thread executes critical section at any point in time. Must line up the threads so that they run critical section code one at a time
2. Need to enforce mutual exclusion through locks **(mutex, semaphore, ...)**

```
my_val = Compute_val(my_rank);
Lock(&add_my_val_lock); # blocks other threads
x += my_val;
Unlock(&add_my_val_lock); # once unlock is called, other threads that are blocked will continue
```

> [!note] What happens if we remove the locking mechanism?
> If we remove the locking mechanism, we do not know which thread will be at the head of the queue, and so we may end up getting the wrong results.

**[[Atomic Operation]]**: all or nothing

### Relation Between [[Cache Coherence]] and Nondeterminism

Cache coherence is **not enough** to ensure determinism, for three reasons:

1. Cache coherence happens among caches from different cores. But if we have multiple threads on *one core* (a core that is [[Hyperthreading|hyperthreaded]]), cache coherence will not kick in (we are facing the same problem as cache coherence)
2. Critical sections could have more than one statement, and cache coherence may not be enough - especially because critical section could have more than calculations
	- Two different threads may send different things to a screen. Here, we need to make them send things at a *different time* (cannot have the two things layer over each other on the screen). Cache coherence has nothing to do with this
3. coherence will only kick in when core updates the cache, so it wont save you even for computations.


> [!Example] Reason 3
> Computation: `x++`. Assume `x` is shared and `x=0`. Assume two threads executing on two different cores, each one executing `x++`, and each one has a private cache.
> 1. `x` will be read from memory to each cache
> 2. Each thread needs to `+1` to `x`, so `x` will move/copied from cache to register in core 0, and move/copied from cache to register in core 1
> 	- *Note: cache coherence will not kick in yet because we are still reading*
> 3. Inside both cores, `x++`. So now, inside both cores' registers, `x = 1`
> 	- *Note: post addition, cache coherence still will not kick in. This is because we have not touched the cache yet (the addition is done inside the core and results in registers)*
> 	- *Cache coherence kicks in only when a core decides to write results back to cache*
> 4. Suppose core 0 wants to write `x` back to the cache. Cache coherence will tell core 0 to wait first
> 5. Cache coherence tells core 1 to remove ([[Cache Coherence#MESI|invalidate]]) the cache block that contains `x` from their cache
> 6. Cache coherence tells core 0 to write block back to its cache. Now, `x=1`
> 7. Suppose core 1 now needs to write `x` back to the cache. However, **its block is removed/invalidated** --> [[Cache|cache miss]]
> 8. Core 1 may either get the information from memory, or from the other processor. Either way, core 1 will write `x=1` to `x`, which is wrong (it should be `x=2`)
>
> Even with computation,  because calculations like additions and modifications of variables happen **inside the core**, cache coherence will not prevent nondeterminism.


## Busy Waiting

**Locks** are system calls, which means calling the [[Introducing... Operating Systems!|operating system]], which means it is bad for performance.

### Example

Assume:
- `*ok_for_1` is shared among threads
- Each thread has its own: `my_rank` and `my_val` (multi-threaded language allow you to specify which variables are shared, which are private)

Assumetwo threads, each running the following in parallel
```
ok_for_1 = false;
my_val = Compute_val (my_rank); # Each thread will calculate its own my_val

if (my_rank == 1)
	while (!ok_for_1); # Busy waiting
x += my_val; # critical section
if (my_rank == 0)
	ok_for_1 = true; # let thread 1 update x
```

*Note: the first line doesn't need lock. We are not updating the variable - we are writing the same value to `ok_for_1` in every thread. No matter what, `ok_for_1` will end up being false. it's only when we update it (like `x++`) that it will be faulty*

At busy waiting, thread 1 will keep running while loop, while thread 0 will move down and run `x += my_val`. Then, it will set `ok_for_1` to true and let thread 1 run

Correctness wise, *this code IS correct* for 2 threads.
Shortcomings:
1. the while loop is NOT DOING ANYTHING. When translated to assembly, the while loop is conditional jumps and what not and it will make the core busy doing nothing (wasting resources)
2. not very easy to scale the code beyond two threads.