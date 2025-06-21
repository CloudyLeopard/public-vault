Part of the lecture for [[For Loops in OpenMP]] and Data Dependencies
$$\pi = 4\biggl(1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \cdots\biggr)

     = 4 \sum_{k=0}^{\infty} \frac{(-1)^k}{2k + 1}$$
## Sequential Code

We alternate between positive and negative, and denominators are odd numbers. At the end, we multiply everything by 4.

We can write the sequential code as 
```C
double factor = 1.0;
double sum = 0.0;
for (k = 0; k < n; k++) {
	sum += factor / (2*k+1);
	factor = -factor;
}
pi_approx = 4.0*sum;
```

The higher `n`, the more accurate.

## OpenMP Solution 1

**Incorrect Solution**

We use the [[reduction]] operator

```C
double factor = 1.0;
double sum = 0.0;
# pragma omp parallel for num_threads(thread_count) \
	reduction(+:sum)
for (k = 0; k < n; k++) {
	sum += factor / (2*k+1);
	factor = -factor;
}
pi_approx = 4.0*sum;
```

The code is **wrong**: `factor` is declared outside of `# pragma` (it is a [[Scope (OpenMP)|global variable]]). What if a thread needs `factor` positive, and another needs `factor` negative?

The alternation problem is not a [[reduction]] problem.

## OpenMP Solution 2

**Incorrect Solution**

```C
double sum = 0.0;
# pragma omp parallel for num_threads(thread_count) \
	reduction(+:sum)
for (k = 0; k < n; k++) {
	if (k % 2 == 0)
		factor = 1.0;
	else
		factor = -1.0;
		
	sum += factor / (2*k+1);
}
pi_approx = 4.0*sum;
```

Still **wrong**: didn't change anything, just made the code look more complicated. 

## OpenMP Solution 3

We use the [[Scope Clauses]] `private`
```C
double sum = 0.0;
# pragma omp parallel for num_threads(thread_count) \
	reduction(+:sum) private(factor)
for (k = 0; k < n; k++) {
	if (k % 2 == 0)
		factor = 1.0;
	else
		factor = -1.0;
		
	sum += factor / (2*k+1);
}
pi_approx = 4.0*sum;
```

Every thread will have its own copy of `factor`. 

**Correct solution**

Or, we can make it even more readable using the `default` clause:

```C
double sum = 0.0;
# pragma omp parallel for num_threads(thread_count) \
	default(none) reduction(+:sum) private(k, factor) \
	shared(n)
for (k = 0; k < n; k++) {
	if (k % 2 == 0)
		factor = 1.0;
	else
		factor = -1.0;
		
	sum += factor / (2*k+1);
}
pi_approx = 4.0*sum;
```