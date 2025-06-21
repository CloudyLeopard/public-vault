**Parallelizing a sequential program is NOT VERY EASY**
It is *not* about parallelizing every step of the sequential program.

To parallelize a sequential program 
1. Run the program and **profile** it. 
	- i.e. find out which part of the program takes the longest time, and then see if we can take that part and split it easily (because **[[Load Balancing]]** is important)
2. If it cannot be split apart, maybe we rewrite the program with different algorithm that can be parallelized. Cuz *not all program can be parallelized*. (e.g. its much easier to parallelize bubble sort than quick sort)
3. Parallel strategy also depends on the software we try to parallelize.

## Example

### Initial Attempt
Compute `n` values and add them together
```
sum = 0
for (i = 0; i < n; i++) {
	x = compute_next_value(...);
	sum += x;
}
```

To parallelize this (lets call them threads or tasks), the problem size has to be much bigger than the number of tasks (see [[Introduction to Parallel Computing]])
- For example, if `n=10`, we cannot have 10 tasks.
- You will find the parallel code is much slower than your sequential task, because creating a task is expensive. If you create a task for 10 numbers, each task will be doing a little work. You paid a lot to create each task but each task doesn't do much.

Assume we have `p` cores and `p` is much smaller than `n`
Each core performs a partial sum of approximately `n/p` values
```
my_sum = 0;
my_first_i = ...;
my_last_i = ...;
for (my_i = my_first_i; my_i < my_last_i; my_i++) {
	my_x = compute_next_value(...);
	my_sum += my_x;
}
```
Each core uses its own private variables, and executes this block of code independently of other cores.

Once all the cores are done computing their private `my_sum`, they form a global sum by sending results to a designated "master" core which adds the final result.

```
if (I'm the master core) {
	sum = my_x;
	for each core other than myself {
		receive value from core;
		sum += value;
	}
} else {
	send my_x to the master;
}
```

> [!important] Is the code correct?
> YES. But, let's be careful
> But, it is **not efficient**. We will later have a whole lecture called **performance analysis**.

The problem is that there is one core receiving all the values from all the other cores and making *all* the computations. We have a severe **load imbalance**
- the master core will become hot, but all the other cores all idle and have threads that are doing nothing.

Communication is also detrimental to performance! All the cores are sending values to the master core (think about highway where every car is exiting onto the same road)

### Better Parallel Algorithm
[["Tree" Trick]]

Don't make the master core do all the work. Instead, share it among the other cores
Pair the cores: core 0 add its result with core 1's result, core 2 add its result with core 3's...
- No more communication contention. Kind of like forming a tree, which is good **because tree grows logarithmically**, making the problem scalable.
![[core tree.png]]

Assuming the same example as the image...
- In the first version, the master core performs 7 receives and 7 additions
- In the second version, the master core performs 3 receives and 3 additions - the improvement is more than a factor of 2.
The difference is much more significant with larger number of cores
- If we have 1000 cores, the first example would require the master to perform 999 receives and additions
- The second example would only require 10 receives and 10 additions

> [!important] Keep this "Tree" trick in the arsenal.

## Strategy: Partitioning

Two ways of thinking:
- **[[Task Level Parallelism|Task-Parallelism]]**: different code (e.g. minimum, maximum, average)
- **[[Data Level Parallelism|Data-Parallelism]]**: same code, different data (e.g. matrix multiplication)

Some constraints:
- communication (try to hide it)
- [[Memory Access]] (cache)
- [[Load Balancing]]
- [[Synchronization]]

