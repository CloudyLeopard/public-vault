For some program running on machine $X$
$$\text{Performance}_X = \frac{1}{\text{Execution Time}_X}$$
In other words, lower execution time $\rightarrow$ higher performance

> [!Example] Supercomputers!
> At top500.org, you can find the best supercomputers in the entire world.
>
> ![[top supercomputers.png|500]]
>
> "El Capitan": funded by DOE, and has 11 million cores! Of course they are not sharing the same memory. The speed is written in floating points operation/s
> - Rpeak is the theoretical maximum performance (all cache hits, etc.) just measures computational muscle of the machine.
> - Rmax is the actual maximum performance achieved
> Note that the first three machines all passed [[Exaflop|exascale]] - they all pass $10^{18}$. 
> 
> What is quite interesting is the power: 29581 KW, or 29 Megawatt per year. 1 megawatt per year costs $1 million. For machine 1, its $29 million just on electricity, not including programming cost, etc.
> 
> Also, almost all of them are based on GPUs. All of them are based on linux operating system. We will be able to write code on these super computers!
