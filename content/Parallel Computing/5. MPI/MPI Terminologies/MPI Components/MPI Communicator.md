---
aliases:
  - Communicator
---
In its simplest form, a communicator in [[MPI]] is a **collection of processes** that can send (and receive) messages to each other. Every communicator must **have a name**.

> [!info] Definition
> A **communicator** can be thought of as a handle to a group of an ordered set of processes
>
> Any processes will start from rank 0 to number of processes in that communicator.

[[MPI Basic|Calling]] `MPI_Init` defines a (one big) communicator that *consists of all the processes* created when the program started. This communicator is called **`MPI_COMM_WORLD`**.

> [!Example]
> Suppose run a program with 10 processes, the communicator created by `MPI_Init` will contain all 10 processes under the name `MPI_COMM_WORLD`

Additionally, programmers can create communicators from select processes.

> [!Example] Programmer Can Create Communicators
> Suppose with 10 process, you want the first 5 processes to be a group, and the last 5 to be another. You can create 2 communicators.

## Getting Communicator Information

Given this, we have two important APIs related to the communicator
### `MPI_Comm_size`

```C
int MPI_Comm_size(
	MPI_Comm comm // input, communicator name
	int* comm_sz_p // output generated will be put here
)
```

It gets the number of processes in that communicator, and copies it to `comm_sz_p`

Example:
```C
MPI_Comm_size(MPI_COMM_WORLD, &comm_sz)
```

> [!note]
> This function seems redundant at first: when you [[MPI#Execution|execute]] a program, you specify how many processes to use (`-n 10`). Why do we need another API to tell us the number of processes?
> The reason is, the programmer is not the user. You may not know how many processes there will be.

### `MPI_Comm_rank`

```C
int MPI_Comm_rank(
	MPI_Comm comm // in, communicator name
	int* my_rank_p // out
)
```

Gets the [[Rank]] of the process making the call, and puts it to `my_rank_p`

Example:
```C
MPI_Comm_rank(MPI_COMM_WORLD, &my_rank)
```

## Creating Communicators

Since we can create different communicators, a single process can belong to multiple communicators. That process will have a unique rank in each communicator, and **these ranks can be different**. 
- For example, the same process might have rank 7 in `MPI_COMM_WORLD` but rank 1 in another communicator. 
- **So we have to be very careful—one process can have different ranks in different communicators.**

For many applications maintaining different groups is appropriate
- maybe one group deal with ai other group deal with sound other group deal with visual etc.
- or in science, one deal with stars, another deal with movement, another deal with energy, etc.
### `MPI_Comm_split`

Before you create, you have to give the communicator a name. You can give it any name -follows the rules of variable names

```C
int MPI_Comm_split(
	MPI_Comm comm, // called by all processes in comm
	int color, // must be non-negative
	int key, // rank of the process in newcomm
	MPI_Comm * newcomm
)
```

Partitions the group associated with `comm` into **disjoint subgroups**

Processes with the **same color** will be in the same group
- **color** means all the processes who called `MPI_Comm_split` with the same color will be in the same communicator.
- if two processes call with color 2, three processes call with color 3, we have 2 communicators (excluding the big one)

Within each subgroup, the processes are **ranked in the order defined by the value of the "key**
- with ties broken according to their rank in the old group
- if processes start from a non 0 rank, it will still go down to 0 (whichever rank puts a smaller number gets a smaller actual rank)

> [!Example]
> **Q:** what if a process puts key (rank) 7, and the other puts 8? 
> **A:** the one that enters a smaller rank will be rank 0, and the bigger one will be rank 1

- If the two processes call the same rank, MPI will choose based on the rank in the original communicator.

**the original communicator does not go away!**

> [!Example]
> **Q:** Suppose MPI_Comm_world has 4 processes. And then, the 4 processes all call on `MPI_Comm_split`. Two of them use `color=1`, the other two use `color=7`. After calling `MPI_comm_split`, how many communicator will we end up having in the whole system?
> **A:** 3. 
> We have `MPI_Comm_world` + two communicators
> 
> **Follow up Q:** How many names do we have for communicators?
> **A:** `MPI_Comm_split` will create number of communicators = number of distinct color. All of the communicators will **have the same name**. The MPI under the hood will be able to differentiate, but they all have the same name defined by `newcomm`

If a process uses the color `MPI_UNDEFINED` it won't be included in the new communicator.

### `MPI_Comm_free`

If you no longer need a communicator, MPI gives us:

```C
int MPI_Comm_free(
	MPI_Comm * newcomm
)
```

The new communicator will be deleted. (note, mpi_com_world cannot be deleted)

You could just leave it there and wait until program ends, but mpi [[Runtime]] keeps tracks of all the program so removing it from mpi run time saves time.

### Example

Supose the left is `MPI_Comm_World`. we want to split it up to 4 differet communciators. As you can see, always, the processes in any communicator starts from 0 until sequentially we get to `n-1` where `n` is the number of processes in the communicator

![[mpi_comm_split exapmle.png]]

All the processes will be running the code below:
```C
// Get the rank and size in the original communicator
int world_rank, world_size;
MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);
MPI_Comm_size(MPI_COMM_WORLD, &world_size);
int color = world_rank / 4;

// Determine color based on row
// Split the communicator based on the color and use the
// original rank for ordering
MPI_Comm row_comm;
MPI_Comm_split(MPI_COMM_WORLD, color, world_rank, &row_comm);

int row_rank, row_size;
MPI_Comm_rank(row_comm, &row_rank);
MPI_Comm_size(row_comm, &row_size);
printf("WORLD RANK/SIZE: %d/%d \t ROW RANK/SIZE: %d/%d\n",
       world_rank, world_size, row_rank, row_size);

MPI_Comm_free(&row_comm);
```

Q: what happens when you divide two integers together, and put into an int? (e.g. 5/2)
A: the result is 2. it will always be the floor. so, we just disregard the floating point part.

So, going back to the diagram, when we divide the stuff in the box on the left by 4, notice that all ranks in the first rows / 4 = 0

We define a mpi communicator `row_com`, call comm split, use the new calculated color, assign it with the new name, and we use the original rank.

We created 4 communicators, all are called `row_comm`.
- there won't be any confusion because mpi runtime will know which one of the `row_comm` we are talking about based on the processes.

After it prints these things, it no longer needs `row_comm`, it frees them. note that it frees *all* the `row_comm`s

![[mpi split example output.png]]