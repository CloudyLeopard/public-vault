
A **reduction** is a computation that repeatedly applies the same reduction **operator** to a sequence of operands to get a single result stord in **reduction variable** (We have seen that in MPI!)

Reduction variable: the variable that stores the final result

A reduction clause can be added to a parallel directive (`# pragma omp ...`)
```C
reduction (<operator>: <variable list>)
```
Operators include: `+, *, -, &, |, ^, &&, ||`
Variable list: can be a comma separated list

> [!Example] [[Trapezoidal Rule (OpenMP)#Attempt 3 Reduction Operator|Trapezoidal Rule]]
> The code becomes:
> ```C
> global_result = 0.0;
> # pragma omp parallel num_threads(thread_count) \
> 		reduction(+: global_result)
> 	global_result += Local_trap(double a, double b, int n);
> ```
>
> > [!note] `\` is used for multi-line
> We add the `\` to make sure that this is all in the same line. `\` tells the OpenMP preprocessor the entire line of code continues onto the next line
