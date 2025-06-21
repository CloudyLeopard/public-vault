
Breakdown on different [[MPI|MPI’s]] API components.

> [!important] Return Type
> All the MPI APIs return an `int`, which tells you if it succeeded (positive number) or failed (negative number).

| Component              | Function/Concept                         |
| ---------------------- | ---------------------------------------- |
| [[MPI Basic]]          | `MPI_Init`                               |
|                        | `MPI_Finalize`                           |
| [[MPI Communicator]]   | `MPI_Comm_size`                          |
|                        | `MPI_Comm_rank`                          |
| [[MPI Point-to-point]] | `MPI_Send`                               |
|                        | `MPI_Recv`                               |
| [[MPI IO]]             | Input (stdin and `main` arguments)       |
|                        | Output                                   |
| [[MPI Collective]]     | `MPI_Reduce`                             |
|                        | `MPI_Reduce`: `MPI_MAXLOC`, `MPI_MINLOC` |
|                        | `MPI_Allreduce`                          |
|                        | `MPI_BCast`                              |
|                        | `MPI_Scatter`                            |
|                        | `MPI_Gather`                             |
|                        | `MPI_Allgather`                          |

Point-to-Point vs Collective:

![[mpi collective vs point-to-point.png]]

