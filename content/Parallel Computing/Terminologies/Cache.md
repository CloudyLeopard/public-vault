Between the [[Processor]]/[[Core]] and the [[Memory Access|memory modules]], there is one or more level of cache:
- Multi-level caches: level 1, level 2, level 3 cache
- In most of the design, each core has a private L1 cache (small and fast). Then, L2 cache which usually still independent to each core. Finally, L3 cache shared by everybody

> [!note]- More on L1, L2, and L3 cache
> Cache design differs from company. However, regardless of which company you are buying multicore from, each company has a level 1 cache. L1 cache *must* be **fast**, because it needs to be as close to the speed of the CPU (which is really fast) as possible
> 
> L3 cache: much bigger in size, and also higher associativity. It is much slower than L1 and L2
> - there is only **one** L3 cache. this is because this is the last line of defense - if we get a cache miss at L3, we have to go to the memory which is a *very* lengthy trip. To reduce this, we have to reduce the hit rate of L3..
> - So, in all the companyes, L3 is shared.
> 
> L2 cache: the main point of difference between the company. But now the trend is that every core has its own L2 cache
> 
> In essence: L1 must be fast (to match CPU), L3 must be big (to reduce cache miss), and L2 is dependent on company choice

As we go down in level, we dont care as much about performance but _we want to increase the hit rate_. Level 3 is the last line of defense, and if that misses we go to memory and remember _that is SLOW_.

![[multi-level caches.png]]

CPU caches are managed by system hardware: programmers have no direct control over them.

**Cache miss**: system tries to retrieve data from a cache, but that data is not in cache memory.

Related Concept: [[Cache Block]]