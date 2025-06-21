[[OpenMP]], [[MPI]]

### Why Hybrid?

Hybrid MPI/OpenMP paradigm is the **software trend** for clusters of SMP architectures (medium strands machine, super computers (although GPUS are usually also used here)...

Elegant in concept and architecture: using **MPI across nodes** and **OpenMP** within nodes. Good usage of [[Shared Memory System]] resource (memory, latency, and bandwidth)

Avoids the extra communication overhead with MPI within node

OpenMP adds **find granularity** and allows **increased** and/or **dynamic load balancing**

Some problems have two-level parallelism naturally
> suppose you are trynna model how stars are interacting with each other, and also how inside a star is working with. every process for a star or a usbet of stars, openmp for whats happening inside each star

**could have better scalability** than both pure MPI and pure OpenMP

### Hybrid Parallelization Strategies

**From sequential code**: decompose with MPI first, then add OpenMP

Simplest and least error-prone way is:
- use MPI outside parallel region
- allow only master thread to communication between MPI tasks

so, use MPI outside of parallel region, and allow only master thread to communicate between MPI tasks

![[hybrid parallelization strategies.png]]

here, we have a process on the top, another process on the bottom. each process is multi-threaded. only make master threads communicate with each other (rank 0 and rank 1)

![[hybrid mpi and openmp example.png]]

How do we compile this?
```bash
mpicc -fopenmp mixhello.c
mpiexec -n x ./a.out
```

`mpicc`: for mpi
`-fopenmp`: for openmp
execute with `mpiexec` or `mpirun`

## Conclusion

Always keep in mid the 5 reasons of poor performance

If:
- you have a machine with several nodes
- the problem at hand has two levels of parallelism
Then:
- consider hybrid OpenMP + MPI
