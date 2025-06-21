When at least two tasks are *literally* executing at the same time. This requires hardware with multiple [[Core|processing units]].

Parallelism is a **subset** of [[Concurrency]].
(All Programs (Concurrent Programs (Parallel Programs)))

## Patterns in Parallelism

There are several ways for parallelizing an algorithm... depending on the problem at hand. **What are these ways (or patterns)?**

> knowing these patterns/ways will make things much easier when i start from the english definition of the problem and come up with an algorithm.

- [[Task Level Parallelism|Task Level]] (e.g. Embarrassingly parallel)
- [[Divide and Conquer (PL)|Divide and Conquer]]
- [[Pipeline (Parallelism)]]
	- Iterations (loops)
- Client-server ([[Repository Model]])
- Geometric (usually domain dependent)
- Hybrid (different program phases)

We will be looking at the first 5.
