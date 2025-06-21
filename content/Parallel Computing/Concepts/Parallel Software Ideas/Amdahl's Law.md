**Amdahl's Law** tells us how much of a [[Speedup]] could we get for a given parallelized task?

> [!info] *Pacheco* 2.6.2

If $F$ is the fraction of a program that is purely sequential, then the maximum speed-up that can be achieved by using $P$ processes is 
$$S(p) = \frac{T_\text{seq}}{T_\text{par}} =\frac{1}{F + \frac{1-F}{P}}$$
$P$ is only parallelizing the parallelizable part. There is a part that is only sequential and cannot be parallelized:
![[amdahl's law visual rep.png]]

The theoretical upper bound that you can never reach is: when $P\rightarrow \infty$, speedup = $\frac{1}{F}$

## Derivation of Amdahl's Law
$T_{\text{seq}}$ = time taken to execute the program on a sequential machine
- depends on architecture of hardware, the problem size, and algorithm
$T_{\text{par}}$ = time taken to execute the program on a machine with $p$ cores
- Depends on parallel architecture of hardware, problem size, and parallel algorithm
$F$ = fraction of the program that is purely sequential
$$T_{\text{par}} = F\times T_{\text{seq}} + (1-F)\frac{T_{\text{seq}}}{p}$$
## Main Point of Amdahl's Law
1. Don't blindly invest in large number of processors (before you do your best to reduce $F$ first)
2. Sometimes, having faster core/processor (thru [[Pipelining]], [[Superscalar]], [[Hyperthreading]], etc.) makes more sense than having many of them
	- Reason: having faster core will speed up and reduce the *sequential part* (the pink part in the above diagram).

> [!important]
> Only when program is mostly parallelized (smallest $F$ we can get), does adding more processes help more parallelizing the remaining rest

However, note that time has changed. The above formula provides a general guideline and **upper bound**, but *should not be used to calculate the exact speedup*.
- In his days, many programs have long sequential parts. But, **this is not necessarily the case nowadays** - more stuff can be parallelized now.
- It is not very easy to find $F$ (sequential portions)

> suppose you are given an algorithm in pseudocode, you could try to find $F$ by turning it into code and run it, but that takes effort. **Back of the Envelope Calculations**

- [[Load Balancing|Load may not be balanced]] among cores
- Amdahl's Law also ignored a lot of overheads:
![[amdahl's law overhead.png]]

All of the [[Communication (Constraint)|communication]] costs are **not taken into account**
- Impact of sequential-to-parallel synchronization and inter-core communication

> More threads means more [[Work]] (because of communication). The more parallelism we have, the more our performance suffers when we translate from sequential to parallel and add core communication.

- In application with high degree of data sharing (e.g. communicate data with a global variable), there will be intense inter-core connectivity requirements. Therefore, this work load should be executed on a **smaller number of larger cores** (cores with pipelining, superscalar capabilities, hyperthreading technology) instead of **higher number of weaker cores**.

> Larger cores decrease communication (great). A core that is four-way [[Hyperthreading]] (four threads in one core) will greatly reduce communication because everything is done inside that core.

> Communication is way more expensive than hyperthreading threads competing for resources

- For tasks with high intercore communication requirements, the workload should be assigned to small number of cores, even if the parallelization fraction is close to 1

> Same idea as above: the more communication, the better it is to have fewer bigger cores

- For low arithmetic intensity tasks (less computation, more memory access or IO), the workload may better be assigned to one core, even if parallelization fraction is close to 1

> since they have low arithmetic intensity, they won't be using much of the execution unit. Assigning it all to one core will be better.

**Bottom line: it is not just about parallelization, but about reducing data communication**.
- Try not to use lots of global variables