
We want to pass in the type of the elements being [[MPI#Communication|sent/received]], but C does not allow a parameter input to be a literal C type (e.g. int).

[[MPI]] gets around this by giving a name of the type mapping the name of the type as a "variable" to the corresponding C type

![[MPI_Datatype table.png|400]]

Datatype that represents a pair for [[MPI Collective#`MPI_MAXLOC` and `MPI_MINLOC`|MPI_MAXLOC and MPI_MINLOC]]
![[MPI Datatype Pair Argument.png]]

## Derived Datatypes

We want to send elements from process x to process y, but elements of different types.

**Derived Datatypes:**
- Used to represent any *collection of data items*, called a **struct**
- If the function that sends the struct from one to another knows the information of the struct (e.g. we want to send an int from this memory), it will go and collect the info from the memory, pack them together, and send it to the destination.
- A function that receives data can distribute the items into their correct destinations in memory when they're received.

A **structure**, or **struct**: A sequence of basic **MPI datatypes** together with a **displacement** for each datatypes
![[MPI struct derived datatype.png]]

**displacement**: displacement from the *first* variable
- 0: 24-24=0
- 16: 40-26=16
- 24: 48-24=24

> [!Question] Why do we need struct?
> Q: why do sometimes we need to put them in a structure instead of putting them separately? (in general, not related to MPI)
> 
> A: it is there for sequence of memory. suppose you have three lines that declare int then float then char or something. even if they are in the same place in teh code there is no guarantee they are in sequence in memory. struct makes them enxt to each other and thus makes it memory friendly

Steps:
1. MPI_Datatype *somename* (you make to make this declaration)
2. `MPI_Type_create_struct()`: tell the MPI Runtime to tell this new structure that it contains this item blah blah blah.
3. `MPI_Type_commit()`: now, you have a type called *somename* - its a new type you created
	- at its core its nothing but a structure. 
4. `MPI_Type_free()`: call when done, and tell MPI [[Runtime]] this newly created type is no longer needed
	- this is needed because if you leave MPI Runtime with many newly created items, you will make it a little bit slower

### Functions
#### `MPI_Type_create_struct`

tell the MPI Runtime to tell this new structure that it contains this item
```C
int MPI_Type_create_struct(
	int count, // in
	int array_of_blocklengths[], // in
	MPI_Aint array_of_displacements[], // in
	MPI_Datatype array_of_types[], // in
	MPI_Datatype* new_type_p // out
)
```

> [!danger] rewatch this part or review txtbook (3/18/2025)

Arguments:
- `array_of_block_lengths[]`: ==not sure==
- `array_of_displacements[]`: ==not sure==
	- `MPI_Aint`: MPI Address int, a type that is big enough for MPI to specify the address
- `array_of_types[]`: ==not sure==
- `new_type_p`: ==not sure==

**We need to somehow get the address of item `0`, for `array_of_displacements

```C
int MPI_Get_address(
	void* location_p, // in
	MPI_Aint* address_p // out
)
```

> [!info] How to get address of some variable normally in C?
> Q: for some variable `x`
> A: `&x`
>
> Q: address of array `A` with 10 elements
> A: 
> option 1: just `A` (it is a pointer)
> option 2: `&A[0]` (memory location of the first element)

While `&` works 99% of the time with MPI, `&` in C is **actually not part of the MPI industry standard** - it does not require `&` to return the value of the pointer; additionally, in some memory management tool, it may not be correct. Hence, we use `MPI_Get_address` just in case

#### `MPI_Type_commit`

```C
MPI_Type_commit(MPI_Datatype* new_mpi_t_p // in/out)
```

Allows the MPI implementation to optmize its interal representation of the datatype for use in communication datatypes

#### `MPI_Type_free`

Once you are done with using this datatype, better to free it to free any additional storage
```C
MPI_Type_free (...)
```

## Example

[[MPI Example Programs#Example 6 `Build_mpi_type`|Build_mpi_type]] (this is an example, not an actual MPI call)



