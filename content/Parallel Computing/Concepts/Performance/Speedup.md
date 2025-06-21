Suppose
- $p$ = number of cores
- $T_\text{serial}$ = Serial run time
- $T_\text{parallel}$ = Parallel run time

$$S(p) = \frac{T_\text{serial}}{T_\text{parallel}}$$
The higher the speed up the better

## Speedup Theoretically and IRL

The diagram below shows speed-up, from perfect speed-up to what's closes to real life

![[speedup example.png]]
![[speedup example 2.png]]

Suppose the program takes 100 unites of time to run sequentially. Then, we run it on a parallel machine with 4 cores.

1. Perfect Parallelization: Each core takes the same time, so total parallel time = 25. Speedup $S(4) = 100/25=4$. However, this never happens in real life: there are always sequential parts, overheads, etc.
2. Perfect [[Load Balancing]]: Add [[Synchronization]] cost, barriers, etc. (but still cores' work are balanced). Total parallel time = 35. Speedup $S(4)=100/35 = 2.85$. However, in real life, we don't have perfect load balancing.
3. Load Imbalance: each core takes a different amount of time to finish (different amount of work); Speedup $S(4) = 100/40=2.5$
4. Load Imbalance AND synchronization cost: this is the closest to real life. Speedup $S(4) = 100/50=2.0$

## Effects of Number of Processes & Problem Size

![[speedup graph.png]]

**Observation**
Regardless of problem size, the shape of each graph is the same: with the same problem size, increase in speedup slows down as number of processes increase. Up to a certain point, the speed up will actually start decreasing

**Explanation and Takeaway**
[[Process (PL)|Creating processes takes time]], so as you keep increasing the number of processes with the same problem size, you are *giving less work to each process* (amount of work done by each process decreases), while *increasing the cost of simply creating processes* (making the OS do more work). 

The smaller the problem size, the more flattening - i.e. the "going down" will go faster. *Where you start going down will depend on the problem size*

