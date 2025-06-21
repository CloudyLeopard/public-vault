
Directive to [[Creating Threads in OpenMP|create threads]]

```C
# pragma omp parallel ...
```

`parallel` is the keyword for creating threads

Could also directly create the threads right before calling on a for loop, which then basically combined the `parallel` and `for` directive:
```C
# pragma omp parallel for ...
```
For more, see [[omp for#` pragma omp parallel for`|pragma omp parallel for]]