## Example 1

[[MPI]] is built on top of C code. There are a couple of changes highlighted later:

```C
#include <stdio.h>
#include <string.h>  /* For strlen */
#include <mpi.h>     /* For MPI functions, etc */

const int MAX_STRING = 100;

int main(void) {
    char greeting[MAX_STRING];
    int comm_sz;  /* Number of processes */
    int my_rank;  /* My process rank */

    MPI_Init(NULL, NULL);
    MPI_Comm_size(MPI_COMM_WORLD, &comm_sz);
    MPI_Comm_rank(MPI_COMM_WORLD, &my_rank);

    if (my_rank != 0) {
        sprintf(greeting, "Greetings from process %d of %d!", my_rank, comm_sz);
        MPI_Send(greeting, strlen(greeting) + 1, MPI_CHAR, 0, 0, MPI_COMM_WORLD);
    } else {
        printf("Greetings from process %d of %d!\n", my_rank, comm_sz);
        for (int q = 1; q < comm_sz; q++) {
            MPI_Recv(greeting, MAX_STRING, MPI_CHAR, q, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
            printf("%s\n", greeting);
        }
    }

    MPI_Finalize();
    return 0;
} /* main */
```

### Line by line breakdown

`#include <mpi.h>`: add MPI stuff

```C
MPI_Init(NULL, NULL);
MPI_Comm_size(MPI_COMM_WORLD, &comm_sz);
MPI_Comm_rank(MPI_COMM_WORLD, &my_rank);
```
The arguments are the arguments of the main function. There are two things:
- `argc`: an int, the number of arguments in the command line
- `argv`: an array of pointers to strings. # elements in this array of pointer = `argc`
	- `argv[0]` = pointer to a string, which is always the name of the program (e.g. `./a.out`, `./mpi_hello)

> [!note] Don't concentrate on syntax so much
> The philosophy of the language (how to get the best performance, etc.) matters much more. we can just google the exact syntax

`MPI_Comm_...`:
- `MPI_Comm_size(MPI_COMM_WORLD, &comm_sz);`: put total number of processes into `comm_sz`
- `MPI_Comm_rank`: put unique rank of the process into `my_rank`

> [!question] Quick Knowledge Check
> Q: suppose the program runs with 6 process (`-n 6`). How many copies of `MAX_STRING` will you have?
> A: 6 copies! When you use `-n 6`, you created 6 processes. Each *has its own virtual address space*. So each process will have its own `my_rank`, `comm_sz`, and so on.

`sprintf`: difference with printf is that printf prints on screen, `springf` prints it on the input string `greeting`

If I am NOT process 0:
- `MPI_Send`: sends a message `greeting`, the number of characters that `greeting` has (+1 for the \null), each one is of type `CHAR` (`MPI_CHAR`), and sending it to process number 0
If I AM process 0:
- I print out the `greeting` message from the other processes.
- `MPI_Recv`: receive `greeting`, the number of characters, the type, etc. And prints it.

`MPI_Finalize()`: turned off MPI run time. Does not mean the process are terminated, its just that they can no longer communicate with each other.

### Execution Example:

```bash
> mpiexec -n 1 ./mpi_hello

Greetings from process 0 of 4!
```

```bash
> mpiexec -n 4 ./mpi_helo

Greetings from process 0 of 4!
Greetings from process 1 of 4!
Greetings from process 2 of 4!
Greetings from process 3 of 4!
```

Note: this *will always be printed in order*. This is because of the loop.

## Example 2: Trapezoidal Rule Program

See [[Trapezoidal Rule (PC)]]
### Parallelizing the Code

Recall [[PCAM]]:
parallelizing the trapezoidal rule:
1. partition problem solution into tasks (as many tasks as possible)
2. identify communication channels between tasks
3. Aggregate tasks into composite tasks.
4. Map composite tasks to cores

Task break down:
- Compute area of trap `0`, `1`, ..., `n-1`
- Add area

[[DAG Model for Multithreading|DAG Model]]:
![[trapezoidal rule dag.png]]

### Parallel Pseudo Code
```
Get a, b, n; (from user, file, cmd line, etc.)
h = (b-a) / n;
local_n = n/comm_sz; // how many trapezoids it will be responsible for
local_a = a + my_rank * local_n * h;
local_b = local_a + local_n * h;
local_integral = Trap(local_a, local_b, local_n, h);
if (my_rank != 0)
	Send local_integral to process 0;
else { // my_rank == 0
	total_integral = local_integral;
	for (proc = 1; proc < comm_sz; proc++) {
		Receive local_integral from proc;
		total_integral += local_integral;
	}
}
if (my_rank == 0)
	print result;
```

Every process will need to know how many trapezoids it will be responsible for. This will be done by `n/comm_sz` (we at first ignore edge cases - assume `n` is divisible by `comm_sz`)

`local_a`, `local_b` tells you the "starting point" and "ending point" on the trapezoid (the $x_i$, $x_{i+1}$). As an example: if there are only two processes, the first process will go from `a` to `(a+b)/2`, and the second process will go from the midpoint to `b`.

### Parallel Code

#### Version 1

> [!Quote]- Code
> **Main Function**
> ```C
> int main(void) {
> 	int my_rank, comm_sz, n=1024, local_n;
> 	double a = 0.0, b = 3.0, h, local_a, local_b;
> 	double local_int, total_int;
> 	int source;
> 
> 	MPI_Init(NULL, NULL);
> 	MPI_Comm_rank(MPI_COMM_WORLD, &my_rank);
> 	MPI_Comm_size(MPI_COMM_WORLD, &comm_sz);
> 
> 	h = (b-a)/n;
> 	local_n = n/comm_sz
> 
> 	local_a = a + my_rank * local_n * h;
> 	local_b = local_a + local_n * h;
> 	local_integral = Trap(local_a, local_b, local_n, h);
> 
> 	if (rank != 0) {
> 		MPI_Send(&local_int, 1, MPI_DOUBLE, 0, 0, MPI_COMM_WORLD);
> 	} else {
> 		total_int = local_int
> 		for (source = 1; source < comm_sz; source++) {
> 			MPI_Recv(&local_int, 1, MPI_DOUBLE, source, 0, MPI_COM_WORLD, MPI_STATUS_IGNORE);
> 			total_int += local_int
> 		}
> 	}
> 
> 	if (my_rank == 0) {
> 		printf("With n = %d trapezoids, out estimate \n", n);
> 		printf("of the integral from %f to %f = %.15e\n", a, b, total_int);
> 	}
> 	MPI_Finalize();
> 	return 0;
> } /* Main */
> ```
> 
> **Trapezoid Function**
> 
> ```C
> double Trap(
>     double left_endpt    /* in */,
>     double right_endpt   /* in */,
>     int    trap_count    /* in */,
>     double base_len      /* in */) {
> 
>     double estimate, x;
>     int i;
> 
>     estimate = (f(left_endpt) + f(right_endpt)) / 2.0;
>     for (i = 1; i <= trap_count - 1; i++) {
>         x = left_endpt + i * base_len;
>         estimate += f(x);
>     }
>     estimate = estimate * base_len;
> 
>     return estimate;
> } /* Trap */
> ```

Problem with the code:
1. `MPI_Recv` [[MPI Point-to-point#`MPI_Recv`|receives]] messages **in order**, which is inefficient. Because addition is communicative, we can receive the local results **out of order**. Can improve by using [[MPI Point-to-point#`MPI_ANY_SOURCE`|MPI_ANY_SOURCE]].
2. Huge [[Load Balancing|Load Imbalance]]: there is huge contention in interconnect (everyone is sending to process 0), AND process 0 is doing most of the work (summing up local traps)

#### Version 2

Use the [["Tree" Trick]]! It **grows in a logarithmic function**

Note that both of the following trees correct (because addition is communicative).
![[tree structure 1.png|500]]
![[tree structure 2.png|500]]

**Problem**: We want to choose the method that is more appropriate for the given underlying system, but we as programmer cannot do that easily: we do not know the underlying system (which core assigns to which node in the tree).

Solution: [[MPI Collective|Reduction]]

## Example 3: Reading and Distributing a Vector

Related concept: [[MPI Collective#`MPI_Scatter`|MPI_Scatter]]
```C
void Read_vector(
    double   local_a[]   /* out */,
    int      local_n     /* in  */,
    int      n           /* in  */,
    char     vec_name[]  /* in  */,
    int      my_rank     /* in  */,
    MPI_Comm comm        /* in  */) {
    
    double* a = NULL;
    int     i;

    if (my_rank == 0) {
        a = malloc(n * sizeof(double));
        printf("Enter the vector %s\n", vec_name);
        for (i = 0; i < n; i++)
            scanf("%lf", &a[i]);
        MPI_Scatter(a, local_n, MPI_DOUBLE,
                    local_a, local_n, MPI_DOUBLE,
                    0, comm);
        free(a);
    } else {
        MPI_Scatter(a, local_n, MPI_DOUBLE,
                    local_a, local_n, MPI_DOUBLE,
                    0, comm);
    }
} /* Read_vector */
```

### Example 4: Printing a Distributed Vector

Related concept: [[MPI Collective#``MPI_Gather``|MPI_Gather]]

```C
void Print_vector(
    double   local_b[]   /* in  */,
    int      local_n     /* in  */,
    int      n           /* in  */,
    char     title[]     /* in  */,
    int      my_rank     /* in  */,
    MPI_Comm comm        /* in  */) {

    double* b = NULL;
    int     i;

    if (my_rank == 0) {
        b = malloc(n * sizeof(double));
        MPI_Gather(local_b, local_n, MPI_DOUBLE,
                   b,       local_n, MPI_DOUBLE,
                   0,       comm);
        printf("%s\n", title);
        for (i = 0; i < n; i++)
            printf("%f ", b[i]);
        printf("\n");
        free(b);
    } else {
        MPI_Gather(local_b, local_n, MPI_DOUBLE,
                   b,       local_n, MPI_DOUBLE,
                   0,       comm);
    }
} /* Print_vector */
```
Very similar to `MPI_Reduce` - want pieces to come together and form a big vector

## Example 5: Matrix Vector Multiplication

Related concept: [[MPI Collective#`MPI_Allgather`|MPI_Allgather]], [[Matrix Multiplication (PC)]]

Multiplying a matrix by a vector, basically we want to distribute a few rows of the matrix to each matrix. But, we also need to make sure that every process gets all of `x`.
```C
void Mat_vect_mult(
    double   local_A[]   /* in  */,
    double   local_x[]   /* in  */,
    double   local_y[]   /* out */,
    int      local_m     /* in  */,
    int      n           /* in  */,
    int      local_n     /* in  */,
    MPI_Comm comm        /* in  */) {

    double *x;
    int local_i, j;
    int local_ok = 1;

    x = malloc(n * sizeof(double));
    /* Gather the full vector x on all processes (assuming it was scattered) */
    MPI_Allgather(local_x, local_n, MPI_DOUBLE,
                  x,       local_n, MPI_DOUBLE,
                  comm);

    for (local_i = 0; local_i < local_m; local_i++) {
        local_y[local_i] = 0.0;
        for (j = 0; j < n; j++)
            local_y[local_i] += local_A[local_i * n + j] * x[j];
    }

    free(x);
} /* Mat_vect_mult */
```
The code above assumes `x[]` is distributed among the different processes

[[MPI Timing#Serial vs Parallel Matrix Vector Multiplication Performance|Examining the program's performance]]

## Example 6: `Build_mpi_type`

```C
void Build_mpi_type(
    double*        a_p           /* in */,
    double*        b_p           /* in */,
    int*           n_p           /* in */,
    MPI_Datatype*  input_mpi_t_p /* out */) {

    int      array_of_blocklengths[3]   = {1, 1, 1};
    MPI_Datatype array_of_types[3]      = {MPI_DOUBLE, MPI_DOUBLE, MPI_INT};
    MPI_Aint  a_addr, b_addr, n_addr;
    MPI_Aint  array_of_displacements[3] = {0};

// we know the displacement of a_p to a_p = 0; now we need to calculate the rest

    MPI_Get_address(a_p, &a_addr);
    MPI_Get_address(b_p, &b_addr);
    MPI_Get_address(n_p, &n_addr);
    array_of_displacements[1] = b_addr - a_addr;
    array_of_displacements[2] = n_addr - a_addr;

    MPI_Type_create_struct(3,
                           array_of_blocklengths,
                           array_of_displacements,
                           array_of_types,
                           input_mpi_t_p);
    MPI_Type_commit(input_mpi_t_p);
} /* Build_mpi_type */

// we now can use this type. for example, the `Get_input` example we saw repeatedly earlier

void Get_input(
    int     my_rank,
    int     comm_sz,
    double* a_p,
    double* b_p,
    int*    n_p) {

    MPI_Datatype input_mpi_t;

    Build_mpi_type(a_p, b_p, n_p, &input_mpi_t);

    if (my_rank == 0) {
        printf("Enter a, b, and n\n");
        scanf("%lf %lf %d", a_p, b_p, n_p);
    }
    MPI_Bcast(a_p, 1, input_mpi_t, 0, MPI_COMM_WORLD);

    MPI_Type_free(&input_mpi_t);
} /* Get_input */
```

**The receiving end can use the received complex data item as if it is a structure**

Note: [[MPI Collective#Broadcast, or `MPI_BCast`|MPI_Bcast]] just sends address of `a`. This is enough because we have built this type, and we have told the MPI [[Runtime]] the displacement of all other variables to `a`

The other non-zero processes (receiving end) will receive the complex data as if it is a complex structure

## Example 7: Parallelizing [[Sorting & Searching|Sorting Algorithms]]

For sequential execution, you are picking the one with the best Big O notation. That is no longer the case for parallel ones - there are much more important stuff ([[Communication (Constraint)|communication]], [[Memory Access]])

lets try to parallelize a usually pretty bad sorting algorithm: **Bubble sort**

### Sorting
- `n` keys and `p`= `comm_sz` processes
- `n/p` keys assigned to each process
	- Divide keys across processes using [[MPI Collective#`MPI_Scatter`|MPI_Scatter]]
- no restrictions on which keys are assigned to which processes
- when the algorithm terminates,
	- the key assigned to each process should be sorted in (say) increasing order
	- if `0 ≤ q < r < p`, then each key assigned to process `q` should be less than or equal to every key assigned to process `r` (i think)

serial bubble sort:
```C
void Bubble_sort(
    int a[]   /* in/out */,
    int n     /* in */) {
    int list_length, i, temp;

    for (list_length = n; list_length >= 2; list_length--)
        for (i = 0; i < list_length - 1; i++)
            if (a[i] > a[i+1]) {
                temp    = a[i];
                a[i]    = a[i+1];
                a[i+1]  = temp;
            }
} /* Bubble_sort */
```

Bubble sort: starts from beginning element 0, compares element 0 and 1 and swaps them only if element 0 is bigger than element 1.

on average it will take `n` passes, each pass goes through `n` elements or something so O(n^2)

the problem with bubble sort (aside with O(n^2))
- we cannot execute the compare-swap out of order!
> this is a problem because if comparison must be done in order we do not have a chance to parallelize it
> 1 and 2, then 2 and 3, then 3 and 4, ...
- can we decouple that? (make it more parallelizable)

what if we compare the following swaps in parallel?
0th round: 0 and 1,  2 and 3, 4 and 5,  6 and 7 ...
1st round: 1 and 2, 3 and 4, 5 and 6, 7 and 8...
2nd round: 0 and 1, 2 and 3, 4 and 5, 6 and 7...
*we alternate from starting odd or even*

### Odd-even transposition sort

A sequence of phases.

Even phases, compare swaps:
`(a[0], a[1]), (a[2], a[3]), ...`

odd phases, compare swaps:
...

#### Example

Start: 5, 9, 4, 3
Even phase: compare-swap (5, 9) and (4, 3) and get the list 5, 9, 3, 4
Odd phase: compare-swap (9, 3), and get the list 5, 3, 9, 4
Even phase: compare-swap (5, 3) and (9, 4), and get the list 3, 5, 4, 9
Odd phase: compare-swap (5, 4) and get the list 3, 4, 5, 9
done

Still O(n^2) but more parallelizable.

> [!info] Parallelizing Quick Sort
> [[Quick Sort]] is parallelizable but is not easily parallelizable. the first parallized code for quick sort is a **published research paper** so imagine how hard that is

#### Serial Odd-even transposition sort

```C
void Odd_even_sort(
    int a[]   /* in/out */,
    int n     /* in */) {
    int phase, i, temp;

    for (phase = 0; phase < n; phase++) {
        if (phase % 2 == 0) {  
			/* Even phase */
            for (i = 2; i < n; i += 2) {
                if (a[i-1] > a[i]) {
                    temp    = a[i];
                    a[i]    = a[i-1];
                    a[i-1]  = temp;
                }
			}
        } else {               
			/* Odd phase */
            for (i = 1; i < n-1; i += 2) {
                if (a[i] > a[i+1]) {
                    temp    = a[i];
                    a[i]    = a[i+1];
                    a[i+1]  = temp;
                }
			}
        }
    }
} /* Odd_even_sort */
```


There is a lot of [[Communication (Constraint)|communication]] here:
Communications among tasks in odd-even sort
![[communications among tasks in odd-even sort.png]]

How do we reduce the communication?
A: recall from earlier, **every process will be assigned n/p keys**

### Parallel Odd-even transposition sort

![[odd-even transposition sort (parallel) idea.png]]

1. Every process will sort its own elements locally.  Inside each process, you can use any sequential sorting algorithm
2. After local sort: every process still have its own list
3. Phase 0: talk at *processes* level rather than *numbers* level; run "comparison swap" between processes 0 and 1, processes 2 and 3...
	1. process 1 send its list to process 0; process 0 send its list ot process 1. Now, process 0 and 1 will *both* have 8 elements
	2. process 0 deletes the highest four elements; process 1 deletes the lowest 4 elements
3. Phrase 1: odd phrase, so do the above but for processes 1 and 2, 3 and 4, etc.


**Pseudo Code**

```
Sort local keys;
for (phase = 0; phase < comm_sz; phase++) {
    partner = Compute_partner(phase, my_rank);
    if (I'm not idle) {
       Send my keys to partner;
       Receive keys from partner;
       if (my_rank < partner)
           Keep smaller keys;
       else
           Keep larger keys;
    }
}
```

> [!Question] How do i "Keep smaller keys" or "Keep larger keys"?
> A: go to below: [[MPI Example Programs#Merge]]

**Code for computing partner:**

> Q: if i am process 1, who is my partner at phase 0: 
> A: process 0
> Q: if i am process 1, who is my partner at phase 1:
> A: process 2

```C
ComputePartner(...) {
	/* Sort local keys */
	for (phase = 0; phase < comm_sz; phase++) {
	    partner = Compute_partner(phase, my_rank);
	    if (I’m not idle) {
	        Send my keys to partner;
	        Receive keys from partner;
	        if (my_rank < partner)
	            Keep smaller keys;
	        else
	            Keep larger keys;
	    }
	}
	
	/* Compute partner for odd-even phases */
	if (phase % 2 == 0) {           /* Even phase */
	    if (my_rank % 2 != 0)       /* Odd rank */
	        partner = my_rank - 1;
	    else                        /* Even rank */
	        partner = my_rank + 1;
	} else {                        /* Odd phase */
	    if (my_rank % 2 != 0)       /* Odd rank */
	        partner = my_rank + 1;
	    else                        /* Even rank */
	        partner = my_rank - 1;
	}
	if (partner == -1 || partner == comm_sz)
	    partner = MPI_PROC_NULL;
	}
}
```

`MPI_PROC_NULL`: Constant defined by MPI. when used as source/destination in point-to-point comm, no comm will take place. just makes code easier.
- i.e. when in phase 1, process 0's partner is technically process -1, which doesn't exist. so, process 0 doesn't do any communication

#### Merge

From our lecture, we learned that [[Safety in MPI Programs#`MPI_Sendrecv_replace`|MPI_Sendrecv_replace]] *does not work*, because while we start with one buffer and end with one buffer, i need to work on two buffers in between.

Instead, we can implement as follow:
```C
void Merge_low(
    int my_keys[]    /* in/out */,
    int recv_keys[]  /* in */,
    int temp_keys[]  /* scratch */,
    int local_n      /* = n/p, in */) {
    int m_i, r_i, t_i;

    m_i = r_i = t_i = 0;
    while (t_i < local_n) {
        if (my_keys[m_i] <= recv_keys[r_i]) {
            temp_keys[t_i] = my_keys[m_i];
            t_i++; m_i++;
        } else {
            temp_keys[t_i] = recv_keys[r_i];
            t_i++; r_i++;
        }
    }

    for (m_i = 0; m_i < local_n; m_i++)
        my_keys[m_i] = temp_keys[m_i];
} /* Merge_low */
```
**At the end, `my_keys[]` will have the smallest `n/p` keys of local and received keys**

- I have a list that contains my sorted keys: `my_keys`
- Another list of received keys from partner: `recv_keys`
- Both lists are sorted

Then i have an empty list `temp_keys`, which is the list that will contain the lowest four elements at the end of the code

- suppose i have a pointer `x` that points to the beginning of `my_keys`, 
- suppose i have  another `y` that points to the end of `recv_keys`
- finally, a `z` that points to beginning of `temp_keys`.

You look at `x` and `y` and see which one is smaller, and copy it to `temp_keys`. Whichever pointer that gets copied to will get advanced. Rinse and repeat.


### Run-times of Parallel Odd-Even Sort

![[odd-even sort runtimes.png]]

From 1 process to 2, we always get 2x speed up
from 2 to 4, we also almost always get 2x speed up
From 4 to 8, we also almost always get 2x speed up
...

let's see bigger problem sizes
![[odd-even sort run time larger case.png]]

Each row is divided by the first row to get the speed up:
![[odd even run time speedup and efficiencies.png]]

bigger `comm_sz` gets bigger speedup (dividing by comm_sz=1) (obviously)

but efficiencies gets lower, though notice that when there is a huge problem size the efficiency increases (larger problem size -> can justify using much more processors)

**Question:** Suppose we have _p_ processes and need to compute a vector sum. Ignoring I/O time, can we achieve more than _p_ speedup over the sequential version?

**Answer:** With a large problem size, the sequential code runs on a single CPU with one small L1 cache, which can’t hold the entire vector. Using four processors—each on its own core with its own L1 cache—lets each core work on a subset of the vector, greatly reducing cache misses. **As a result, you not only gain parallelism but also fewer cache misses, which can sometimes yield speedups exceeding p.**

*Hardware effects like this aren’t obvious from the code alone.*
