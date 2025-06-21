
**Scalability** is the ability of a (software or hardware) system to handle a growing amount of work efficiently. For this course, we concentrate on software.

> [!note]
> If we have a bigger problem size, $T_\text{serial}$ increases. How much $T_\text{parallel}$ increases tells us the scalability of a system

Recall the [[Efficiency]] formula:
$$E = \frac{T_\text{serial} / T_\text{parallel}}{p}$$
In both scenarios, we keep **efficiency fixed**:
- Scenario 1: If we *increase* $p$ (number of processes/threads), and can keep efficiency fixed *without increasing* $T_\text{serial}$ (the problem size), the problem is **strongly scalable**

> [!note] Explanation
> If problem size is fixed, but I get more processes/threads, and efficiency stays the same, that means that I can give the new cores a lot more work to do.
>
> Mathematically, we increase $p$ but $T_\text{serial}$ stays the same. For $E$ to stay the same, $S(p)$ must increase as the same rate we increase $p$. The only way to do so is if $T_\text{parallel}$ decrease. 
>
> The problem is **strongly scalable**: more $p$ leads to a much lower parallel time at the same (efficiency) rate.

- Scenario 2: If we *increase* $p$, but keep efficiency fixed by *increasing* $T_\text{serial}$ (the problem size) at the same rate we increase $p$, the problem is **weakly scalable**

