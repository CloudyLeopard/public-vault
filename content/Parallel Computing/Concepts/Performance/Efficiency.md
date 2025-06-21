Efficiency is calculated by dividing [[Speedup]] by the number of processes/threads/cores. It is a measurement of **how well the program is making use of the available resources** (the resources being $p$, e.g. number of processors)
$$E = \frac{\text{Speedup}}{p} = \frac{T_\text{serial} / T_\text{parallel}}{p}$$

$p$ = number of threads, processes, or cores

The higher the efficiency the better.

Generally, as the number of core (or $p$) increases, the speed up should increase. In this case
- if $E$ increases, that means speedup grows faster than $p$: the system is getting more benefits from additional cores
- if $E$ decreases, that means speedup grows slower than $p$: the additional cores are not used effectively.

> [!Warning] Higher Efficiency *Does Not Imply* Higher Speedup
> Efficiency indicates how well you do with extra resources. Since $E = S(p)/p$, having lower $p$ tends to result in higher efficiency but lower speedup. Also, having 1 core will have an efficiency of 1.

> [!note] How to improve efficiency?
> Sometimes, you cannot improve efficiency. Efficiency does not measure how fast your code is, but how well your processes are using resources. It is possible that you are getting parallelism, but every thread/core is just doing little work.

## Effects of Number of Processes & Problem Size

![[efficiency graph.png]]

**Observation #1**
With the same problem size, efficiency decreases as the number of processes increase

**Explanation and Takeaway**
You are not making the best use of processes when there are a lot of them: some of them will get little work (or no work at all).

The smaller the problem size, the faster and deeper it will go down.

**Observation #2**
Smaller problem size means worse efficiency

**Explanation**
A smaller problem size means you are giving less work to each process, so program is less efficient.

> [!info] The Efficiency of One Process is Defined as 1
> Efficiency is speedup / # of processes, and speed up = t serial / t parallel. When there is just one process, t serial = t parallel, so speedup = 1, and # of processes = 1.
