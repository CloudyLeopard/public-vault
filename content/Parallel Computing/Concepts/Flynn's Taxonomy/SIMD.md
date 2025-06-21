Single instruction, multiple data. A type in [[Flynn's Taxonomy]].

> [!info] *Pacheco* 2.3.2

SIMD achieves **[[Data Level Parallelism|Data Parallelism]]**:
- Parallelism achieved by dividing data among the processors
- Applies the same instruction (or group of instructions) to multiple data items at once
- Example:
	- GPUs: Calculate pixels on the screens that are totally independent of each other
	- Vector processors: see [[SIMD#SIMD Example Vector Processors|below]]

> [!Info] Vector Processor
all the processors now have these "vectorized stuff", and *you do not initiate them yourselves*
The compiler knows the processors are vectorized, and will generate **assembly instructions for these vector operations**

![[SIMD example.png|500]]
Sequentially, this will be `x[0] += y[0]`, `x[1] += y[1]`, ...
But, with vectorized processors, this can all be calculated in *one cycle*

> [!Info] Example: What if we do not have as many execution units as data items?
> Divide the work and process iterative
> Example: 4 execution items and 15 data units
> ![[simd w vector calculation.png]]

Note: We will not be writing anything for SIMD in this class, because **this is all done by the compiler.**
### SIMD Drawbacks
All execution units are required to execute the same instruction(s) or remain idle.
In classic design, they must also operate synchronously (i.e. together at the same time).
Efficient for large **data parallel** problems, but not other types of more complex parallel problems.

> [!info] Machine Learning
> SIMD actually became very important for machine learning, even if it is designed for graphics in mind at first (GPU). This is because this is really good for **matrix multiplication**, which is basically machine learning.
> 
> Example: Transformers can actually be done quite well by GPUs. Usually, when you compare this type of software, you are looking at the
> 1. cost
> 2. performance (quality of answer)
> 3. power efficiency (power it will consume
> 4. time (speed to give you answer after training)

> [!Question]
> Q: compare a GPU that is 2x more advanced vs using two GPUs.
> A: "Depends" on how parallelizable the problem is - meaning the program can be split up and does not need as much communication (which is costly)

### SIMD Example: Vector Processors
The only widely produced SIMD systems by the late 1990s.

Processors execute instructions where **operands are vectors** of data instead of scalars (which is what conventional CPUs operate on)
This needs
1. **Vector registers**: capable of storing a vector of operands and operating simultaneously on their contents. Vector length is fixed by system, and range 4 to 256 64-bit elements
2. **Vectorized** (and pipelined) **execution units**: the same operation is applied to each element in the vector. Or the same operation is applied to each pair of corresponding elements in the two vectors (e.g. addition)

> [!info] For more information, see textbook

**Pro**
- Fast
- Easy to use
- Vectorizing compilers are good at identifying code to exploit
- Compilers also can provide information about code that cannot be vectorized - helps programmer re-evaluate code
- Makes the best use of **memory bandwidth**: bringing a bunch of values is better use for the bandwidth than bringing a value at a time
	- Suppose you have to add two numbers, you have to bring them from memory to cache (register), then make the addition. Suppose we are looking at an int (32 bits). The width of the BUS connecting to the CPU is 64 bit. So, you are losing half of the BUS. But, if you can get a bunch of numbers at once, you are using all of the BUS bandwidth.
- Uses every item at the cache

**Cons**
- they don't handle irregular data structures
- Very finite limit to their ability to handle every larger problems (**scalability**)
	- machine has finite number of vectorized execution units and finite number of vectorized registers