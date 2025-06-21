Also known as **cache line**.

A block is **a group of bytes**. In the current multicore, the cache block is 64 bytes.

Suppose a [[Core]] tries to access `x`, but it is not in its [[Cache]] (cache miss), the system will retrieve the entire block of memory that contains `x` and move it into the cache. This block of memory is called "cache block".

It is important to note that the hardware does not recognize concepts like "variables", unlike us programmers. So, if `x` is changed, the hardware doesn't see that `x` has changed, but that the entire cache block that contains `x` has been changed. This is why if you get a cache miss at like `addr1`, and you try to then access `addr2`, you will find that `addr2` will also be in cache.

> [!note] This also causes [[Cache Coherence|False Sharing]]

Each block also has a tag (i think)
## Set Associative

A cache can be simply thought of as a piece of hardware made up of groups of several cache blocks.
--> A cache is divided into sets, each set is divided into cache blocks

A system that is `x`-way set associative means each set in the cache can hold `x` blocks

In other words:
`total cache size = number of sets * set associativity * cache block size` where `set associativity = x`

The higher set associativity leads to lower cache misses (higher hit rate) and fewer conflicts. However, the tradeoff is increased complexity and could be slower.

> [!note] Set Associativity Does Not Affect [[Cache Coherence]]