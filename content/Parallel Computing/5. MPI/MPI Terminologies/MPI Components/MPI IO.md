Input and Output with [[MPI]]

## Output

In all MPI implementations, all processes in `MPI_COMM_WORLD` have access to stdout (default is the screen) and stderr (default is also the screen).
*But*, most of them have **no scheduling** of access to output devices.

```C
#include <stdio.h>
#include <mpi.h>

int main(void) {
    int my_rank, comm_sz;

    MPI_Init(NULL, NULL);
    MPI_Comm_size(MPI_COMM_WORLD, &comm_sz);
    MPI_Comm_rank(MPI_COMM_WORLD, &my_rank);

    printf("Proc %d of %d > Does anyone have a toothpick?\n", my_rank, comm_sz);

    MPI_Finalize();
    return 0;
} /* main */
```

Because there is no scheduling of access to output, there is no rule about which process reaches the screen first ([[Nondeterminism]]). 

As a result, processes will compete for stdout, and the printf that reaches the screen will be out of order:

Example:
```
Proc 0 of 6...
Proc 1 of 6...
Proc 2 of 6...
Proc 4 of 6...
Proc 3 of 6...
Proc 5 of 6...
```

> [!important] "Getting There First" and Connection to [[Introducing... Operating Systems!|OS]]
> When you want to print to a screen or a device, what happens is:
> 1. Ask OS to print line on the screen
> 2. OS take that line, and **buffer it** in the OS
> 3. OS submits to IO device
> If multiple processes wants to print onto screen, these process may reach the OS at different time, and OS will buffer each one. When we say **"getting there first"**, it really means **"getting to and buffered by the OS first**. 
>
> The final scheduling (of which buffer gets sent to the output) is done by the OS, and (i think) could be independent of the buffering order

## Input

Most MPI Implementation **only allows process 0** in `MPI_COMM_WORLD` to access **stdin**

> [!note]
> Makes sense if you are the designer of MPI. In order to make thigs under control, only process 0 can get things from the keyboard (imagine if every key can get sent to every process, itd be crazy)

If there is some input needed from stdin: process 0 must read the data and send to the other processes

**Exception: All processes get the input from the command line**
- that is, the arguments of `main()` ([[MPI Basic|argc, argv]]) reach all processes without the need for communications

```C
void Get_input(
    int        my_rank    /* in  */,
    int        comm_sz    /* in  */,
    double*    a_p       /* out */,
    double*    b_p       /* out */,
    int*       n_p       /* out */) {
    
    int dest;

    if (my_rank == 0) {
        printf("Enter a, b, and n\n");
        scanf("%lf %lf %d", a_p, b_p, n_p);
        for (dest = 1; dest < comm_sz; dest++) {
            MPI_Send(a_p, 1, MPI_DOUBLE, dest, 0, MPI_COMM_WORLD);
            MPI_Send(b_p, 1, MPI_DOUBLE, dest, 0, MPI_COMM_WORLD);
            MPI_Send(n_p, 1, MPI_INT, dest, 0, MPI_COMM_WORLD);
        }
    } else { /* my_rank != 0 */
        MPI_Recv(a_p, 1, MPI_DOUBLE, 0, 0, MPI_COMM_WORLD, 
                 MPI_STATUS_IGNORE);
        MPI_Recv(b_p, 1, MPI_DOUBLE, 0, 0, MPI_COMM_WORLD, 
                 MPI_STATUS_IGNORE);
        MPI_Recv(n_p, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, 
                 MPI_STATUS_IGNORE);
    }
} /* Get_input */
```

Process 0 [[MPI Point-to-point#`MPI_Send`|sends]] three messages (`a_p`, `b_p`, `n_p`) to the rest of the processes in the communicator, and these processes receive three values

> [!Warning] `a_p` and `b_p` could be received out of order!
> Because `a_p` and `b_p` are the same type, if `b_p` arrives first we cannot differentiate them - note that they also have the same tag.
> **Solution**: use different [[MPI Point-to-point|tags]].


