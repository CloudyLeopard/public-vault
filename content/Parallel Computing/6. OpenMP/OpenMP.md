
An API for **Shared-Memory [[Writing Parallel Programs#Parallel Programming]]** and **multi-threaded programming**

Designed for systems in which each **[[Threading|thread]]** can have access to all available memory
- We work with [[Threads vs. Processes|threads, not processes]]

System is viewed as a collection of cores, all of which have access to the same main memory --> [[Shared Memory System]]
- Can be viewed like your laptop: a collection of cores, all have access to the same memory (e.g. 8 or 16 or 32 gb of ram)

> [!Info] Why C?
> want a language that is close to the machine (which is never possible for an interpreted language like python), or java where we cannot control garbage collection, speed of JVM, etc.
> in the future, a language like Rust is coming up very quickly, so we may be using that. But for now, OpenMP is on top of C, C++, and Fortran

## Basic Idea of OpenMP

Most of what we will learn about openmp will start with `#pragma omp ____`

![[openmp initial idea.png]]

if we have 1000 loop iterations, and we have 10 threads, then each thread will be responsible for 100 iterations. openmp was initially designed with for loop in mind.

OpenMP does not deal with while loop! this is because when while loop starts, we do not immediately know how many iterations there are.

OpenMP is not designed for recursion - have to translate recursion to for loops.

OpenMP can parallelize many serial programs with **relatively few annotations** that specify parallelism and independence

OpenMP is a small API that **hides cumbersome threading calls with simpler *directives***.
- built on top of C and fortran
- **directives** are anything that starts with a `#` (see [[Pragmas]])

## Part 1: Basics of OpenMP

Concepts covered:
- [[Pragmas]]
- [[Clause]]
- [[Creating Threads in OpenMP]] ([[omp parallel]])
- [[Compiling OpenMP Program]]

Main example used:

```C
#include <stdio.h>
#include <stdlib.h>
#include <omp.h>

void Hello(void);  /* Thread function */

int main(int argc, char* argv[]) {
    /* Get number of threads from command line */
    int thread_count = strtol(argv[1], NULL, 10);

    #pragma omp parallel num_threads(thread_count)
    Hello();

    return 0;
} /* main */

void Hello(void) {
    int my_rank      = omp_get_thread_num();
    int thread_count = omp_get_num_threads();

    printf("Hello from thread %d of %d\n", my_rank, thread_count);
} /* Hello */
```

- `parallel` means to "create threads".
- All the threads created will run `Hello()`.
- `omp_get_thread_num()`: will get each thread's unique id (similar to how "rank" works in MPI).
- `omp_get_num_threads()`: number of threads
- One thread only will execute `return 0`

> [!example] Why only one thread?
> 
> Q: suppose i take return 0, and i put it just next to `Hello()` and put it in the braces. How many threads will execute `return 0`?
> A: 6 threads will reach `return 0`. But as soon as one thread executes `return 0`, the whole process will exit (it will be the end of the process). The other five threads will not even be existence. Whoever reaches `return 0` first will calls it, and then close the whole process.
> 
> Similar to `exit()`.

- There may be system-defined limitations on the number of threads that a program can start.
	- The OpenMP standard doesn't guarantee that this will actually start thread_count threads.
	- **However**, unless we're trying to start a very large number of threads, we will almost always get the desired number of threads.

> Given that now we have `#pragma omp paralle num_of_threads`...

- In OpenMP parlance the collection of threads executing the parallel block - the original thread and the new therads - is called a **team**, the original thread is called the **master**, and the additional threads are called **slaves**.

Basic lines of code:
- `#include <omp.h>`
- `gcc -fopenmp ...`
- `omp_set_num_threads(x);`
	- *does not create threads*. it just tells openmp run time how many threads to use when it does create them
- `omp_get_thread_num()`
	- returns a different number for each calling thread. this is the **unique id** starting from 0
- `omp_get_num_threads()`
	- this will tell you the total number of threads
- `#pragma omp parallell [num_threads(x)]`
	- if both `omp_set_num_threads` is there and `num_threads` is here, `num_threads` will take precedence
## Part 2: Lots of Examples

> [!important]- Problem: Aggregating the Sums
> >[!Danger] move this stuff into a more appropriate location
> 
> We saw this before [[Parallel Code on a Shared Memory System#Relation Between Cache Coherence and Nondeterminism|here]]
> 
> ![[thread problem aggregating sum trapezoidal rule.png]]
> 
> **[[Cache Coherence]] and Threaded Updates to Shared Variables**
> 
> Suppose we have two threads, Thread 0 and Thread 1, running on different cores. Each core has its own L1 [[Cache]]. There’s no shared cache, but both threads access a shared variable, `global_result`, which resides in main memory.
> 
> Both threads will eventually execute:
> ```
> global_result += my_result
> ```
> 
> **Time 0: First Read**
> • Both threads attempt to read global_result.
> • Since it’s not in either cache → **cache miss**.
> • Each thread fetches `global_result` from main memory into its own cache.
> 
> Now there are **three copies** of global_result: one in each thread’s cache, and one in main memory.  
> 
> ⚠️ **No cache coherence yet** — it doesn’t trigger on reads. Coherence hardware only engages during **writes**.
> 
> 
> **Time 1: Register Load & Local Computation**
> • Thread 0 loads its cached global_result into a register, along with `my_result = 1`.
> • Thread 1 is slightly behind and still calculating `my_result = 2`.
> 
> 🧠 Hardware doesn’t understand “variables” — it operates with **registers** and memory. Variables are just an abstraction created by higher-level languages.
> 
> • Now Thread 0 computes: `global_result (0) + my_result (1)` = 1
> • Meanwhile, Thread 1 loads its own `global_result` = 0 and `my_result` = 2 into registers.  
> 
> At this point, both threads are working with **local, outdated copies**. Still no coherence triggered, because **nothing has been written back yet**.
> 
> 
> **Time 2: First Write by Thread 0**
> • Thread 0 writes its result (1) back to its cache’s block for `global_result`.
> 
> ✅ **Now cache coherence kicks in**:
> 
> The hardware invalidates the block containing global_result in Thread 1’s cache. It can no longer use its cached version.
> 
> 
> **Time 3: Second Write Attempt by Thread 1**
> • Thread 1 tries to write `global_result += my_result` with its version (0 + 2 = 2).
> • But its cache no longer has a valid copy of `global_result` → **cache miss**.
> • What happens next depends on the processor design:
> • Either it fetches the updated value from Thread 0’s cache,
> • Or Thread 0’s cache flushes it to main memory, and Thread 1 reads it from there.
> • Thread 1 then writes its result (2) into its own cache.
> 
> **Final Outcome**
> • The final value of global_result is **2**, not the correct result (**3**).
>   
> ❗Cache coherence **maintains consistency**, but not **correctness**.
> 
> It makes sure stale data is invalidated, but doesn’t prevent **data races**.
> 
> 💡 This is exactly why we need **software mechanisms** like locks, atomics, or critical sections.
> 
> Cache coherence alone **cannot ensure correct shared updates** in multithreaded code.
> 

Example: [[Trapezoidal Rule (OpenMP)]]
Concepts Covered
- [[omp critical]]
- [[Scope (OpenMP)]]
- [[reduction]]


Example: [[Histogram (OpenMP)]]
- [[omp atomic]] (kind of)
- [[omp for]] (implicit barrier, nowait)
- [[omp single]]

## OpenMP Parallel Programming Model

See [[OpenMP Parallel Programming Model]]

## Legal Forms for Parallelizable For Statements

See [[For Loops in OpenMP]]

Other concepts covered:
- [[Scope Clauses]]

To make the best use of OpenMP try to have programs with for-lops
> start by writing sequential programs with for loop, then inject OpenMP stuff. before this, ensure sequential code is correct.

Scope is an error prone concept here. So be careful!
- It may be a good idea to explicitly specify the scope of each variable in the parallel (or parallel for) block.
> i.e. use `default(None)`

Example: [[Odd-Even Transposition Sort (OpenMP)]]
- creating threads in inner loop vs outer loop

## Schedule Clause

See [[schedule]]

## Producers and Consumers

See [[Producers and Consumers]]

## Dividing Work Among Threads

See [[Dividing Work Among Threads (OpenMP)]]

## Causes of Poor Performance

**IMPORTANT!!!** Five reasons for openmp poor performance

See [[Causes of Poor Performance (OpenMP)]]

## Hybrid OpenMP and MPI

See [[Hybrid OpenMP and MPI]]

### MPI vs OpenMP

Pure MPI Pro:
- protable to distribuetd and shared memory machines
- scaled beyond one node
- no race condition problem
Pure MPI Con
- difficult to develop and debug
- high latency, low bandwidth
- explicit communication
- difficult load balancing

Pure OpenMP Pro
- easy to implemet parallelism
- low latency, high bandwidth
- implicit communication
- dynamic load balancing
Pure OpenMP Con
- Only on shared memory machines
- scaled within one node only
- possible race condition problem