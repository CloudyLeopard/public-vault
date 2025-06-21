A reason why [[Cache Coherence]] causes parallelism performance lost.

**False Sharing**: when you update different variables, if they are **in the same [[Cache Block]]**, cache coherence will think you are updating the same thing!

> [!important] Machine only recognizes cache blocks, *not* variables

> [!Example] Example on False Sharing
> Suppose we have an array initialized with some integers. Now, we want to increment every element in the array by 1. In sequential code is easy. But, how do we parallelize with two threads?
> - Strategy #1: Give elements 0-15 to thread 0, and 16-31 to thread 1
> - Strategy #2: Give even elements to thread 0, and odd elements to thread 1
> Both strategies have the *same degree of independence*, and both *have the same amount of calculations*. 
> 
> However, **strategy #1 will be *way* faster**
>
> Problem with Strategy 2: 
> - Thread 0 will need to get `A[0]`, get cache miss, and go get the **cache block** that contains `A[0]` from the memory (usually a cache block has 64 bytes, so 16 ints).
> - Now, `A[0...15]` will be in the cache. But now, thread 1 will need to get `A[1]`, get a cache miss, and get the entire cache block from `A[0...15]` to thread 1 too.
> - The cache coherence hardware *does not understand variables*. It **only understands cache blocks**. Cache coherence will kick in when both threads try to update `A[0]` and `A[1]`.
>
> Strategy 1 does not have this problem: in [[Introducing... Operating Systems!|201]], we learned "alignment". So, the first 16 elements will be in one cache block, and the second 16 elements will be in another. So, cache coherence will not kick in.

