From [[Trend to Parallel Computing]], we saw that the trend is
1. Have more cores inside the chip and
2. Cores are no longer copy and paste from each other (heterogenous)

How did the hardware evolve like that?

| Generation                | Implementation                                                                               | Parallelism Achieved                                         |
| ------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| First Generation (1970s)  | [[Single Cycle Implementation]]                                                              |                                                              |
| Second Generation         | [[Pipelining]]                                                                               | [[Temporal Parallelism]]                                     |
| Intermediate Enhancements | Cache Memory: multi-level caches<br>Virtual Memory: TLB<br>(for more, see [[Memory Access]]) |                                                              |
| Third Generation          | [[Superscalar]]<br>[[Speculative Execution]]                                                 | [[Spatial Parallelism]]<br>[[Instruction Level Parallelism]] |
| Fourth Generation (2000s) | [[Hyperthreading]]                                                                           |                                                              |

> [!important] Pipelining, Superscalar, Hyperthreading Difference
> Pipelining and Superscalar make the execution of one thread faster, but do not result in more than one thread to be executed in a core. Hyperthreading does that.

The evolution from single core to multicore meant that software people now have to do things to improve performance: we cannot just rely on new generations of processors.

Problem: not enough experience in parallel programming
- parallel programs of old days were restricted to some elite applications -> very few programmers, organizations, or governments can do this stuff
- Now, we need parallel programs for *many different applications*

![[software hardware community.png]]Software community tell their wishes to computer architecture, who design chips and gives them to people who create these chips and tell them what can or what can be done (add restrictions but give some capabilities), goes back to computer architecture.
Computer architecture then tells software community what are the new performance and what are the new restrictions etc.

The multicore software triad (how development looks like)
- Application performance
- software reliability
- Development time

Next: [[Memory Wall]]