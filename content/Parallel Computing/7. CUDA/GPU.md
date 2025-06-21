GPU is considered a [[SIMD]] under [[Flynn's Taxonomy]]: execute the same instruction on a large set of data

## Architecture Goals and Comparison

| Hardware Type | Goal                                                        |
| ------------- | ----------------------------------------------------------- |
| CPU           | Maintain execution speed of old sequential programs         |
| **GPU**       | Increase [[Throughput]] of parallel programs                |
| Multicore     | Reduce execution time of non-GPU-friendly parallel programs |

### CPU and GPU

**Winning application optimizes stuff w both CPU and GPU**
CPUs for sequential parts, or low or non-data level parallelism, where latency matters
- CPUs can be 10X+ faster than GPUs for sequential code
GPUs for parallel parts where throughput wins
- GPUs can be 10X+ faster than CPUs for parallel GPU-friendly code

![[performance of floating point calculation.png]]

> [!info] Definition of GFLOP
> Time taken to finish GPU to finish whole thing / number of operations to do a matrix multiplication or something

#### Memory Bandwidth

GPU has its own memory (DRAM), and an L2 cache. The memory of CPU and memory of GPU are separate - so there are communication stuff here

When designing memory (any DRAM memory), you can either optimize the [[Latency]] (the time you give an address until you get the data) or the [[Bandwidth]] (once you have the data, how fast will you bump it into the bus - gb per sec). But you **cannot optimize for both**
- memory on CPU or motherboard or system memory is optimized for latency
- memory on GPU card is optimized for bandwidth (Almost 10X the bandwidth of multicore memory)

Memory bandwidth of CPU and GPU
![[GPU vs CPU memory bandwidth.png]]
### GPU vs Multicore

There is a wide performance difference between GPU and multicore because of the hardware architecture:

![[GPU vs CPU.png]]

Green part = computation part ([[Pipelining|execution unit]])

Clearly, GPU has way more processing part than multicore.

Multicore needs a lot more sophisticated hardware, like multilevel of [[Cache|caches]], [[Speculative Execution|branch prediction]], hardware for [[Cache Coherence]]... These fill up chip area, which results in less space for computation

GPUs are designed to leave as much space as possible in the chip for the computation. there is no branc prediction, no coherence hardware, etc. many of the hardware not related to execution is removed
- GPU is designed to get performance from **massive amount of calculation**

> [!important] [[Core]] vs **Execution Unit**
> Every company has its own naming convention. For NVIDIA's chips (which is what we are working with), they named their execution units (the small green squares) **cores**.
> 
> This is *not* the same as [[Core]], which usually refers to an entire CPU.
>
> In marketing, when people say the GPU has "3000 cores", that does not mean they have 3000 cores lol, but 3000 execution units


### Chip Programmability

As the efficiency of a chip increases, the programmability of said chip decreases.

![[programmability vs efficiency.png]]

Examples:
**TPU (Tensor Processing Unit)**
A specialized chip developed by Google for AI and machine learning tasks. TPUs function similarly to GPUs, using a [[SIMD]] (Single Instruction, Multiple Data) approach. Unlike GPUs, TPUs are not available for direct purchase but can be accessed remotely through Google’s infrastructure. They are optimized for Google’s internal systems.

**FPGA (Field Programmable Gate Array)**
Used in large-scale systems like Microsoft Azure and available on Amazon AWS, FPGAs represent a middle ground between hardware and software. *They can be reconfigured after manufacturing, allowing flexibility not typically possible with hardware.* This means tasks can be executed in hardware for speed, while still retaining some of the adaptability of software. Though common in electrical engineering for decades, FPGAs are less familiar to many computer science students due to their complexity and the need to use specialized hardware description languages.

**Quantum Computing**
Harder to program than FPGAs. You need to learn a quantum programming language, so it’s not very flexible or easy to use.

## When to Use GPU and Problems Faced by GPU

Obviously, not all applications are suitable for GPU (it's an [[Accelerator]], or is very good for a subset of applications, very bad for others)

Considering how important this topic is, I've created a separate note dedicated to this: [[Suitable Applications for GPU]]

Must match **all four qualities described** to consider using GPU.


## GPU Architecture

This part is... big (and that's an understatement). Please see the notes on [[GPU Architecture]]

## GPU Programming

[[GPU Programming]]