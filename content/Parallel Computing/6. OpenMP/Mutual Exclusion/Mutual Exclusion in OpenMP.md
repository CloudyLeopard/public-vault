see [[Mutual Exclusion]]

There are three ways to enforce mutual exclusion in [[OpenMP]]
1. [[omp atomic]]
2. [[omp critical]]
3. [[Locks (OpenMP)]]

Overhead cost wise, atomic < critical < locks. I.e. atomic is the most efficient, locks have the most overhead.