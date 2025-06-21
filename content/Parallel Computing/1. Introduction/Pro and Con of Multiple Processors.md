## Benefits of Multiple Processors

### Multicore Processors Save Power

$Power = C * V^2 * F$, $Performance = Cores * F$
($C$ = capacitance, $V$ = voltage, $F$ = frequency)

As seen in the calculation below, by increasing number of cores, we reduce the power used but achieve the same performance.
![[parallel computing calc example.png|500]]

> Using transistors to build more core, and have slower frequency, reduces power used to achieve the same performance

As a result, the trend to increase performance moved from *higher clock speeds* to *increase core counts* for parallelism.
### Achieve Parallelism

There are **different types of parallelism**
- [[Instruction Level Parallelism]]: parallelism among instructions
- [[Task Level Parallelism]]: parallelism among tasks/threads/processes
- [[Data Level Parallelism]]: processing different data at the same time (with same code)

These are all done with **multi-core**, which [[Introduction to Parallel Computing#Multicore Processors Save Power|reduces power]] as noted earlier.

### Hide Memory Latency

It is also an effective way to **hide memory latency**
- Every time you are going to memory you are *wasting time*.
- Your [[Memory Access|memory]] (e.g. 32 gig of RAM) is 1000 times slower than your processor, and your disc is about 1000 times slower than memory --> disc is slower than 1 million times than processor.
To speed up computing, there is two strategies:
1. speed it up: better algorithm, strategy, etc.
2. hide it: parallel program such that one part is waiting for memory, other part is working. Hence "hiding": doing something useful while other part of it is waiting for the memory

### Simpler Core

> [!question] Simpler core? So like, less focus on smaller transistors or something and more focused on cores?

**Simpler cores** also means
1. easier to design and test
2. higher yield: for example, suppose yield from fabrication is 90%, then 10% of chips is nonfunctional. The higher the yield, the more functional chips, the cheaper the chips are.

Instead of designing and building faster microprocessors, put **multiple cores** on a single integrated circuit

### Heterogenous Cores

Before, the core inside the chip are *copy and paste*. Today, they are different (hetergenous)
- some cores are very fast, consume more power (performance core)
- some cores consume less power and are slower (efficiency cores)
When you cut program into pieces, you will send the piece that requires a lot of computation to the performance cores, etc.

![[heterogenous cores.png]]

## Case "Against" Multiple Core

### Hardware to Software
Previously, the job to improve performance lies with the hardware people (e.g. smaller transistors with [[Moore's Law]]. 

**Now it is up to the programmers**: Adding more cores doesn't help much if programmers aren't aware of them, or don't know how to use them

### No Benefits to Serial Code

**Serial programs** (sequential code) don't benefit from this approach (in most cases).

> [!info] Cases where serial programs benefit from multicore
> Case 1: *Context Switch*. Suppose the program is running multiple applications (like a media player and an editor), the operating system will have to keep doing context switches. This has an overhead and will slow down execution. With multi-core, we can have the media player running on one core, and the editor running on another, and reduce context switching.
> 
> Case 2: *Overheating Core*. When a program is computational heavy and runs on a single core, this core can become very warm. In which case, the core will slow down ([[Core|using dynamic voltage and frequency scaling]]) to avoid burning. However, if there is another idle core, the OS can move the program from the hot core to the other idle one and the program can continue execution at full speed.


See next: [[History of Multicore Programming]]
