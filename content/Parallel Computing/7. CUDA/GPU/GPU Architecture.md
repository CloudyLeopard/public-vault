Part of the lecture for [[GPU]]

## GPU x CPU Connect

GPU has its own memory; CPU has its own memory

![[GPU Hardware 1.png]]

> [!info]
> The arrow connecting the nodes should be between memory, not between the chips

There are two options to connect CPU to GPUs
1. **PCI Express** from CPU to each GPU
2. **PIC switch** that directs CPU to different GPUs

Overall, PCI switch is good because it is versatile, but adding extra delay (already, there is delay in connection; now, adding delay on switch)

### NVLink

Bandwidth of ~80GB/s per link
![[gpu hardware 2 nvlink.png]]

this is not very standardized, however, so its being deprecated.

### PICe

![[gpu hardware 3 pcies.png]]

> [!important] Interpreting the "Speed"
> Notice how the speed doesn't really match in the picture above. This is because what is being sent from one to another is more than just the data! Also includes header, footer, etc.
> 
> Speed is actually not fully utilized, which is why they put in two numebrs

## Modern GPU

### GPU Naming Convention

**Chip Naming: Marketing vs Architecture**

Chip companies use two types of names: one for marketing, and one for the actual architecture.

• **Marketing names** are what you see in stores—like Intel i7, i9 or NVIDIA 1080, 3090. These names help sell the product and give a rough idea of performance.
• **Architecture names** refer to how the chip is actually built—core layout, memory design, interconnects, etc.

For Intel:
- i9 usually means more cores than i7, but both can be based on the same architecture.
- The generation number (e.g., 13th Gen) helps identify which architecture it uses.

For NVIDIA:
- Marketing names like “RTX 3080” sit on top of architectures with code names based on physicists: Tesla, Fermi, Kepler, Maxwell, Pascal, Volta, Turing, Ampere, Hopper, Lovelace, Blackwell

Every major chip company follows this pattern.

### GPU Card Appearance

![[GPU hardware 4 fan.png]]

they have two fans: GPUs dissipate heat much more than Multicore. This is also why you [[Suitable Applications for GPU|HAVE TO USE GPUS TO ITS BEST]], otherwise you cannot justify using the fan and other stuff.

### GPU Design Motivation

We follow the example of GPU GeForce 8800 (2007)

**Host vs Device**
In GPU computing, the **[[Host]]** is the main CPU (usually a multicore processor that runs the main function), while the **[[Device]]** refers to the GPU. 
- The host sends both code and data to the device for processing.

Does so through the earlier discussion ([[GPU Architecture#GPU x CPU Connect|GPU x CPU Connect]])

![[gpu hardware 7.png]]

**GPU Memory and Parallelism**
- **Global memory**: The GPU’s memory. It is **banked**, meaning each memory bank has its own load/store unit, allowing for high [[Bandwidth]]—multiple data loads/stores can happen in parallel.

NVIDIA GPUs can have thousands of **execution units (CUDA cores)**. Remember that this is *not the same as a [[Core]]*

GPU follows [[SIMD]] mode, which is why GPU uses all these execution units: they are all executing the same code/instruction across different data

**Communication Within the GPU**
Still, despite massive parallelism, instructions may still need to communicate.

However, with thousands of execution units, full interconnection between all of them is impractical—it would use too much power (they use copper) and space.

But relying only on global memory for communication is too slow.

So, GPU designers took something in between with a grouping strategy:

### Basic GPU Hardware Design

- Execution units are divided into fixed-size **groups** (all groups has the same number of execution units)
- Execution Units **within a group** can communicate very quickly.
- Communication **between groups** is slower.

These groups of execution units are called a [[Streaming Multiprocessor]] (SM), and each execution unit is called a [[Streaming Processor]] (SP)

> [!important] NVIDIA's naming convention
> These are NVIDIA's naming convention.  Unfortunatley, every brand/company has its own name. This is why one of the spec for NVIDIA GPU card is how many SM it has

### Basic GPU Hardware Memory

![[gpu hardawre 6 sp sm.png]]

**Global Memory**: GPU Memory
**System Memory**: memory of system (CPU), e.g. 32 GB of RAM
**Shared Memory**: Memory inside [[Streaming Multiprocessor|SM]], and is under your (programmer's) control. I.e. you decide if you want to put stuff into shared memory or global memory

SM also has a **L1 Cache** 
Both the L1 and **L2 Cache** are not under your control.
- **L2 cache** is shared among all SMs

**Texture memory**: some kind of "explicit" memory, we won't touch this

**Parallel Data Cache**: the L1 cache inside each group

![[GPU memory hierarchy.png]]