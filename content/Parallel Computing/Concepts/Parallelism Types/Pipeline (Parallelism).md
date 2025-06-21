A series of **ordered** computation stages need to be applied on data

> [!Warning] This is **not** the same as core [[Pipelining]]

**Loop Level Parallelism**: loop iterations are totally *independent* from each other. Very straight forward.

However, what if iterations are *dependent* on each other? Cannot parallelize!
- Must create [[Synchronization|barriers]], which makes API calls and slow down the program

Or, **extract sub-parallelism from the loop**. This is **pipelining**.

![[pipeline parallelism.png]]

In this picture, every line is *one loop iteration*. 

Cut every loop iteration into 6 pieces. Note: They are also ordered (C1 -> C2 -> … -> C6). 

Because we have 6 pieces, we will need 6 threads. Each thread responsible for a piece:
- Thread 1 will be responsible for C1, Thread 2 for C2, etc. 

| Timestamp | Work                                                                                         |
| --------- | -------------------------------------------------------------------------------------------- |
| 0         | Thread 1 -> Iteration 1’s C1                                                                 |
| 1         | Thread 1 -> Iteration 2’s C1<br>Thread 2 -> Iteration 1’s C2                                 |
| 2         | Thread 1 -> Iteration 3’s C1<br>Thread 2 -> Iteration 2’s C2<br>Thread 3 -> Iteration 1’s C3 |
| …         | …                                                                                            |

This is not as good as loop level parallelism obviously, but it’s better than purely sequential.

Useful for 
- streaming: the file that contain the song or the movie will go through several stages before it is shown to you, very much ammenable for this type of pipelining
- Loops that are hard to parallelize
	- due to inter-loop dependence: there are some dependencies between iterations. Instead of totally giving up, we will try this pipeline

> [!Note] Bad Dependency Scenarios
> If C6 depends on C1 (i.e. if the first thread cannot start C1 because it’s waiting on something from C6), then you cannot parallelize at all. You will have to find a different algorithm.

How to extract parallelism on loops with *some inter-loop dependencies*?
1. split each loop iteration into independent stages (e.g. C1, C2, ...)
2. Assign each stage to a thread (e.g. T1 does C1, T2 does C2)
3. When a thread is done with each stage, it can start with the same stage for the following loop iteration (T1 finishes C1 of iteration 0, then start C1 of iteration 1, etc.)

Advantages
- Exposes intra-loop parallelism
> if you have both inter loop and intra loop, you pick inter loop (cannot have both)
- Locality increases for variables used across stages
> In the example above, thread for C1 is really the same code. so it will use the same variable, and get a better performance (cache hit, locality)

### Example of Pipeline Parallelism
```
// compression algorithm
while (!done) {
	Read block;
	Compress the block;
	Write block;
}
```
While not done, read a block of few bytes of data, compress the block, then write the block. Then get next block, read, compress, put it back, etc.

> Q: Is **inter** loop parallelism possible?
> A: No. You need to compress the file and put it in the file *after* the previous part. The compress block has to be put in the destination file in order. For correctness reason, we cannot execute the iterations in parallel

If we look at the iteration, there are three distinct instructions. And it has to follow the same order. Thus, we have potential for pipeline

![[pipeline parallelism intra loop example.png]]
When we cut the loop into stages, the **stages do not have to be of equal size**

1 core: 48 unit of time
3 core: 1 core does S1, 1 core does S2, 1 core does S3.
- The second thread will start only after a block has been read (which is why you see the beginning after reading)
- The third thread will not write to the disc until you have finished compressing one block.

> **Note: pipeline does not need to lead to [[Load Balancing|load balance]]**

- 34 unit of time

6 core: 2 cores for read, 2 core for compression, 2 for writing
- As soon as two blocks finish reading they start compressing them.
- Notice that we can read and compress in parallel, but *write has to be in sequence*.
- 19 unit of time
