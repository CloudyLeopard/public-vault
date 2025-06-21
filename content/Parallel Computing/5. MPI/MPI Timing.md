See [[Timing]] for review on sequential code timing measurement

Use [[MPI_Barrier]].

From the past we have:
- `time` in Linux
> we get real, sys, and usr for each of the n processes. its useful but its not what we want - we want the time for the whole process.
- `clock()` inside code
> clock gives you CPU time. you run it before and after the piece of code you want to measure, subtract, and divide by cycles per second.

These are here for traditional sequential code.

MPI offers something else

**Elapsed parallel time**: returns the number of seconds that have elapsed since somet ime in the past.
- `MPI_Wtime`: `W` stands for World time. returns double precision of some time in the past (which we dont rlly care we just care abt finish - start). kinda same as with clock we just call when the piece of code starts and when it ends.

```C
double MPI_Wtime(void);

double start, finish;

...
start = MPI_Wtime();
/* Code to be timed */

...
finish = MPI_Wtime();
printf("Proc %d > Elapsed time = %e seconds\n"
	my_rank, finish-start);
```

This measures the elapsed tiem for the **calling process**
*still, we have similar problem - we are getting this number for each one of the 5 processes?*
- every process returns a elapsed time. we want to take the **maximum**. this is a **reduction** operation!
- we need to make sure every process reach the `start=MPI_Wtime()` at the same time. how to do this? SYNC PROCESSES

IMPORTANT:
- `MPI_Wtime()` returns wall clock time; so includes idle time
- `clock()` returns CPU time


## Serial vs Parallel Matrix Vector Multiplication Performance

Problem: [[MPI Example Programs#Example 5 Matrix Vector Multiplication|Matrix Vector Multiplication]]

![[Run-times of serial and parallel matrix-vector multiplication.png]]

for smallest problem size, with one [[MPI Communicator|Communicator]] we have 4 seconds. From 1 -> 2 the time almost double! 
> what happened to [[Amdahl's Law]]? its because this code only measures the parallel part (cuz measures piece of code)

but from 2->4 the increase is not as big
From 8->16 we almost don't see any speedup, *unlike the big problem size!*

with big problem size, when we increase `comm_sz` the time drops a lot bigger!

Speed up of ...
![[speedup of serial and parallel matrix-vector multiplication.png]]

Efficiencies of...
![[efficiencies of serial and parallel matrix-vector multiplication.png]]
