
5 main causes of poor performance:
- sequential code
- communication
- coherence and false sharing
- load imbalance
- synchronisation
- compiler (non-)optimisation

We will discuss each of these causes one by one.

Also... why is there 6 items but only 5 main causes
Communication is embedded into coherence! Unlike MPI, communication is implicit in your code. It happens when two threads need to share, its alll thru *memory access*. COmmunication, coherence, an false sharing, are really very much related.

## Sequential Code

Any parallel program will, for sure, have part that is purely sequential

[[Amdahl's Law]]: limits performance
> there is always some part of the code that is purely sequential

We need to find ways to parallelise it! Reduce as much as possible these sequential code (at the algorithmic level first, then once the code is written see if anything else can be done.)

> Suppose you are reading a series of numbers from a file, and then put them in an array, then scan array and increment every numebr by 1, then write array back to a different file
> incrementing number in array is easy
> what about reading and writing to a file? could we parallelize this?
> 
> A: [[Pipeline (Parallelism)]]! (not the hardware one). read few numbers from file, put them in array. while some threads are incrementing, some other threads are reading from file, and the a third thread that is writing number that has been incremented into a nother file.
> 
> Read only part of the file and increment them while reading more.

In OpenMP, all code outside of parallel regions and inside [[omp master|MASTER]], [[omp single|SINGLE]], and [[omp critical|CRITICAL]] directives is sequential.
- This code should be as small as possible.

> can i sequential section? make them as small as possible

If you find your code is slow, try to see the sequential part to see if you can do anything about it.

### [[Communication (Constraint)|Communication]]

On shared memory machines, **communication = increased memory access costs**
- it takes  longer to acess data in main memory or another processor's cache than it does from local cache

[[Memory Access]] are expensive!

Unlike [[Producers and Consumers#Example Message Passing|message passing]] communications is spread throughout the program
- much harder to analyze and monitor

### [[Cache]] and [[Cache Coherence|Coherency]]

When you start updating the data, you come into this

Shared memory programming assumes that a shared variable (a variable shared among all the threads) has a unique value at a given time

Caching means that multiple copies of a memory location may exist in the hardware

To avoid two cores caching different values of the same memory, cache must be coherent

### [[False Sharing]]

> Because of this, look at code: do i have any false sharing? meaning a cache block that exists in two different caches, and two different threads are updating the same cache block (but not the same variable, i.e. x and y but x and y are in the same cache block)

> remember coherence hardware cannot recognize variables - they recognize cache blocks/lines

[[Cache Block]] consist of several words of data

What happens when two processors are both writing to different words on the same cach eline?
- each write will invalidate the other processors copy. - delya
- lots of remote memory accesses

Also more cache misses

All of these are communication

Whenever you have a big data structure that you watn to work in parallel, cut it into chunks. but these chunks **have to be in multiple of cache blocks!**
In most of the multicores cache block are sizes of 64 bytes

Symptoms:
- poor speedup
- high, non-deterministic numbers of cache misses,
- Mild, non-determinimistic, unepected [[Load Balancing|Load Imbalance]].

#### Example: Matrix vector multiplication

[[Matrix Multiplication (PC)#Matrix Vector Multiplication]]

![[matrix vector multiplication sequential.png]]

this outer for loop can be very easily parallelized

![[matrix multiplication openmp 1.png]]

Now you realize something:
- look at col 3, the time changes; but row 5, it doesnt!
- The three problem sizes have exactly same amount of computation. So, if we take bit O, the three prblem sizes are exactly thhe same.

The left one is bad for a reason, the right one is bad for another reason.

Let's stay with the one in the left: 8,000,000 x 8, or 8 vectors of size 8 millions. (I THINK???)
8 million is too big to write in the cache. We need to write 8 million 0's. we have a lot of write misses.

Q: what does a cache do when there is a write miss?
A: Ask cache to either read to write to a cache block. There is either a miss or a hit. a read hit is ok, a write hit is ok, a read miss -> cache goes to memory and cahce miss and so on.
The write miss is more complicated. In many cache, it will be assume as a read miss then a write - so it will be handled like a read miss then a write hit.

there is two possibilities:
- write allocate: if there is a write miss, the block will be brought into the cache (like handling a read miss), then followed write
- write no-allocate: if there is a write miss, nothing is brought into the cache. nothing will be brought in. You ONLY bring stuff into the cache if there is a read miss. 
- A small optimization is that there is a small write buffer next to the cache. If you want to write to the cache, you first write to the buffer and CPU keeps going and write buffer writes to the cache.

The left option has a lot of write misses, which makes the problem size on the left worse than the middle. this is caused by`y[i]=0`

The one on the right has 8 x 8,000,000 - y has 8 elements, but this means x (the vector) has 8 million elements. simply speaking you will have a lot read misses. the read misses takes time and effect performance

this is why the one on the middle is the best
- the one on the left suffers a lot of write misses
- the one on the right suffers a lot of read misses


### Load Imbalance
[[Load Balancing|Load Imbalance]]

Load imbalance can arise from both communication and computation
> Just because i am giving more work to another doesn't mean there is load imbalance. its not just number of cmoputation, but also type of communication, are they accessing the memory the same way, whether they are different types of core, etc.

> you can never 100% eliminate load imbalance. you just do your best to reduce it

OpenMP gives us a tool to help achieve load balance: `schedule` options
- Worth experimenting with different scheduling options
- **runtime** clause is handy here
> use environment variable to change the schedule until you find the best schedule; instead of needing to rewrite, recompile, and run

If none are appropriate, may be best to do your own scheduling!
> this does not mean you are creating your own schedule other than dynamic, static, etc.
> But, maybe, look at the loop from start to end, its best to cut it into pieces
> For instance, for the first third of the loop, do static; then for the enxt third, do dynamic, etc.

### [[Synchronization]]

We said before that the more barriers and sychronization pints, the more sensitive your code will be to load imbalance. Slowing it down means some thread are much slower than others.

Barriers can be very expensive

Avoid barriers via:
- *careful* use of the NOWAIT clause
- parallelise at the outermost level possible
	- may require re-ordering of loops/indices
- choice of CRITICAL / ATOMIC / lock routines may impact performance
> these are considered some kind of synchronization, cuz all the threads wait

### Compiler (non-)optimisation

Sometimes, the addition of parallel directives can inhibit the comiler from performing sequential optimisations.
> compilers, liek gcc, can get quite smart at optimizing your sequential code. the highest optimization is `-o3`
> the problem is, if you code contain sparallelism, and the compiler will become very conservative and will not do any optimization. it is afraid of ruining the parallelism

Compile a sequential code with -o3 and the code with 1 thread. if sequential is MUCH better, you may be suffering from a compiler non-optimisation.

Symptoms:
- 1-thread parallel code has longer execution and higher instruction count than sequential code

Can sometimes be cured by making shared data private, or local to a routine

## Performance Tuning How to make my code fast?

My code is giving me poor speedup. I don't know why. What do I do now?

A:
- say this machine/language is a heap of junk
- give up lol
B: 
- try to classify and localize the sources of overhead
	- what type of problem is it and where in the code does it occur
- fix problems that are responsible for large overheads first
- iterate

### Measure the Timing

[[Timing]]

A standard practice is to use a standard operating system command
```bash
$ time ./a.out
```

the "real", "user", and "system" times are then printed after the program has finished execution
```
$ time .program.exe
real 5.4
user 3.2
sys 1.0
```

- user=CPU user time, or time taken by core to execute your code
- system=time taken by CPU that executes the OS code that serves your code
- real=wall clock time, or what the user will feel

> Q: Does the real have to always be larger than user + system? or can it be smaller?
> A: if it is purely sequential, *no*. If it is multicore, then the user is not the biggest or slowest core; it is the SUM of the CPU time of all the cores; ad sys is the SUM of CPU times of ALL the cores.
> The more parallelism you have, the bigger user and sys is, but will make the real smaller

So, if you find real < user + sys, that means you are doing a good job with your code. Though, assuming that you are running the code at a time that ppl are not using the same machine lol

A common cause for the difference between the wall-clock time of 5.4 seconds and CPU time is a processor sharing too high a load on the system

If sufficient processors are avaiable (i.e. not being used by other useres), your elapsed time should be less than CPU time.

the `omp_get_wtime()` function provided by OpenMP is useful for measuring the elapsed time of blocks of source code
> wallclock time! everything will be taken into account

### Avoid Parallel Regions in Inner Loop

This means each iteration of the outerloop will create threads then destry threads, and keep doing this EVERY iteration. these things are very expensive

By moving the parallel construct outside of the loop nest, the parallel contsruct overheads are minimized.