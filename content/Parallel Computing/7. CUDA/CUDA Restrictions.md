
- all threads in a grid execute the same kernel code
- A grid is organized as a 1D, 2D or 3D array of blocks (gridDim.x, gridDim.y, and gridDim.z)
- each block is organized as 1D, 2D or 3D array of threads (blockDim.x, blockDim.y, blockDim.z)
- Once a kernel is launched, its dimensions cannot change
> dimension is the total number of threads, total number of blocks; that means how many blocks, how many threads per blocks, and how they are organized (1D, 2D, 3D). these are fixed and cannot change dynamicaly when lanched
- All blocks in a grid have the same dimension
- the total size of a block, in terms of number of threads, has an upper bound
- once assigned to an SM, the block must execute in its entirety by the SM

## Compute Capability

primarily, we have CUDA version (programming language version) which changes CUDA

another number is "compute capability"
- it is a number in the form of **x.y**
> if CUDA version is later, but the compute capability is not high enough, some capabilities of CUDA cannot be used by the hardare
- it is a standard way to expose **hardware resources** to applications
- CUDA compute capability starts with 1.0 and latest one is 9.x (as of today)
> actually, its almost 11 now
- API: `cudaGetDeviceProperties()`
> NVIDIA likes very long names for some rzn lol

![[cudaGetDeviceProperties.png]]

- `cudaDeviceProp`: the struct that will store the information once you call this
- `device`: sometimes there are more than one device. call `cudaGetDeviceCount` to know how many device there are.

there are lots of interesting properties that will be in `prop`
- `name`: name of teh device, liek RTX4090, etc. the name at the box of teh GPU
- `totalGlobalMem`: global memory in bytes, may need to divide by 2^20 if you want M, or something
- `sharedMemPerBlock`: we know inside every SM we have some shared memory. this is how big shared memory in one SM
- `regsPerBlock`: this is in thousands
- `warpSize`: this will always be 32 (well, at least it is 32 so far)
- `maxThreadsPerBlock`: max threads in a block
- `maxThreadsDim[3]`: in each direction, there is a bound on how many blocks. the multiplcation of these numbers must not exceed `maxThreadsPerBlock`
- `maxGridSize`: max blocks in a grid in each direction
- `clockRate`: kHz, may divide by 1000 to get megahertz or 1mil to gigahertz
- `totalCostMem`: we prob wont discuss this, it is outside of SM
- **`major, minor`: form the compute capability**, x.y=major.minor
- `miltuProcessCount`: how many SMs
- `concurrentKernels`: how many kernels we can execute at the same time. Suppose we have a bunch of thread and each executes a kernel. we have each thread send a kernel to the device, and device can handle it, but there is a upper bound
- `unifiedAddressing`: idk
- `memoryClockRate`: idk
- `memoryBusWidth`: bus width (or how many wires) connecting global memory GPU to GPU itself. this number is non standard. this number is decided by gpu engineers
- `l2CacheSize`: how big l2 cache is, which is outside of sm, in bytes
- `maxThreadsPerMultiProcessor`: total number of threads inside processor
> difference with `maxThreadsPerBlock`: sometimes sm is big enough to hold more than on eblock. The WHOLE sm cannot handle more than `maxThreadsPerMultiProcessor` threads at thes ame time.
