[[Trapezoidal Rule (PC)]]

## Overarching Code

```C
#include <stdio.h>
#include <stdlib.h>
#include <omp.h>

void Trap(double a, double b, int n, double* global_result_p);

int main(int argc, char* argv[]) {
    double global_result = 0.0;   /* Store result in global_result */
    double a, b;                   /* Left and right endpoints */
    int    n;                      /* Total number of trapezoids */
    int    thread_count;

    /* Get the number of threads from the command line */
    thread_count = strtol(argv[1], NULL, 10);

    printf("Enter a, b, and n\n");
    scanf("%lf %lf %d", &a, &b, &n);

    #pragma omp parallel num_threads(thread_count)
    Trap(a, b, n, &global_result);

    printf("With n = %d trapezoids, our estimate\n", n);
    printf("of the integral from %f to %f = %.14e\n",
           a, b, global_result);

    return 0;
} /* main */

void Trap(double a, double b, int n, double* global_result_p) {
    /* implementation of the trapezoidal rule goes here */
} /* Trap */
```

In the code above, we execute the [[Pragmas|pragma]]
`# pragma omp parallel num_threads(thread_count)`
then calls `Trap(...)`

if the user enters 4 threads, each thread will simultaneously execute `Trap`. 

> Q: But, wait a minute... `a, b, n` will get the exact same 4 argument - isn't it redundant?
> A: No, because of what is inside `Trap`.

After we run `Trap`, we are back to one thread only. 

![[trapezoid openmp local_n.png]]

`n` trapezoids and `thread_count` threads

`h`: one trapezoid. 
Every thread will get a bunch of trapezoids (`local_n` trapezoids)
- in the example above, each thread gets 4

```C
void Trap(
    double a,
    double b,
    int    n,
    double* global_result_p) {
    double h, x, my_result;
    double local_a, local_b;
    int    i, local_n;
    int    my_rank      = omp_get_thread_num();
    int    thread_count = omp_get_num_threads();

    h        = (b - a) / n;
    local_n  = n / thread_count;
    local_a  = a + my_rank * local_n * h;
    local_b  = local_a + local_n * h;
    my_result = (f(local_a) + f(local_b)) / 2.0;
    for (i = 1; i <= local_n - 1; i++) {
        x         = local_a + i * h;
        my_result += f(x);
    }
    my_result = my_result * h;

    #pragma omp critical
    *global_result_p += my_result;
} /* Trap */
```

`local_a = a + my_rank * local_n * h`
- in the diagram above, we see that each thread gets `local_n=4` (and also assume `h=1`)
- for thread 1, starting point is `a+4
- for thread 2, starting point is `a+8`
- for thread 3, starting point is `a+12`
- equation wise, thread `my_rank`'s starting point is `a + my_rank * local_n * h`

Ending point
`local_b = local_a + local_n*h`
- starting point of that thread * number of trapezoids * "size" of each trapezoid

(after studying [[Scope (OpenMP)]])
- To add to `my_result`, every thread has its own `my_result`, which is the sum of the local trap. 
- `global_result` is critical section.

## Attempt 2: Using Global Variable

[[Scope (OpenMP)]]

Previously, we added to `global_result` by passing it as a pointer into the function. What if the function access the variable like a global variable?

```C
double Local_trap(double a, double b, int n);
```
and we use it like this:
```C
global_result = 0.0;
# pragma omp parallel num_threads(thread_count)
{
	# pragma omp critical
	global_result += Local_trap(double a, double b, int n);
}
```

The code is *correct*, with *extremely bad performance* - much worse than sequential code.
- You created the threads, then made the entire function a critical section
- Only one thread at a time will execute `Local_trap`
- No parallelism whatsoever

Can fix this problem by
1. declare a private variable inside the parallel block
2. Moving the critical section after the function call

```C
global_result = 0.0;
# pragma omp parallel num_threads(thread_count)
{
	double my_result = 0.0; /* private */
	my_result += Local_trap(double a, double b, int n);
	
	# pragma omp critical
	global_result += my_result;
}
```

## Attempt 3: Reduction Operator

[[reduction]]

The code becomes:
```C
global_result = 0.0;
# pragma omp parallel num_threads(thread_count) \
		reduction(+: global_result)
	global_result += Local_trap(double a, double b, int n);
```

No longer need critical section.
The result will be in `global_result` which is shared

Here, this local trapezoid will be executed in parallel in different threads - no [[Critical Section]]. And then they will add the local results to `global_result`. OpenMP will make sure that the addition is correct - it make sure everything is run in parallel and only force sequential stuff at the end when its adding to `global_result`

## Attempt 4: Reduction Operator *and* Scope

By using [[omp for#` pragma omp parallel for`|parallel for]], we can implement trapezoid even easier

```C
h = (b - a) / n;
approx = (f(a) + f(b)) / 2.0;
#pragma omp parallel for num_threads(thread_count) reduction(+: approx)
for (i = 1; i <= n - 1; i++)
    approx += f(a + i * h);
approx = h * approx;
```

