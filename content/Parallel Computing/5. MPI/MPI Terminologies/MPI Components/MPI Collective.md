All the processes in the [[MPI Communicator|Communicator]] must call the same collective function.

The arguments passed by each process to an MPI collective communication must be "compatible"
- For example, if one process passes in 0 as the `dest_process` and other passes in 1, then the outcome of a call to `MPI_Reduce` is erroneous
- The only exception is the second input (`output_data_p`), where only the `dest_process` pointer will get accessed. Though, the other processes still need to pass in an argument (like `NULL`)

**All collective function calls are blocking** (if one process doesn't make the collective function call, enter deadlock).

The "opposite" of Collective Function is [[MPI Point-to-point|Point-to-point]].

Collective communications do *not* use tags: they are matched solely based on the **order they are called**. Arriving messages will never go out of order (even if they all go to the same `dest_process`) because collective calls are **blocking**

> [!example] Collective Communication Matched by Called Order
> ![[collective communication order example.png]]
> Q: What will be the value of `b` after step 1? (in process 2)
> A: We *do not know*. The destination is process 0. `b` in process 2 will never be touched, so it will keep whatever value it had.
> 
> Q: What is the value of `b` after step 1 at process 0?
> A: `a+c+a = 1+2+1=4`
> 
> Same for after step 2, only `d` in process 0 will be touched.
> After step 2, `d` in process 0 will be 5

> [!warning] Do not pass same pointer for input and output
> Example `MPI_Reduce(&x, &x, ...)`: this is illegal in MPI and the result is non-predictable! But the compiler will not complain. (Do not put same pointer for input and output)
## `MPI_Reduce`

`MPI_Reduce`: Reducing a set of numbers into a smaller set of numbers via a function
- example: reducing the group \[1, 2, 3, 4, 5] with the sum function -> 15

MPI provides a handy function that handles almost all of the common reductions that a programmer needs to do in a parallel application.
- Minimum, maximum, average, addition...

```C
int MPI_Reduce(
	void* input_data_p    // in
	void* output_data_p   // out
	int count             // in
	MPI_Datatype datatype // in
	MPI_Op operator       // in
	int dest_process      // in
	MPI_Comm comm         // in
)
```
`MPI_Op`: what is the reduction operation
`dest_process`: the rank of the destination process
`MPI_Comm comm`: name of the communicator that contains all the processes

> [!important] `output_data_p` won't be accessed by non `dest` processes
> The pointer `output_data_p` may be available in *all the processes* since every process is running the same code. But we want the result to go to the `output_data_p` in `dest_process`.
> 
> Only `dest_process`'s `output_data_p`  will be affected.

> [!note] If `output_data_p` type ≠ `datatype`, [[Segmentation Fault]]

This function also works on arrays: it can "reduce" the corresponding elements in arrays (i.e. `x[0]=a[0]+b[0]+c[0]`, `x[1]=a[1]+b[1]+c[1]`, ...)


![[MPI Reduction.png|400]]

> [!important] Collective Call
> `MPI_Reduce` is a **collective call**. For it to work, it has to be called by **all the processes involved** (in the [[MPI Communicator|communicator]]). Collective calls are blocking.

### Examples

Sum up all the `local_int` variables across processes, and store in process 0
```C
MPI_Reduce(&local_int, &total_int, 1, MPI_DOUBLE, MPI_SUM, 0, MPI_COMM_WORLD)
```

> [!important] `total_int` is available, but not accessed, in non-dest processes
> See above

Sum up all the `local_x` arrays element wise across processes, and store in process 0
```C
double local_x[N], sum[N];
...
MPI_Reduce(local_x, sum, N, MPI_DOUBLE, MPI_SUM, 0, MPI_COMM_WORLD)
```

### Reduction Operators
| Operation Value  | Meaning                                  |
|-----------------|------------------------------------------|
| MPI_MAX        | Maximum                                  |
| MPI_MIN        | Minimum                                  |
| MPI_SUM        | Sum                                      |
| MPI_PROD       | Product                                  |
| MPI_LAND       | Logical and                             |
| MPI_BAND       | Bitwise and                             |
| MPI_LOR        | Logical or                              |
| MPI_BOR        | Bitwise or                              |
| MPI_LXOR       | Logical exclusive or                   |
| MPI_BXOR       | Bitwise exclusive or                   |
| MPI_MAXLOC     | Maximum and location of maximum        |
| MPI_MINLOC     | Minimum and location of minimum        |
Location = rank of the process that owns it

> [!Example]- Logical vs Bitwise And
> `x=1, y=2`
> - Logical and: `x&&y = True` (this is because only 0 is considered most in most langauge)
> - Bitwise and: `x^y = 01 ^ 10 = 0`

### `MPI_MAXLOC` and `MPI_MINLOC`

These are `MPI_Op`.

`MPI_MAXLOC`: returns the maximum and the [[Rank]] of the process that has the maximum
`MPI_MINLOC`: returns the minimum and the rank of the process that has the minimum

> [!note] Connection to the Usual `MPI_Reduce`
> Intuitively, recall process passes in a variable when you call `MPI_Reduce`. `MAXLOC` and `MINLOC` basically looks at which rank's variable has the highest/lowest value

In order to use `MPI_MAXLOC` and `MPI_MINLOC`, need to provide [[MPI_Datatype]] argument that represents a pair. This is because these two functions returns two numbers
- Note: the type of the second value is always an `int`, because a [[Rank]] is always an int.

**Example**:

```C
// each process has an array of 30 int: num[30]
int num[30];
int result[30], index[30];
struct {
	int val;
	int rank;
} in[30], out[30];

for (i = 0; i < 30; i++) {
	in[i].val = num[i];
	in[i].rank = myrank;
}

MPI_Reduce (in, out, 30, MPI_2INT, MPI_MAXLOC, 0, MPI_COMM_WORLD);

if (myrank == 0) {
	for (i = 0; i < 30; ++i) {
		result[i] = out[i].val;
		index[i] = out[i].rank;
	}
}
```

`in` and `out` are arrays with `n=30` **and type “struct”** defined in the program.

In this program, every process starts with an array `num` with 30 numbers. Every process populates their `in` with these numbers and their rank.

`MPI_Reduce` with operator `MPI_MAXLOC` finds the maximum value of each position in `in`, and puts that value and its rank into `out`
- e.g. `out[0]` will contain the max value of all processes’ `in[0]` and its origin rank, and so on
- Only process 0’s `out` is modified

> [!Question] does this reduce find the rank using in’s struct or the actual process rank
> 

## `MPI_Allreduce`

Useful in a situation in which **all of the processes need the result of a global sum** to complete some larger computation (because `MPI_Reduce` only passes the global sum to `dest_process`)

> [!warning] Avoid using `MPI_Allreduce`
> Unless all the processes need the final value, don't use this. Only use this when it is absolutely needed!

```C
int MPI_Allreduce(
	void* input_data_p
	void* output_data_p
	int count
	MPI_Datatype datatype
	MPI_Op operator
	MPI_Comm com,
)
```

Notice that there is **no destination argument**

## Broadcast, or `MPI_BCast`

Simply put, broadcasts a message from one process to all other processes

```C
int MPI_Bcast(
	void* data_p          // in or out
	int count             // in
	MPI_Datatype datatype // in
	int source_proc       // in
	MPI_Comm comm         // in
)
```

Suppose "I" am the sender process. `data_p` is the input from me, and sent to everyone else as output and stored in their `data_p`.

Being a collective call, **all** processes in the communicator must call `MPI_BCast`

###  Tree Structured Broadcast

`MPI_BCast` sends a [["Tree" Trick|tree-structured]] broadcast, done by MPI [[Runtime]] automatically.

![[mpi_broadcast tree.png|500]]

This is done because recall that the [[MPI IO#Input|the stdin default is keyboard, and accessed only by process 0]]. Whereas [[MPI IO#Output|stdout and stderr is accessed by everyone else]].

`MPI_BCast` is **shorter** and **manage contention**:
So, when process 0 runs `scanf` and gets info from the user, we can just use one `MPI_BCast` instead of however many `MPI_Send` and `MPI_Recv` for each process. It also ensures the data are not sent out of order, which `MPI_Send` and `MPI_Recv` may do if not managed properly.

Example `Get_input` code:
```C
void Get_input(
    int my_rank    /* in  */,
    int comm_sz    /* in  */,
    double* a_p    /* out */,
    double* b_p    /* out */,
    int* n_p       /* out */) {

    if (my_rank == 0) {
        printf("Enter a, b, and n\n");
        scanf("%lf %lf %d", a_p, b_p, n_p);
    }

    MPI_Bcast(a_p, 1, MPI_DOUBLE, 0, MPI_COMM_WORLD);
    MPI_Bcast(b_p, 1, MPI_DOUBLE, 0, MPI_COMM_WORLD);
    MPI_Bcast(n_p, 1, MPI_INT, 0, MPI_COMM_WORLD);
} /* Get_input */
```
## `MPI_Scatter`

Situation: suppose we want to add two vectors, and want to parallelize it by distributing different parts of the two vectors to different processes:

![[process scatter.png]]

Serial Program
```C
void VectorSum(...) {
	for (int i = i; i < n; i++) {
		z[i] = x[i] + y[i]
	}
}
```

Parallel Version
```C
void Parallel_vector_sum(
	double local_x[], // in
	double local_y[], // in
	double local_z[], // out
	int local_n, // in
) {
	int local_i;

	for (local_i = 0; local_i < local_n; local_i++)
		local_z[local_i] = local_x[local_i] + local_y[local_i];
}
```

How do we distribute parts of `x[]` and `y[]` tp different process, and such that every process (including process 0) will take on the same amount of parts, *and* that each process gets the corresponding `x` and `y` (same indices)

Solution: **Scatter**
```C
int MPI_Scatter(
	void* send_buf_p, // in
	int send_count, // in
	MPI_Datatype send_type, // in
	void* recv_buf_p, // out
	int recv_count, // in
	MPI_Datatype recv_type, // in
	int src_proc, // in
	MPI_Comm comm, // in
)
```
`MPI_Scatter` sends the needed component (from a source process, like process 0) to each other process, based on the rank.

**Important**
- source process requires *all* arguments
- other processes only need `recv_buf_p`, `recv_count`, `recv_type`, `src_proc`, `comm` (can put whatever they want in the other args)

Other notes:
- `send_buf_p`: Must have at least communicator size * `send_count` elements
- `send_count`: the number of data items sent to each process.
- `recv_buf_p`: must have at least `send_count` elements
- `MPI_Scatter`: uses block distribution
- `recv_count`: must be the same as `send_count`. They added two separate arguments for future upgrade, but in our case we will always make them the same.
- Similarily, `send_type` == `recv_type`
- `src_proc`: who is the source process, or the one that is sending

![[MPI Example Programs#Example 3 Reading and Distributing a Vector]]



Notes:
- we are *not* sending `a` to everybody, but instead dividing it into pieces
- send `local_n` elements to each process; each process will receive `local_n` elements, into their array `local_a`, with type `MPI_Double`
- All of these elements are sent by process 0
- process 0 will also receive its share of the data
- `MPI_Scatter` is *inside* if-else statements, even if the two are the same, because otherwise we will be freeing `a` before we scatter. The other (non 0) processes will execute `free(a)` without allocating `a`.

Next problem: after scatting them, we want to **gather** the different pieces! see the next collective call.

## `MPI_Gather`
Collects all of the components of the vector into the destination process, ordered **in rank order**.
```C
int MPI_Gather(
	void* send_buf_p, // in
	int send_count, // in
	MPI_Datatype send_type, // in
	void* recv_buf_p, // out
	int recv_count, // in
	MPI_Datatype recv_type, // in
	int dest_proc, // in
	MPI_Comm comm, // in
)
```

Similarly, all arguments are important for the destionation process
For all other processes, only `send_buf_p`, `send_count`, `send_type`, `dest_proc` and `comm` are important.

![[MPI Example Programs#Example 4 Printing a Distributed Vector]]

## `MPI_Allgather`

Concatenates the contents of each process' `send_buf_p` and stores this in each process' `recv_buf_p`

As usual, `recv_count` is the amount of data being received from **each** process

```C
int MPI_Allgather(
	void* send_buf_p, // in
	int send_count, // in
	MPI_Datatype send_type, // in
	void* recv_buf_p, // out
	int recv_count, // in
	MPI_Datatype recv_type, // in
	MPI_Comm comm, // in
)
```
Example: [[MPI Example Programs#Example 5 Matrix Vector Multiplication]] 
- We need to send `x` to all processes