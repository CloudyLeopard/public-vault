
A **kernel** is a piece of code that will go to [[GPU]]. once it goes to the GPU, its no longer called a kernel; its called a "[[Grid]]". Its like an executable being called a process once it starts executing.

Kernel
- launched by the host
- very similar to a C function
- to be executed on device
- all threads will execute that same code in the kernel

Its like a function call in the sense that it has a name and bracket that contains argument. But uses the following format:
```C
KernelA<<< nBlk, nTid >>>KernelB
```

![[cuda kernels.png]]

`__device__` is introduced to allow CUDA to have recursion.

`__host__`: in front of the function you can put both device and host. this is helpful in case if multicore is idle so it can run the same function in GPU. Note that whatever you are running on the CPU cannot use functions like grid dimension etc.

for our course, we will **only be using `__global__`**, or called by host, and executed by the device

Those that will be executed on the device does not support static variable
> **static variable** inside a function: when you say `int x` inside a function, and `x` will get some value and function will return. 
> 
> when you write `static int x`, the `x` will retain previous values.
> even tho static variable has scope of local variable, they are stored in the data part or like they are not stored on the stack

No indirect function calls through pointers
> a function at the end exists in memory, and so it has an address. 

