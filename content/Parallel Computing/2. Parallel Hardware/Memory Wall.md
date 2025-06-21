Memory is one of the biggest constraint facing parallel programming.
- [[Memory Access]]
- [[Cache Coherence]]

![[memory wall.png|500]]
**most of the single core performance loss is on the memory system**

As seen from the graph, memory speed is increasing 7% per year - there is a BIG gap between processor and memory speed, and this gap is getting wider

Some people actually are calling this the **Von Neumann bottleneck**. Note: Didn't really see this in the old days because CPU was really slow ([[Trend to Parallel Computing]])

> [!important] The Real Issue is Memory
> In sequential coding, we improve algorithms by examining their Big O notation. In reality (or, specifically for parallel computing), memory is the issue.

Next: [[Flynn's Taxonomy]]
