An [[OpenMP]] [[Clause]]
Programmer schedule [[For Loops in OpenMP|for loop iterations]] to threads

> [!note] Intuition
> We assume all the loop iterations have exactly the same amount of work done inside each loop iteration --> good load balancing.
> 
> But, what if the loop iteration has an if-else? What if the else part has a lot more computation than the if part? What if the loop body has operation like `i!`? loop iteration 1, 2, 3 will have much less computation than like iteration 9, 10, 11
> 
> There must be a way for programmer to schedule iteration to threads

Example:
```C
sum = 0.0;
for (i = 0; i < n; i++)
	sum += f(i);
```

**Default scheduling** behavior: parallelize the above iterations as block of consecutive `n/thread_count` iterations to each thread

```C
sum = 0;0;
# pragma omp parallel for num_threads(thread_counts) \
	reduction(+:sum)
for (i = 0; i <= n; i++)
	sum += f(i);
```

**Cyclic partitioning**: thread 0 gets iteration 0, thread 1 gets iteration 1, thread 2 gets iteration 2, then we go back to thread 0 get iteration 3, thread 1 gets iteration 4, and so on.


```C
sum = 0;0;
# pragma omp parallel for num_threads(thread_counts) \
	reduction(+:sum) schedule(static, 1)
for (i = 0; i <= n; i++)
	sum += f(i);
```

> [!Example] Result of the above code
> **Results**: Assume the time to execute `f(2i)` trequires approximately twice as much time as the time to execute `f(i)`
> `n=10,000`
> - one thread: run-time = 3.67 seconds
> - two thread, default assignment:
> 	- run-time = 2.76 seconds
> 	- speedup = 1.33
> - two threads, cyclic assignment
> 	- run-time = 1.84 seconds
> 	- speedup = 1.99


## The Schedule Clause

`schedule (type [, chunksize])`
types can be:
- **static**: the iterations can be assigned to the threads before the loop is executed
- **dynamic** or **guided**: the iterations are assigned to the threads while the loop is executing
- **auto**: the compiler and/or the run-time system determine the schedule
- **runtime**: the schedule is determined at run-time

The chunksize is a positive integer
chunksize is optional

### Static Schedule Type

Example: twelve iterations, (0, 1, 2, 3, ..., 11) and three threads

```
schedule(static, 1)
Thread 0: 0, 3, 6, 9
Thread 1: 1, 4, 7, 10
Thread 2: 2, 5, 8, 11
```

```
schedule(static, 2)
Thread 0: 0, 1, 6, 7
Thread 1: 2, 3, 8, 9
Thread 2: 4, 5, 10, 11
```

```
schedule(static, 4)
Thread 0: 0, 1, 2, 3
Thread 1: 4, 5, 6, 7
Thread 2: 8, 9, 10, 11
```


**Implement the default block scheduling** using the static schedule by making `chunksize = number of elements / number of threads`

When to use static? 
- if you find loop iteration is roughly the same amount of work, don't use the word `schedule` at all
- If the amount of work increases or decreases *linearly* in each iteration, then use static.

if you don't put `chunksize`, the default is `1`
### Dynamic Schedule Type

The iterations are broken up into chunks of **chunksize** consecutive iterations
> `schedule(dynamic, 2)`: chunk will be 2 consecutive iterations
> `schedule(dynamic, 4)`: chunk will be 4 consecutive iterations

Each thread executes a chunk, and when a thread finishes a chunk, it **requests another one from the runtime system**

> [!Example] `schedule(dynamic, 2)`
> Each iteration starts executing the `chunks/iterations` given to it. 
> 
> Suppose there are a lot of iterations, even after I give a thread some iterations, there are more left over.
> - If we have 12 iterations, but chunks size of 2:
> - thread 0 gets 2; thread 1 gets 2; thread 2 gets 2 ==> 6 iterations being worked on
> 
> Whenever a thread finishes doing its own work, it will ask the run time system and get 2 more (another `chunk size`)

This is why its called dynamic: the thread doesn't know beforehand what will be the iteration it will be executing. Whenever a thread finishes, it will ask for another chunk

This continues until all the iterations are completed

The `chunksize` can be omitted. When it is omitted, a **default chunksize of 1** is used.

> [!important] How to get best performance? Play around with chunk size

Q: What is a disadvantage of dynamic?
A: First, overhead of the dyanmic is higher than static: thread will keep talking to runtime to request for chunk
A: Second, think about it from pov of you as students. what if instead of giving you hw1 and hw2, i give you one question. Whenever i finish one question, the prof gives me another question. Not all the students will get the same number of questions
I am penalizing the fast thread: the faster i finish the more work i get
If i am penalizing the fast thread, does this mean dynamic leads to load imbalance? not really. [[Load Balancing]] is when work is assigned to two threads and we need the two threads to *finish at the same time*.
Which means, in the case of the iteration, we want all the threads to always be busy. and we want all the threads to finish mostly at the same time for all the iterations. This is why the word "dynamic". If the thread is running on a performance core, it will get more chunks. Efficiency core gets less chunks. Both will finish at the same time. **it is good from this perspective**

**However**, the time of request and also if one thread is fast on performance core, and it keeps asking for more chunks, that core can get too hot. if it gets hot, it will slow down for dynamic voltage and frequency scalig. Because of this, they decided to have a thrid type called the guided schedule type
### Guided Schedule Type

Each thread also executes a chunk, and when a thread finishes a chunk, it requests another one

> the definition of chunk here is different from that of dynamic and that of static
> guided and dynamic: each thread executes a chunk, and when a thread finishes a chunk it requests for another one

`Chunk = # remaining iterations / # threads`

> each time any thread asks the runtime for a chunk, the runtime will look at how many remaining iterations are there, divide them by number of threads, and give them new chunk

As chunks are completed **the size of the new chunks decreases**

> because number of remaining iterations decrease but number of threads do not decrease --> chunk size keeps decreasing

If no `chunksize` is specified, the size of the chunks decreases down to 1.

If `chunksize` is specified, it decreases down to `chunksize`, with the exception that the very last chunk can be smaller than chunksize

> if you specify, let's say `chunksize=4`, then once the new chunks size decreases down to 4, it will only give chunks of size 4. if you do not specify anything, `chunksize` decreases down to 1

#### Example: Trapezoidal Rule

Back to the [[Trapezoidal Rule (OpenMP)]] example lol

![[trapezoidal rule guided schedule with 2 threads.png]]

- When thread 0 asks for a chunk, it will get a big 5000 iteration chunk. The remaining iteration is 4999
- When thread 1 asks for a chunk, it will get the remaining divided by 2, which is 2500. Since the chunk thread 1 gets is smaller than thread 0's, thread1 will finish first and will ask for next chunk
- Next chunk: 1499/2 = 1250. Still thread 1 finishes before thread 0, and will ask for another chunk (this time getting 625)
- only then will thread 0 finish, and will get the remaining number of chunks / 2 (num threads) and so on and so forth
- This happens until we are done.

Anytime a thread asks for a chunk, the chunk will be the number of remaining iterations divided by the number of threads.

## The Runtime Schedule Type

The system uses the environment variable OMP_SCHEDULE to determine at run-time how to schedule the loop
- This is a linux environmental variable


The OMP_SCHEDULE environment variable can take on any of the values that can be used for a static, dynamic, or guided schedule

> [!intuition] Why?
> So far, we have seen 3 schedule type.
>
> Suppose you have a big software project, and you want to test between different schedule types. Of course, you could just go into the code, change the schedule type, recompile the code, run it, and measure its performance.
>
> but compilation takes time
> 
> OpenMP gives us something called `runtime` to modify schedule type even after compilation


Example:
```C
export OMP_SCHEDULE="static,1"
```
> This will help test your code without the need to keep recompiling.
> Once you have found the best combination, then hard code it into your code.

### `omp_set_schedule`

Another way for controlling the schedule

```C
void omp_set_schedule(omp_sched_t kind, int chunk_size);
```

where `kind` is one of:
- `omp_sched_static`
- `omp_sched_dynamic`
- `omp_sched_guided`
- `omp_sched_auto`

`omp_set_schedule` at runtime means that any for loop in your program will be using that specific schedule. if you use close schedule, then for different for loops you have flexibility to use different schedule for different for loops, and it is totally your choice.

## Final Thoughts

There is an overhead in using scheduling directive
> if for loop has roughly the same amount fo computation in every iteration, don't use `schedule`

The overhead is higher in dynamic than schedules

The overhead of guided is the greatest of all three

> Overhead: guided > dynamic > static > no schedule

So, if we get satisfactory performance without schedule, then don't use schedule.

> Q: look at the point above, how do you know the performance you are getting is satisfactory? i.e. when do you stop testing? i can test for static 1, 2, 3, 4, and keep going. IRL, the size of the data is like in the millions
> A: first, increase speedup only for parallel part (to remove `f` in [[Amdahl's Law]]) and only look at number of threads. let ssay number of threads is 4. then look at speedup relative to one thread. if speedup is as close as possible to 4, we are done (10% of 4). because we cannot get more than speedup of 4 with 4 threads.

## Rules of Thumb

if each iteration requires roughly the ssame amount of cmoputation --> default is best

If the cost of each iteration increases/decrease linearly as the loop executes --> static with small `chunksize`

If the cost cannot be determined --> you need to try several schedules: schedule(runtime) and try different options with OMP_SCHEDULE

Q: Can we parallelize the following loop?
```C
a[0] = 0;
for (i = 1; i < n; i++)
	a[i] = a[i-1]+i;
```
A: we cannot parallelize this, but do we just give up? 
In many cases, yes, but in some cases there is a small trial we can try before parallelizing it.
--> try write out on a piece of paper the first everal iterations of this piece of code

`a[1]=a[0]+1`
`a[2]=a[1]+2=a[0]+1+2`
`a[3]=a[2]+3=a[0]+1+2+3`
`a[i]=0+1+2+...+i=i(i+1)/2`

now, we can parallelize this! the new code inside the forloop just becomes
`a[i] = i*(i+1)/2`

Whenever you see dependnecies, don't just give up right away. run some iterations by hand, and see if there is a patten

ofc, its possible there is no pattern, then you either try a different algorithm or just run a different algorithm
