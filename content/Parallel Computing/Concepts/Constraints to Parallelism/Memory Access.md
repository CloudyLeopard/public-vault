Memory (e.g. 32 GB of RAM) is 1000 times slower than the processor, and disc is about 1000 times slower than the memory --> disc is 1 million times slower than processor.

Also see: [[Cache]], [[Flynn's Taxonomy]] (Shared/Distributed Memory System/Interconnect)
### Accessing 2-D Array
For cache to perform well, you want to access it sequentially (at least for C)

Suppose we have a big array: 1000 x 1000, and double recision floating points. Now, we have a nested for loop to through each element of the matrix and multiple each one by π. 
- Code version 1: access matrix row wise
- Code version 2: access matrix column wise

Row wise is 10x faster (one magnitude) than column wise (in C, and all language descendent from C). This is because C stores multi-dimensional array row wise. So, when you are accessing the big array row wise, this is very **cache-friendly**.

If you access column wise, you will always keep getting cache misses and go to memory, which is very bad performance (cuz you gotta spend time looking in the cache and get cache miss)

Note: this is a *language dependent* problem, because different language has different ways to store a 2D array.

## Virtual Memory
TLB: a piece of hardware used to speed up virtual memory (which is used everywhere now)