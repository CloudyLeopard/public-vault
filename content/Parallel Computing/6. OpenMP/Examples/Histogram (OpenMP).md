
**Problem**: count the number of times each ASCII character occurs on a page of txt
**Input**: ASCII text stored as an array of characters
**Output**: A histogram with 128 buckets - one for each ASCII character
*Note: lower case a ≠ upper case A*

## Part 1: Determining the Strategy

Strategies to parallelize the code:
- Option 1: cut giant string into as many equal pieces as possible, then give each thread a piece
- Option 2: each thread responsible for one more buckets of the 128 buckets

In other words, either we *divide the text among the threads*, or *divide the buckets among the threads*

> [!important] Rule of Thumb
> A sign of a good parallel program is that when problem size gets bigger, you can (its better to) increase the number of threads, but not increase the number of work per thread.

As such, we can analyze the two strategies/options
1. Cutting text into pieces. if text gets longer, we can cut into more pieces, and each thread will still work with the same length in each piece
2. with option 2, every thread will have to scan the whole string to fill out its assigned bucket. we cannot increase the amount of thread, but the amount of work done by each string will increase. The second strategy is not scalable.

Answer: **divide string into pieces**, and assign each piece to a thread, finally getting one histogram at the end.

## Part 2: The Goal

![[ascii histogram parallelism visualization.png]]

## Versions of Code
### Sequential Code

**Performance on quad core**: 10.36 seconds

Sequential code is straightforward:
```C
void compute_histogram_st(char *page, int page_size, int *histogram) {
	for (int i = 0; i < page; i++) {
		char read_character = page[i];
		histogram[read_character]++;
	}
}
```

`compute_histogram_st`: starts with `*page, page_size, *histogram`
- `*page` is a ASCII string
- `page_size` is the size of the string


### Parallel Attempt 1

**Failed**. Reason: Critical section

```C
void compute_histogram_st(char *page, int page_size, int *histogram) {
	# pragma omp parallel for
	for (int i = 0; i < page_size; i++) {
		char read_character = page[i];
		histogram[read_character]++;
	}
}
```

> [!Important] Note on [[Pragmas]]
> after `# pragma omp parallel for`, the next line **must** be a for loop.

The code doesn't work! this is because of the line:
`histogram[read_character]++;`
this is a [[Critical Section]]!

### Parallel Attempt 2

**Failed**. Reason: Critical section makes the code sequential + parallel overheads

```C
void compute_histogram_st(char *page, int page_size, int *histogram) {
	#pragma omp parallel for
	for (int i = 0; i < page_size; i++) {
		char read_character = page[i];
		#pragma omp atomic // <--
		histogram[read_character]++;
	}
}
```

The `atomic` keyword makes sure no two threads will be in the critical section line at the same time.

While the code is **correct**, the performance is **terrible**: 114.89 seconds!
- 10x slower than single threaded version

Reason: you are trying to execute the iteration in parallel, but inside the iteration it is reading a character and then updating the histogram. By putting `#pragma omp atomic`, you make updating histogram a critical section. Simply speaking, this code basically run sequentially, but then PLUS the overhead of creating threads and what not. It is correct, but its performance is pretty bad.


### Parallel Attempt 3

**Good, but not good enough**: removed implicit barrier

Let's try to adjust algorithm to not have as much critical section

```C
void compute_histogram_mt3(
    char *page, 
    int   page_size,
    int  *histogram, 
    int   num_buckets) 
{
	# pragma omp parallel
    {
        int tid = omp_get_thread_num();
        int local_histogram[NUM_THREADS][num_buckets];

		# pragma omp for nowait
        for (int i = 0; i < page_size; i++) {
            char read_character = page[i];
            local_histogram[tid][read_character]++;
		}

        for (int i = 0; i < num_buckets; i++) {
			#pragma omp atomic
            histogram[i] += local_histogram[tid][i];
        }
    }
}
```

`local_histogram` is a 2D array:
- First dimension: thread ID.
- Second dimension: histogram buckets.

In the parallel region (`#pragma omp parallel`), each thread gets an ID (`tid`), and all threads are alive for the full duration of the region (e.g., lines 3–15).

Inside this parallel region, there’s a for loop preceded by `#pragma omp for`:
- This directive **does not create threads** — it **divides the upcoming loop** among threads that are already active.
- `#pragma omp for` just tells OpenMP to distribute loop iterations to the existing threads.
- for more, see [[Creating Threads in OpenMP]]

Each thread processes a portion of characters from the page:
- It increments its **own** local histogram bucket:
- `local_histogram[tid][read_character]++`

**Implicit Barrier**
- By default, `#pragma omp for` places an implicit barrier at the end of the loop.
- This means no thread can move past the loop until all threads finish their assigned iterations.

**Using nowait**:
• Adding `nowait` to the pragma disables the implicit barrier.
• Threads that finish their part of the loop early can immediately proceed without waiting.

(for more, see [[omp for]])

After the local histogram computation, each thread proceeds to update the **global histogram**:
• This happens in a second loop, which all threads execute.
• Multiple threads may update the same histogram entries simultaneously, so:
• Use `#pragma omp atomic` to ensure safe concurrent updates.

The code is **correct**

**Peformance:** 3.8 seconds. Speed up is NOT 4 yet! (10.36/4)
- We are supposed to be getting a smaller number.

### Parallel Attempt 4

```C
void compute_histogram_mt4(
    char *page,
    int   page_size,
    int  *histogram,
    int   num_buckets) 
{
    int num_threads = omp_get_max_threads();
	#pragma omp parallel
    {
        __declspec(align(64)) int local_histogram[num_threads][num_buckets];
		
        int tid = omp_get_thread_num();
		#pragma omp for
        for (int i = 0; i < page_size; i++) {
            char read_character = page[i];
            local_histogram[tid][read_character]++;
        }

		#pragma omp single
        for (int t = 0; t < num_threads; t++) {
            for (int i = 0; i < num_buckets; i++)
                histogram[i] += local_histogram[t][i];
        }
    }
}
```

`__declspec`: its nothing to do with openmp. it just tells program - i want the beginning of the address of the 2d array to start at somewhere that is a multiple of 64. 
- This makes everything will be well aligned. it may or may not lead to high performance, but it won't hurt the performance.
- Reduces [[Cache Coherence#Cache Coherence and Sources of Performance Loss in Parallel Programs Performance|false sharing]] (i think)

OpenMP will not be able to proceed after line 10 (we have the implicit barrier after the for looop (no `nowait`))

Line 12: `#pragma omp single`
It means that the following structured code must be executed *only once* - we do not need to parallelize this. whichever thread reaches this first, does it and thats it.

This is sequentially, but we do NOT have the atomic anymore. However, we do not want any thread to add `local_histogram` to `histogram`, without knowing that all the other threads have finished working! thats why we need the implicit barrier

**speed is 4.42** - slower than the previous version!

### Parallel Attempt 5

Q: could we end `#pragma omp parallel` before the `#single`?

```C
void compute_histogram_mt4(
    char *page,
    int   page_size,
    int  *histogram,
    int   num_buckets) 
{
    int num_threads = omp_get_max_threads();
	#pragma omp parallel
    {
        __declspec(align(64)) int local_histogram[num_threads][num_buckets];
        int tid = omp_get_thread_num();
		
		#pragma omp for
        for (int i = 0; i < page_size; i++) {
            char read_character = page[i];
            local_histogram[tid][read_character]++;
        }

		#pragma omp single
        for (int t = 0; t < num_threads; t++) {
            for (int i = 0; i < num_buckets; i++)
                histogram[i] += local_histogram[t][i];
        }
    }
}
```
In line 2 (`#pragma omp parallel`), threads are created.

- For a quad-core system, and since no specific thread count is specified, OpenMP creates 4 threads by default.
- Each thread is assigned a unique ID (`tid`), ranging from `0` to `num_threads - 1`, similar to [[MPI]]’s [[Rank]] system.

  

Line 6: `#pragma omp for` (not parallel for):
- No new threads are created here; instead, OpenMP uses the threads already created by the parallel pragma.
- This directive tells the runtime to distribute the iterations of the following for loop among the active threads.
- The loop iterates over `page_size`, meaning the work is divided based on the number of characters in the page array.
	- Each thread reads characters from its assigned portion and updates its own local histogram:
	- `local_histogram[tid][read_character]++`

No critical sections are needed here:
- Even if multiple threads read the same character, each updates its own unique `tid`-indexed row in the histogram.

At the end of the for loop (line 10), OpenMP places an [[omp for#Implicit Barrier|implicit barrier]]:
- All threads must complete the loop before any can proceed further.
- This ensures that every local histogram is fully computed before proceeding to the accumulation step.

  
Starting at line 12, we aggregate the local histograms into the global histogram:
- This uses two nested loops:
	• Outer loop iterates over tid.
	• Inner loop iterates over num_buckets to sum each bucket’s value into the global histogram.
- The directive `#pragma omp single` ensures that this aggregation is performed by only one thread:
- Not a [[Critical Section]] (which allows many threads to execute one at a time), but _only one thread executes the block, once_.

It’s important that the barrier at line 10 exists:
- If a thread proceeds to aggregation before others finish their local computations, it may read incomplete or inconsistent data.
- Removing the barrier here would result in incorrect behavior unless extra synchronization mechanisms are used.

  

Performance observation:
- Despite using 4 threads, this version runs slower (**4.42 seconds**) than a previous version.
- Reason: Starting from line 12, the code becomes completely sequential — only one thread is active while others are idle.
- This serialization creates a bottleneck and negates the benefits of parallelism during aggregation.

  

Comparison to previous version 
- In that version, the implicit barrier was removed (`nowait`), and each thread contributed directly to the global histogram as it finished.
- Threads used `#pragma omp atomic` to safely update the shared histogram, allowing partial parallelism during the aggregation phase.
- Although atomic operations add overhead, they still allow some degree of overlap and parallel execution, unlike the fully serialized single section here.
	- even if there is `atomic`, does not mean fully sequential: maybe threads are working on two different `i`'s

### Parallel Attempt 6

```C
void compute_histogram_mt4(
    char *page,
    int   page_size,
    int  *histogram,
    int   num_buckets) {
    int num_threads = omp_get_max_threads();
	#pragma omp parallel
    {
        __declspec(align(64)) int local_histogram[num_threads][num_buckets];
        int tid = omp_get_thread_num();

		#pragma omp for
        for (int i = 0; i < page_size; i++) {
            char read_character = page[i];
            local_histogram[tid][read_character]++;
        }

		#pragma omp for
        for (int i = 0; i < num_buckets; i++) {
            for (int t = 0; t < num_threads; t++) {
                histogram[i] += local_histogram[t][i];
            }
        }
    }
}
```


In line 12, the **outer for loop** iterates over `num_buckets`, and the **inner loop** iterates over `num_threads`.

- The outer loop is parallelized with `#pragma omp for`.
- This means each thread is assigned a range of buckets.
- For example, one thread might handle buckets 0–2, another handles 3–5, and so on.

Let’s consider thread 0 as an example, suppose it’s responsible for buckets 0, 1, and 2:
- It will iterate over `i = 0`, `i = 1`, `i = 2` (buckets it’s responsible for).
- For each `i`, it executes the entire inner loop: `t` ranges over all thread IDs.
- This means thread 0 accumulates **all the local histogram values** for bucket `i`, across **every thread**.

Each thread works on a unique set of `i` values (buckets), but all iterate over the full set of t.
• No two threads update the same i simultaneously.
• This lack of overlap is what makes it safe to parallelize the outer loop.

We **cannot** use `nowait` at line 10:
• Accumulation can only begin after all threads have completed building their local histograms.
• Skipping the implicit barrier would risk reading incomplete data.

Performance:
• This version runs in **3.60 seconds**, which is faster than the previous two.
• It achieves the best performance so far for histogram computation using this approach.

## Key Takeaways

- [[omp atomic|Atomic]] operation: sometimes we need to use it
	- They are expensive
	- Yet, they are fundamental building blocks
> fundamental: it is needed for correctness. Sometimes, if we do not have (or language does not give us `atomic` or `critical`) it, we cannot gaurantee correct code

- [[Synchronization]] (the [[omp for#`nowait`|no wait]])
	- correctness vs performance loss
	- Rich interaction of hardware-software tradeoffs
> Want [[Speedup]], but want code to be correct. Have to be very careful about the critical section. If you think about these are the two main things in the histogram.

First we brainstorm to find the best parallel strategy, then we start optimizing, and think about atomic operation and synchronization