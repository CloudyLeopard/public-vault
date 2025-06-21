
The most commonly used one, basically splits up a for loop's iteration between however many iterations you have.

```C
# pragma omp for ...
```
where `...` are the additional clauses

Also see [[omp parallel#` pragma omp parallel for`|omp parallel for]]
## Implicit Barrier
[[Synchronization]]
By default, `#pragma omp for` places an implicit barrier at the end of the loop.

This means no thread can move past the loop until all threads finish their assigned iterations.

You can remove the implicit barrier by using a [[nowait]] clause

## `#pragma omp parallel for`

The following line after `for` *must* be for loop.

1. Forks a team of threads to execute the following structured block.
2. The structured block following the parallel for directive **must be a for loop**
3. The system parallelizes the for loop by **dividing the iterations of the loop among the threads**

In a loop that is parallelized with `parallel for`, the **default [[Scope (OpenMP)|scope]] of the loop index (e.g. `i`) is private**.

> [!Example]
> In the code below, `i` is privately scoped
> 
> ```C
> h = (b - a) / n;
> approx = (f(a) + f(b)) / 2.0;
> #pragma omp parallel for num_threads(thread_count) reduction(+: approx)
> for (i = 1; i <= n - 1; i++)
>     approx += f(a + i * h);
> approx = h * approx;
> ```

This scope behavior **can be overridden** using clauses:
- `default(), shared(), private()`
