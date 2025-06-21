Grows **logarithmically**

![[core tree.png]]

> [!Example] Homework 1 Question
> **Q:** Suppose we have an array of 1000 integers. We want to find the minimum value of these integers. We have eight cores. How to execute this
> 1) Each core gets 125 numbers and calculates its minimum locally.
> 2) Core 1 sends its minimum to core 0. And core 3 sends its minimum to core 2, ... core 7 sends its minimum to core 6.
> 3) Cores 0, 2, 4 and 6 each calculate the minimum of their numbers.
> 4) Core 2 sends its minimum to core 0 and core 6 sends its minimum to core 4.
> 5) Cores 0 and 4 calculate the minimum of their numbers.
> 6) Core 4 sends its minimum to core 0, which calculates the final answer
