MPI (Message Passing Interface) is a parallel programming language embedded in C.

**Goal: How to reduce messages yet increase concurrency**

**We will talk about [[Process (PL)|processes]]**

![[MPI Target.png]]
(See [[Distributed Memory System]])
Each [[Process (PL)|process]] assigned to a node is on its own (it **cannot** access other “nodes”’ memory). Instead, **they can send messages to each other**

This is why MPI stands for Message Passing Interface. It provides API for message communication 

Each process can be:
- single [[Threading|threaded]] (sequential process)
- multithreaded (each process is also parallel - instead of one [[Core]] we have [[Processor|multicore]])

> [!important] Assume Single Thread
> For now, we will assume each process is single threaded (until we learn [[OpenMP]] later)

> [!Example] Real Life Example: Supercomputer
> All the big [[Distributed Memory System|supercomputers]] are programmed with MPI (it's the defacto language for big machines), including the top 500 super computer.
> *Makes sense* because the cores do *not* share a common memory, and have to communicate with each other. 

> [!Question] Can you write MPI code for your laptop?
> Yes! First, on a laptop, you can run several processes at the same time (e.g. chrome, zoom, messenger, etc.). The main difference is that these processes are not aware of each other's existence.
>
> However, each [[Process (PL)|process has its own virtual address space]].
>
> So, we *can use MPI to make processes talk to each other*. But, we we will not gain much from doing this.

## MPI Processes

Every [[Process (PL)|process]] inside MPI has a unique ID called a [[Rank]]. It identifies processes.

## MPI Programs

MPI is used mainly with C/C++ and Fortran

> [!info] Fortran?
> People think Fortran is dead because of how old it is, but it has evolved now and is a parallel language. It can also send to GPU. Also MATLAB (which was written with high performance Fortran code)! 
> For some reason mathematicians use Fortran the most

- With some efforts with other languages going on and off

> [!important] Problem with other languages: speed
> The problem is not porting MPI to other languages. But because other languages are slow. A good example is languages with:
> **Managed collection** (e.g. there is garbage collection). For parallel code, we need high performance and speed, meaning we need to control when and how and so on. With managed languages, my life as a programmer is much easier, but i have no control over when garbage collection kick in and how long it takes to clean the heap --> make language not high performance

- In general, any language that can call libraries from the above can use MPI capabilities

To use MPI in C, need to add `mpi.h` header file

==Also see: [[MPI Example Programs]]==

### Naming Conventions

Identifiers defined by MPI start with "MPI_". Then...
- If only first letter following underscore is uppercase: (This is an API)
	- for function names and MPI-defined types
	- Helps to avoid confusion
- If all letters follow MPI are upper case:
	- MPI defined macros
	- MPI defined constraints

## MPI Terminal Commands

See [[MPI Terminal Commands]]

## MPI Components

See [[MPI Components]]

## MPI Derived Datatypes

**Intuition**
Recall that in a [[Distributed Memory System]], communication is more expensive than computation; as a result, distributing a fixed amount of data among several messages is more expensive than sending a single big message

Question: how do we send **several data types?**
- Option 1: do multiple several [[MPI Point-to-point#`MPI_Send`|MPI_Send]], which is expensive
- Option 2: use **MPI Derived Datatypes**

See [[MPI_Datatype#Derived Datatypes|MPI Derived Datatypes]]

## Measuring Time in MPI

[[MPI Timing]]

## Sync Processes

[[MPI_Barrier]]

## Safety in MPI Programs

[[Safety in MPI Programs]]

## Communicators

[[MPI Communicator]]

## Words of Wisdom
### When to use MPI

Portability and performance
> portability across different machines (e.g. all the top 500 super computers can run MPI). Almost a defacto when it comes to processe that are collaborating

Building tools for others
- libraries

Need to manage memory on a per process basis
>  for example, suppose you have a process where you want a large heap but a small stack, so we make huge dynamic allocation but not a lot of nested calls; in other cases its the opposite, i have a large stack but id ont need a large heap, etc.

### When not to use MPI

Programs that have irregular [[Communication (Constraint)|communication]] patterns are often difficult to express in MPI's message passing model
> Irregular communication pattern means you will not be able to use collective calls. When you have something that doesn't have specific pattern, you can only use point-to-point, which means you will be calling mpi_send and mpi_recv a lot, which will make performance go down

Domain-specific applications with an API tailored to that application
> e.g. streamlit is for streaming applications. usually when you have a programming language is made for a specific type of application, you can't have mpi beat a tailored language to that application

Require Fault Tolerance
> ther eis some research on how to make MPI fault tolerance, but based on what we have seen, it's not. What if in a big super computer it crashed? As soon as you have a mpi collective call, we will have a deadlock.
> MPI is not created in such a way to have a fault tolerance.
> Fault is a very big field in computing. E.g. 1 bit is flipped from 0 to 1 due to dusts, cosmic rays from the sun, etc. this is especially needed now, now that transistors are really small

### Strengths of MPI

small
- many programs can be written with only 6 basic functions

But also large
- MPI's extensive functionality (MPI-1 contains about 125 API, let alone MPI-2 and MPI-3)

Scalable
- [[MPI Point-to-point|point-to-point communication]]

Flexible
- don't need to rewrite parallel programs across platforms