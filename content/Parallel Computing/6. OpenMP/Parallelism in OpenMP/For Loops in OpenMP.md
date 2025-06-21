[[OpenMP]] is designed to parallelize for loops. Parallelizing for loops is your job to ensure the loop iterations are independent.

The for loops must be in one of these forms:
![[Legal Forms for Parallelizable For Statements.png]]

## Caveats

- The variable **index** must have integer or pointer type (e.g. it can't be a float)
> There isn't rlly a language that allows for floating point index. Why?
> The catch: at the end, it is a floating point, and you are incrementing it, and there may be some approxiation error with floating point. Based on precision of the machine, the number if iterations may differ. We do not want to enter into that thing, so loop index must be int or pointer type.
>
> Pointer is an address

- The expressions **start**, **end**, and **incr** must have a compatible type.
> basically you cannot mix type

- The expressions **start**, **end**, and **incr** must not change during execution of the loop
> changing them may change number of iteration, which is not allowed in OpenMP

- During execution fo the loop, the variable **index** can only be modified by the "increment expression" in the for statement
> You cannot modify `index` inside the loop body

## Data Dependencies

Code that is sometimes correct can sometimes is wrong

1. OpenMP compilers do NOT check for dependencies among iterations in a loop that's being parallelized with a [[omp for#` pragma omp parallel for`|parallel for]] directive

> [!info] Why?
> it is very hard by static analysis alone to check for dependencies between loop iterations. So, we let the programmer decide that the loop is independent and compiler parallelize them blindly

2. A loop in which the results of one or more iterations depend on other iterations cannot, in general, be correctly parallelized by OpenMP

> [!note] Kind of relates to the idea of [[Safety in MPI Programs|Safety in MPI]]

Example: Fibonacci Sequence

![[openmp data dependencies example fibonacci.png]]

### Couple Examples

#### Example 1:

Q: Do we have to worry about the following?
```C
# pragma omp parallel for num_threads(2)
for (i = 0; i < n; i++) {
	x[i] = a + i*h;
	y[i] = exp(x[i]);
}
```

Two threads, every thread will take `n/2` iterations. At every iteration, the thread will execute the first line, then the second line. The two lines will never be executed out of order, so we will be ok.

Also, in the loop body, the `i` does not get modified. the iteration here are independent and are correct.

#### Example 2: Estimating Pi

See [[Estimating Pi]]