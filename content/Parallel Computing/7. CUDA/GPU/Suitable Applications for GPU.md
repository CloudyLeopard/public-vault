
> [!important]
> Only consider using a GPU if an application matches **all four characteristics below**

1. Computationally intensive
There are no idle time

2. Many **independent** computations
GPU gets good performance from *vast* performance, which means computations should not be dependent on each other

3. Many **similar** computations
GPU follows [[SIMD]] architecture, i.e. we run the *same* subset of code on a large number of data

4. Problem size is big enough
Execution on GPU has a *huge* overhead: bringing data from system memory to GPU memory along is a *very slow operation*. In order to get good performance overall, performance gain from GPU must overcome the cost of this slow operation (which will only happen if problem size is big enough)

## Problems Faced by GPU

Kind of related to the topic discussed above, the problems faced by GPU is often basically the inverse:

- Not enough parallelism 
problem not big enough to overcome communication

- Under utilization
not enough independent execution, not using all of the execution units in the GPU

- [[Memory Access]]
as usual, this always takes lot of time

[[Bandwidth]] to multicore memory
- GPUs need to get data fro multicore memory and put them in GPU memory before processing them
- this is *very expensive*.
