## Compilation

A: The code for MPI is embedded inside C, so a very simple C code

```bash
mpicc -Wall -std=c99 -o mpi_hellp mpi_hello.c
```

![[mpi compilation diagram.png]]
- `-Wall` = turn on all warnings. sometime its good to shows bugs.
- `-std=c99` = standard c standard  (like C code we have written)
- `-o`: without this, output is default executable (`a.out`). this makes it more "mpi" like.
- `mpi_hello`: what the compiled stuff is named

> [!important] MPI is not a language by itself (embedded in C)
> It's similar to [[OpenMP]] and [[CUDA]]. When they invented these things, they wanted people to learn them quickly. Instead of building brand new languages, they built them on top of high performance languages (like C).
>
>It's like machine learning - ML is not built on python. its just a script that calls on code written on C++ or others

Other languages are more user friendly but slower. Usually, language that is more user friendly = more machine unfriendly.

## Execution

```bash
mpiexec -n <number of processes> <executable>
```

Example:
- `mpiexec -n 1 ./mpi_hello`: run with 1 process
- `mpiexec -n 4 ./mpi_hello`: run with 4 processes

The portability is not as versatile as when you are writing code for multicore stuff. We know the shape of the hardware that we will be writing code for (cuz there aren't that many super computers in the world)

Note: you can use `mpirun` instead of `mpiexec` and `-np` instead of `-n`
