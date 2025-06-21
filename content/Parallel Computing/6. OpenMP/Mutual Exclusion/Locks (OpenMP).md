see [[Mutual Exclusion|locks]]

A lock consists of a data structure and functions that allow the programmer to explicitly **enforce mutual exclusion** in a critical section

> the function works on that data structure, that ensures mutual exclusion
> if ten thread tries to hold the lock, the thread that succeeds will enter the critical section. then, when it finishes, it calls a function to release the lock, and so the other 9 threads can do stuff now

Main action of locks:
```
/* Executed by one thread */
Initialize the lock data structure;
...

/* Executed by multiple threads */
Attempt to lock or set the lock data structure;
Critical section;
Unlock or unset the lock data structure;
...

/* Executed by one thread */
Destroy the lock data structure
```

**Note:** The more you let the program keep track of a lock, the slower it is for the OS - cuz OS gotta keep track of it. so, thats why we want to destroy locks before the program ends.
## OS Calls

```C
void omp_init_lock(omp_lock_t *lock_p);
void omp_set_lock(omp_lock_t *lock_p);
void omp_unset_lock(omp_lock_t *lock_p);
void omp_destroy_lock(omp_lock_t *lock_p);
```

- `omp_set_lock`: either allow you to return and continue into critical section, *or* it will block you and let some other thread go
- `omp_unset_lock`: release the lock
- `omp_destroy_lock`: destroy the lock

