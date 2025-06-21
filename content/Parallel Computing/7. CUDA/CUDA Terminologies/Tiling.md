*Technically not a CUDA term, but a software technique*

**Tiling**: partition the data into subsets called **tiles**, such that each tile fits into the **shared memory** (instead of having to make duplicate global memory access, which is slow)

Example: [[Matrix Multiplication (CUDA)#CUDA Version 3]]

> [!Note] Theres Only Benefits if there is Duplicate Global Memory Access
> Like, with matrix addition, you only need to access each element once (unlike matrix multiplication). there's no point saving the elements into a shared memory

