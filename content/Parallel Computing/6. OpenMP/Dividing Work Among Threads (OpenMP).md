When we are writing to [[OpenMP]], we are trying to make [[Threading|threads]] execute thing in parallel. until now, we have seen one ways of making threads busy:
- [[For Loops in OpenMP|distributing for loop iterations among threads]]

What if i want something else? What if i want one thread executing `f1()`, another thread execute `f2()`...?

![[divide work among thread - task type.png]]

## Type 1: For loops

We already saw this ([[For Loops in OpenMP]])
```C
#pragma omp parallel for ...
for (...)
```

## Type 2: Threads Run Different Code in Parallel

Solution 1: [[Sections (OpenMP)]]

Solution 2: [[Tasks (OpenMP)]]


## Type 3: Code Executed by only one thread

[[omp single]] or [[omp master]]
```C
# pragma omp single [clause...]
// structured_block
```

if you do `master` then only the structured block must be executed by "master thread"
