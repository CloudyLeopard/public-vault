A way to measure an algorithm's efficiency *without actually running it*. If you have several algorithms and you want to see which one to move forward with, a good idea is to draw the DAG, analyze it, and determine which one to use. (Better in terms of which one has better parallelism, etc.)

![[DAG model for multithreading.png|400]]

The graph has to be **acyclic** and **finite**. Even if the algorithm has a loop, technically every iteration is a different instruction (you'd just "run" out the loop a few times to unfold it and analyze the DAG)

**The DAG for an algorithm must start with one node and end with one node**. Except the start and end nodes, all other nodes must have at least one input and one output arrow.

**Vertex**: unit of execution. Could be any of the following
- An instruction
- A basic block
- A function
- Any granularity you decide on 

You can choose what the vertex represents, but you have to be **consistent**

> [!important] Vertex time is not necessarily constant
> The time it takes to execute a "vertex" does not have to be the same across vertices. For example, some instruction will take longer than others.

**Edge**: indicates dependency. For example, an edge from vertex A to vertex B means A must execute first, then followed by B.

**[[Work]]**: total amount of time spent on **all** instructions - essentially total amount of time running it sequentially. Also, could be seen as $T_1$.

> [!example]
> Assuming every vertex takes the same amount of time (1 time unit), then...
> In the DAG above, "work" is **18**. It's basically total amount of time running it sequentially.

$T_P$ = fastest possible execution time on $P$ processors
**Work law**
$$T_P \geq T_1/P$$
$T_1$ is work (purely sequential execution) - basically time using 1 processor/core

> [!note] More on Work Law
> In 99% of the time, this work law will hold. This is because $T_1/P$ assumes linear decreasing in time that has not been taking into account - things are not as linear as you'd think. So $T_P$ is usually bigger, but in rare cases it is the same.

**Span**: longest path of dependence in the DAG. 
- It is a **timing measurement**: the longest path that *depends on timing*. If an instruction takes longer time units, the span will be different (it's not just about longest path)
- Span $= T_\infty$: with infinite processors, we will still take "span" time units to finish

> [!example]
> Assuming every vertex takes the same amount of time (1 time unit), then...
> In the DAG above, the span is 9 time unit (from 1 to 18)
>
> Assuming vertex 15 takes 20 time unit, then the span is 25

**Span Law**
$$T_P \geq T_\infty$$
$$T_1 \geq T_2 \geq T_3 \geq \ldots \geq T_\infty$$

**Ratio of Work to Span**
$$\frac{T_1}{T_\infty}$$
The higher the ratio, the better! Simply speaking, $T_1 / T_\infty$ is the **maximum possible speed up** that can be created by **any number of cores/processors**. Higher = more speed up potential

> [!info] Speedup
>  The [[Speedup]] is the $T_\text{seq}$ of the program divided by the $T_\text{par}$

> [!example] Ratio of Work to Span Example
 > ![[ratio of work to span example 1.png]]
 > 
 > 6.25 is the highest possible speed up given *any* number of processors.
 > Note: the reason it's not 8 (or the span) is because the starting and ending node takes time (and cannot be parallelized)
 >
 > **Follow Up Question**: Assume the [[Parallelism]] is 6.25. What is the *minimum number of cores* that can give me the best speedup?
 > **A:** Sequential time ($T_1$, or work ) is 50. With 8 cores, $50/8=6.25$ - you will never get a higher speed up than this. With 7 cores, we will get a slightly lower speed up: 7 cores run 6 units of time, then another 6 units after the 7 core is done.
 >
 > Note: using 7 cores will give you the exact same speed up as using 4 cores, but $T_8$ will give you the highest one.

## Comparison to [[Amdahl's Law]]
DAG is more precise, but Amdahl's law is easier to calculate. So, I could first use Amdahl's law first to make initial eliminations, then use DAG to find out what is the better method for the remaining algorithms.

 