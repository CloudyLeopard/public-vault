Foster's Methodology to [[Writing Parallel Programs]]

> [!info] *Pacheco* 2.7

This is a method (well, more a general framework) on [[Writing Parallel Programs]]

In general, the P & C step designs your program using machine-independent issues
- concurrency, scalability
The A & M step is to tweak your program to make best use of the underlying hardware

> [!info]- Visual Representation
> ![[PCAM Methodology.png|600]]

**1. Partitioning**: divide the *computation* to be performed and the *data* operated on by the computation into small tasks. The focus here is to identify *tasks that can be executed in parallel*

> [!note]- More on Partitioning
> Simply speaking, look at hotspot and try to split it up into as many smaller tasks as possible. This step brings out the parallelism in the algorithm
>
> Checklist for problem partitioning:
> 1. does partition define at least an order of magnitude more tasks than there are processors/cores in your target computer? If not, your design may not be scalable and/or lose performance
> 
> > two tasks in parallel may not cancel out the cost it took to create the threads or processes and make them execute in parallel. need way more tasks than number of cores
> 
> 2. Does your partition avoid redundant computation and storage requirements? If not, the resulting algorithm may not be scalable to deal with large numbers
> 
> 3. Are tasks of comparable size? If not, you may face load balancing issues later.
> 
> 1. Does the number of tasks scale witht he problem size? Rule of thumb: *an increase in problem size should increase the number of tasks rather than the size of individual tasks*.
>
> > When you have a bigger problem, you are increasing the number of work per thread, your code is not the best. a good quality parallel code is, when the problem gets bigger, you can get more threads or more cores.
>
> > [!example]-
> > We have a list and we want to determine number of ways each number appear
> > - Strategy 1: one thread is responsible for counting number of for one character. But what happens when the string gets longer and longer? -> each thread needs to work more.
> > - Strategy 2: take that string, take it into pieces (4), and give every thread a piece. Every thread will be counting its numbers. If we have bigger strings, we can just cut it up more and each thread will not rlly be doing more work.
>
> 5. Have you identified several alternative partitions?
> 
> > e.g. we know floating points take more time than ints. Multiplications and divisions take longer than additions and subtractions.

**2. Communication**: determine what [[Communication (Constraint)|communication]] needs to be carried out among the tasks identified in the previous steps

> [!note]- More on Communication
> When a task depends on a previous task, communication is required. On a side note, if most of the task depends on a certain task, we cannot really parallelize the algorithm - may have to consider another algorithm since the [[Writing Parallel Programs#Writing a Parallel Program|best algo for sequential may not be the best for parallel]].
>
> Checklist:
> 1. Do all tasks perform about the same number of communication operations? (e.g. same amount of arrows going out of it). Unbalanced communication requirements suggest a non-scalable construct 
> 
> > **Unscalable Construct**: if we get a bigger machine, we still will not get a bigger performance; or, if the program gets bigger and bigger, performance go down by a lot
> 
> 2. Does each task communicate only with a small number of neighbors? 
> 	- If each task must communicate with many other tasks, evaluate the possibility of formulating this global communication in terms of a local communication structure. (if we have to broadcast something, maybe reformulate the algorithm. Or, could we recalculate the data instead of getting data from another core - recalculation is much cheaper than communication)
>
> > If your core is communicating with its neighbors, it's fine. But if it's communicating with a core that is far away, it will take much longer
>
> 1. Are communication operations able to proceed concurrently? If not, your algorithm is likely to be inefficient and non-scalable.

**3. Agglomeration or Aggregation**: Combine tasks and communication identified in the first step into larger tasks. For example, if task A must be executed before task B can be executed, it may make sense to aggregate them into a single composite task. 

> [!note]- More on Aggregation
> this is the step to think if you can combine two tasks or not. Aggregation is putting tasks together for the *sake of reducing the amount of communication*.
>
> Checklist
> 1. Has agglomeration reduced [[Communication (Constraint)|communication costs]] by increasing locality? If not, examine your algorithm to determine whether this could be achieved using an agglomeration strategy
> 2. Have you explored replicated data or computation to reduce communication cost and explored the benefits and costs?
>>  At least a few extra computation to reduce communication will pay off. 
> 3. Has agglomeration affected [[Load Balancing]] in a negative way? You may need to check several agglomeration alternatives
> > Some tasks much bigger than another will have load imbalance. And, we mean computation AND communication

**4. Mapping**: assign the composite tasks identified in the previous step to [[Process (PL)|processes]]/[[Threading|threads]]. This should be done such that
- Communication is minimized
- Each process/thread gets roughly the same amount of work ([[Load Balancing]]) (note, same amount of *work*, NOT *computation*)

For detail on choosing threads or processes, see [[Threads vs. Processes]].

> [!note] More on Mapping
> Here, we ask: should we surround our tasks with [[Process (PL)|processes]] and communicate with each other ([[MPI]])? Or, should we have one process and multiple [[Threading|threads]], and communicate using memory ([[OpenMP]])? Or, use an accelerator ([[CODA]])?
> 
> Assigning tasks to processes threads can be done using:
> - Dynamic threading
> - Static threads
> - Single Program multiple Data (SPMD)
> 
> Need to decide on whether to use
> - one process with several threads
> - Several processes with one thread each
> - Several processes with several thread each
> 


## Example: Histogram

Goal is to create a histogram a list of data:
![[pcam example histogram.png|400]]

The input to our program:
![[pcam histogram example input.png|400]]

Output:
1. `bin_maxes`: an array of `bin_count` floats → store the upper bound of each bin
2. `bin_counts` : an array of `bin_count` ints → stores the number of elements in each bin

### Serial Program

How to write it using a serial program? (note, [[Writing Parallel Programs#Writing a Parallel Program|its always advisable to first write a serial program]])
1. The number of measurements: `data_count`
2. An array of `data_count` floats: `data`
3. The minimum value for the bin containing the smallest values: `min_meas`
4. The maximum value for the bin containing the largaest values: `max_meas`
5. The number of bins: `bin_count`

Serial Program:
```
int bin = 0
for (i = 0; i < data_count; i++) {
	bin = find_bin(data[i], ...)
	bin_counts[bin]++
}
```

### Applying PCAM

Each `find_bin` generates a number, `b`, which is used to generate the corresponding bin. 
`Find_bin` returns the bin that `data[i]` belongs to.
![[pcam histogram example.png]]

Note: we **cannot agglomerate** them (I presume because of dependencies)

Instead, we create **local** histograms, where each one of the `data[...]` elements will update the local histogram. At the end, we combine the local histograms to create a global histogram

![[pcam histogram example 2.png]]

Then, when we add the local arrays, we get something like this ([["Tree" Trick]]):
![[pcam histogram example 3.png]]