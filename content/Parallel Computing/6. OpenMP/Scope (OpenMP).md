
in serial programming, the scope of a variable consists of those parts of a program in which the variable can be used
> we know local variables are only used in a functino they are defined; global variables can be used in any program in the current C file, and so on

In parallel, the definition of scope is a little bit different

In [[OpenMP]], the scope of a variable refers to the **set of threads that can access the variable in a parallel block**
> if there are variables inside parallel block, that variable can be acess by all the [[Threading|threads]] (**shared variable**), or every thread will have its own copy of that thing (e.g. histogram version of `tid` - private to each thread)
> this is under your control (as the programer). You can choose which variable is private to every thread, and which variable must be shraed by allt he thread.
> must be careful: for shared variable, if more than one thread is updating that variable, it is a [[Critical Section]] and have to be careful of what you are doing.

## Scope in OpenMP

Rule #1: A variable that can be access by all the threads in the team has **shared** scope.
- This variable is defined **before the parallel block** (before `#pragma omp parallel`)

Rule #2: A variable that can only be accessed by a single thread has **private** scope.
- This variable is defined **inside a parallel block** (after `#pragma omp parallel`)

Rule #3: Loop index created by [[omp for#` pragma omp parallel for`|parallel for]] is **private** *by default*
- this can be overridden using the `default()`, `shared()`, and `private()` clauses

The default scope for variables declared before a parallel block is shared.

**The default behavior can be overridden using clauses:** [[Scope Clauses]]

> [!Example]
> ![[scope openmp example.png]]
> `my_rank` is declared inside `Hello()`, which is inside a parallel lock -> `my_rank` is a private variable (i.e. every thread has its own `my_rank`)
> 
> `thread_count` declared *inside* `Hello()` is **different** from the one outside, and is thus also private. Even though `omp_get_num_threads` returns the same value, it is a different variable between threads
>
> > [!Question] Why did we use `thread_count` as private?
> This is related to the grammar of C. `thread_count` is not global! Inside `Hello`, we cannot access `thread_count` defined in `main()`.

