```C
# pragma omp atomic
```

the `atomic` will ensure no two threads will be in the critical section line at the same time.

`atomic` has higher performance than `critical` (see [[omp critical]])

> every critical section has an over time, but the overtime of `atomic` is less than that of `critical`

It can only protect critical sections that consist of a **single C assignment statement**

The statement must have one of the following forms:

![[atomic directive form.png]]
