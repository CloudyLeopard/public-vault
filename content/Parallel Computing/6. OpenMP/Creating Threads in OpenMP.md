There are three ways to create [[Threading|threads]] in [[OpenMP]]

1. **Call the API `omp_set_num_threads(4)`** – This does _not_ immediately create 4 threads. Instead, it sets the number of threads that will be used the next time a parallel region is executed. OpenMP will create a total of 4 threads when a parallel region begins (which includes the initial thread and 3 additional ones).

2. **When using `#pragma omp parallel`, you can add num_threads(N)** to explicitly specify the number of threads for that particular parallel region. Remember, by default, the program starts with just 1 thread (the main thread).

3. **If you simply write `#pragma omp parallel` without specifying the number of threads**, the OpenMP runtime decides how many threads to use. This behavior is _implementation-dependent_ – the OpenMP standard does not define a specific default thread count. Typically, the runtime chooses a number based on the system’s available logical cores (e.g., on a machine with 4 physical cores and 2-way hyperthreading, you might get 8 logical cores, and thus 8 threads).

Essentially, no threads are created until you actually use the `parallel` keyword ([[omp parallel]])
```C
# pragma omp parallel ...
```

if you've already called any of the above with `parallel` keyword, and within that bracket you run any other `omp` line like `#pragma omp for`, it will *not* create any new threads. Rather, it'll just use the threads already created earlier.

Also see [[Pragmas]]



