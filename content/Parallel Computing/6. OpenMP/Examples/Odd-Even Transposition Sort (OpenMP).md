See [[Parallel Sorting]]

## Bubble Sort

Sequential code
```C
for (list_length = n; list_length >= 2; list_length--)
	for (i = 0; i < list_length - 1; i++) {
		if (a[i] > a[i+1]) {
			temp = a[i];
			a[i] = a[i+1];
			a[i+1] = temp;
		}
	}
```

Q: can the [[For Loops in OpenMP|out for loop be parallelized]]?
A: no, there are **loop-carried dependency** in outer loop
loop iteration is `list_length`. What condition makes the outer loop's iteration dependent on each other?

Q: Why is the outer loop iteration dependent on each other?
A: when `list_length = n`, after the first pass, we are sure the highest element is at the right most position. When we start `n-1`, we already assume/ensure that the biggest element is at the correct position. If we do not execute in order, we are not sure that the biggest element (or, really, the next biggest) is at the rightmost/correct position.

We are putting the element to the correct position *iteration by iteration*.

For the inner for loop, there is also **loop-carried dependency**

## Serial Odd-Even Transposition Sort

```C
for (phase = 0; phase < n; phase++)
    if (phase % 2 == 0)
        for (i = 1; i < n; i += 2)
            if (a[i-1] > a[i])
                Swap(&a[i-1], &a[i]);
    else
        for (i = 1; i < n-1; i += 2)
            if (a[i] > a[i+1])
                Swap(&a[i], &a[i+1]);
```

number phases = number of elements in the list
Even phrase: we compare and swap 0 and 1, 2 and 3, 4 and 5, etc. Always the first element is even
Odd phrase: we compare and swap 1 and 2, 3 and 4, 5 and 6, etc. 

There is no dependence in inner loops
But there is outer-loop carried dependence

## Parallel Odd-Even Transposition Sort

Two versions:

Version 1:
```C
for (phase = 0; phase < n; phase++) {
    if (phase % 2 == 0) {
        #pragma omp parallel for num_threads(thread_count) \
            default(none) shared(a, n) private(i, tmp)
        for (i = 1; i < n; i += 2) {
            if (a[i-1] > a[i]) {
                tmp    = a[i-1];
                a[i-1] = a[i];
                a[i]   = tmp;
            }
        }
    } else {
        #pragma omp parallel for num_threads(thread_count) \
            default(none) shared(a, n) private(i, tmp)
        for (i = 1; i < n-1; i += 2) {
            if (a[i] > a[i+1]) {
                tmp    = a[i+1];
                a[i+1] = a[i];
                a[i]   = tmp;
            }
        }
    }
}
```

Note: it's impossible for a thread to finish its task before others, and proceed from phase `p` to `p+1` before the other threads. This is because the threads are created *and* destroyed at the end of the for loop due to the [[omp for#` pragma omp parallel for`|parallel for]] directive

This is a huge performance issue - for every outer iteration, OpenMP will fork-join threads. Repeated overhead per iteration

Version 2 (better):

```C
#pragma omp parallel num_threads(thread_count) \
    default(none) shared(a, n) private(i, tmp, phase)
for (phase = 0; phase < n; phase++) {
    if (phase % 2 == 0) {
        #pragma omp for
        for (i = 1; i < n; i += 2) {
            if (a[i-1] > a[i]) {
                tmp    = a[i-1];
                a[i-1] = a[i];
                a[i]   = tmp;
            }
        }
    } else {
        #pragma omp for
        for (i = 1; i < n-1; i += 2) {
            if (a[i] > a[i+1]) {
                tmp    = a[i+1];
                a[i+1] = a[i];
                a[i]   = tmp;
            }
        }
    }
}
```

Solution is simple: create the threads first using [[omp parallel]]
- `#pragma omp` does not create threads. Just tells openMP to use whatever thread is available to the code at that point,a nd distribute the for loop among them.