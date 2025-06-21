How did the hardware evolve? - this matters because there are decisions in the past that influenced the way things are today

The first working electronic computer (1946). There were *no* transistors
- they used vacuum tubes (basically like a really big light bulb that also acted like a switch)
- life time: 18 hours
- 3000 ${ft}^3$
- 1800 instructions per second, pure hardware no software

> [!important] Hardware and Software in Computer World
>  in computer world, hardware and software is "equivalent" (nice). to do something, you can either write a program, or make a circuit that does it. **Circuit is always faster, but program is much more flexible.**
>  To "write a program" you just keep rewiring things.

Von Neumann came and presented his idea of **stored program concept**
- have an electronic storage

Maurice Wilkes built the computer based on this program concept.
- removed all the wiring, so the machine became much smaller
- Speed became slower, though - 650 instructions per second.

Then transistors came

> [!info] transistors (designed in 1947)
> the building block of logic gates, for building multiplier, subtractors, or hardware that fetch instructions, etc.
> At its core, a transistor is basically a switch.

This started the 2nd generations of computers, introduced in the 50s called UNIVAC (UNIversal Automatic Computer)

Once we started to put it on "**integrated circuits (IC)**", we called it **microprocessors**
- One IC can host hundreds (then thousands, then billions) of transistors -> computers are getting smaller in size yet more powerful

The speed of software also evolved.

Intel 4004: the first **microprocessor**, introduced in 1970
- 2250 transistors
- 12 mm^2
- 108 KHz

Intel 8086
- 29,000 transistors
- 33 mm^3
- 5 MHz
- Introduced in 1979, basic architecture of the IA 32 PC (assembly)

Intel 80486
- 1,200,000 transistors
- ...
- Introduced in 1989
	- first processor with cache memory
	- first **pipelined implementation** of IA32

Pentium
- 3,100,000 transistors
- Introduced in 1993
	- first **superscalar implementation** of IA32

Pentium 4
- 55,000,000 transistors
- Introduced in 2000, the *last* single core in the market

AMD Threadripper, IBM Power 10, Intel Xeon, ... - all **multicore**

Today, microprocessors have transistors in the billions. But also, the cores are **heterogeneous**
- Some are CPU related, some are GPU related
![[Intel RaptorLake.png]]
*Intel RaptorLake*

RaptorLake + large number of cores = I9
RaptorLake + small number of cores = I7
*I9, I7, I{...} are the marketing names, {...}Lake is the architecture name*

See next: [[Parallel Hardware Evolution]]

## Computer Technology Historically
Memory
- DRAM capacity: 2x / 2 years (since '96)
- 64x size improvement in last decade
Processor
- Speed 2x / 1.5 years (since '85), but we are hitting a wall
- 100x performance in last decade
Disk
- Capacity: 2x / 1 year (since '97)
- 250x size in last decade

See [[Memory Wall]]

## Modern Multicore Examples

**Intel Cascade Lake** (architecture name; market name: Intel Xeon)
- 14 nm technology (note: latest technology in product is 3 nm)
- L1 [[Cache]] (Level 1 data cache)
	- 32 KB/core, ==8-way [[Cache Block|set associative]]== (every set has 8 blocks), 64 sets, 64 B line size, write-back policy (write back only when block is kicked out of set, unlike write through - if i modify my cache, i will also modify the lower level caches)
	- 1 cycle
- L2 Cache
	- Private (every core has its own)
	- 1 MB/core, 16-way set associative, 64B line size, write-back policy
	- 14 cycles latency - takes 14 cycles to see if we have a cache miss
- L3 Cache
	- 1.375 MB/core - each core gets a piece of L3 cache, and these pieces are all connected to each other (so they are still shared). this is better than just a giant L3 cache because a big one is power hungry
	- 11-way set associative
	- shared across all cores
	- 50-70 cycles latency  - slowest one, but biggest one in size so we can have a high hit rate. The bigger the cache, the higher the probability we have a hit rate

**Super Computer Example: Frontier**
- 606,208 cores
- 37,888 GPUs
- 74 cabinets (literally a cabinet that stores stuff), each cabinet has 64 blades, each blade has 2 nodes, each node = 1 CPU, 4 GPUs, and 4 TB of flash memory (per motherboard)
- This is the first machine that crossed the [[Exaflop|exascale]] ($10^{18}$) floating point (this is important cuz u can start analyzing human genome quickly and personalized drugs etc. precision medicine, ppl think is necessary to cure cancer)
