
[[Synchronization]] in MPI, by using `MPI_Barrier`

`MPI_Barrier`: ensures that no process wil return from calling it until every process in the communicator has started calling it.

```C
int MPI_Barrier(MPI_Comm comm // in)
```

Blocks all [[Process (PL)|Process]] until all processes has started calling it

## Example

We can use this to [[MPI Timing|analyze performance of an MPI program]]

```C
double local_start, local_finish, local_elapsed, elapsed;
...
MPI_Barrier(comm);
local_start = MPI_Wtime();
/* Code to be timed */
...
local_finish = MPI_Wtime();
local_elapsed = local_finish - local_start;
MPI_Reduce(&local_elapsed, &elapsed, 1, MPI_DOUBLE,
           MPI_MAX, 0, comm);

if (my_rank == 0)
    printf("Elapsed time = %e seconds\n", elapsed);
```

- calls `MPI_Barrier` to sync them
- calls `MPI_Wtime`
- calculates `local_elapsed`
- does `MPI_Reduce` to get the maximum
