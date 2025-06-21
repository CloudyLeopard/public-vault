Measuring a program's performance.

First, see [[Timing]] to understand different "timing" measurements (e.g. wall-clock time, CPU time)

## In General

### Two Types of Problems

There are two type of problems we try to solve. It is important to know which type of the application you try to parallelize is.
1. **Capacity Computing**: solve as many small/medium problems as possible at the same time
2. **Capability computing**: solve a single highly complex problem as fast as possible

> [!info]
> 90% of the stuff we are trying to do is capability computing.

### Simple Metrics
**Response Time** (aka [[Timing|Execution Time]], or Wall Clock Time)

**[[Throughput]]**: total amount of work done in a given time
- e.g. how many threads finished in the last two minutes?

Note: response time is a timing (e.g. 10 sec), whereas throughput is a rate

> [!note] Relationship between execution time and throughput
> *Increasing* throughput *decreases* response time. Since you are doing more tasks in the same time unit, total execution time will decrease.
>
> If we use the same number of cores, but now use *more powerful cores*, we will *increase throughput*. Each task will finish faster with more powerful core. Since throughput increase, response time decreases.
## For Parallel Programs

Given two parallel programs that are doing/calculating the same thing, but they have different implementations. Assume both are correct, how can you say one program is better than another?

Determining this is more than just "speed".
- What if I move the program from 4-core hardware to 8-core hardware?
- What if the 8 cores can [[Hyperthreading|hyperthread]]? [[Superscalar]]?

In other words, we need to define **performance**, and that really depends on the task.
- Faster speed on certain types of machine?
- Power multiplied by the speed gets bigger?
- Program requires less memory?
- ...

See [[Amdahl's Law]], [[DAG Model for Multithreading]]

Standard Definitions:
- [[Performance]]
- [[Speedup]]
- [[Efficiency]]
- [[Scalability]]

> [!important] Be Careful of [[Timing|Wall-Clock Time]]
> The formula for [[Speedup]] and [[Efficiency]] uses $T_\text{serial}$ and $T_\text{parallel}$, which are **wall-clock times** - the time from program start to program end. The problem is that **this is not fully under your (programmer's) control**:
> - they are influenced by you (this will have less time than when you have a better parallel code). 
> - Influenced by choice of compiler
> - depends on the compiler switches (eg turning optimization on/off)
> - The operating system: if operating system is very efficient at creating threads/processes, you're gonna get a better $T$
> - the type of filesystem holding the input data
> - The time of the day (different workloads, network traffic, etc.)
> 	- If you access a computer during a time when everyone else is accessing the same computer, your program is going to be slow since the computer will be doing context switches.

### Pitfalls of Timing in Parallel Programs

In other words, measuring timing in parallel program is difficult - it varies between runs!

1. The total number of instructions executed may be different across different runs

> [!note] Discrepancy in Instruction Count Increases as Number of Cores Increase
> Suppose we have the same program, running on the same machine (so same **cycle time**) with the same input. We run that program several time. **The discrepancy will get bigger as the number of cores increase**
>
> Increase number of cores $\rightarrow$ need to generate more threads $\rightarrow$ ask OS to generate more threads $\rightarrow$ ask OS to do more work $\rightarrow$ total number of instructions may increase.

2. System-level code account for significant fraction of the total execution time

Additionally, **program does not run in a vaccum**
- OS is always there
- A computer that has multicore setting will often have multi-programming and/or multi-threading settings

> [!note] Multi-core Computer will probably run multiple programs at once
> Programs can be *multi-threaded*. In other words, we can have several programs running in the background *running with your code*. The existence of these programs will obviously affeect your code's performance: completing for cores and also the below reason

- Independent programs affect each other: [[Cache]] stuff, competing for [[Memory Access|memory]], etc.

**Conclusion: may need to run the program multiple times and get an average, to get as close as possible to what the "real timing" is.**

## For Sequential Programs

If we assign a code to a core or a CPU, we are running it sequentially. So, it is important to know the performances on measuring sequential code.

Measurements:
- IPC (instruction per cycle) = total # instructions / total # cycles
- CPI (cycles per instruction) = total # cycles / total # instructions
- IC (instruction count, or Number of Instructions)
- ET (Execution Time)
- MIPS (Million Instruction per Second)
- CT (Cycle Time) = total # cycles / second = 1 / [[Hertz|Frequency]] or 1 / Clock Rate

### Execution Time for Sequential Program

Arguably the most important equation in this section.


$$ ET = IC \times CPI \times CT$$
$$\frac{seconds}{program} = \frac{cycles}{program} \times \frac{seconds}{cycle} = \text{total cycles} \times \text{cycle time} = \text{program time}$$
CT = Cycle Time

Note: $IC \times CPI = \text{Number of Instructions} \times \text{Cycles per Instruction} = \frac{cycles}{program}$
The remaining are:
- $ET = \frac{seconds}{program}$, or seconds per program
- $CT = \frac{seconds}{cycle}$, or seconds per cycle

---

When a program is written, there are three entities: the programmer (us), the compiler, and the hardware.

Which of the three entities affect **instruction count** more?
4. Programmer: programmer decides what kind of instructions is carried out (e.g. double floating point precision), and compiler can't do anything about it
5. Compiler: sometimes compiler optimizes code. But, compiler won't remove accuracy for the sake of simplifying code
6. no third lol

Which of the three entities affect **CPI** more?
7. Hardware: how long a floating point takes depends on how the hardware is designed
8. Compiler AND programmer also plays a role: hardware will execute instruction generated by the compiler; compiler will make code based on the programmer. 
	- compiler could compile instructions such that each one takes less cycle
	- programmer could make code that's just easier to run

> [!warning] Double check the order of this. But i'm confident about the explanation

Which of the three entities affect **Cycle Time** more?
- Obviously hardware

### Examples

All of the following examples really just shows that the best measure of a sequential program's performance is **execution time**.

#### 1. Clock Rate

![[performance example.png]]

A: 10 = total_cycles \* (1/4 GHz)
B: 6 = 1.2 \* total_cycles \* (1/clock_rate)

We divide A by B:
10/6 = clock_rate / (1.2 \* 4[[Hertz|GHz]])
Clock_rate = 8[[Hertz|GHz]]

> [!note] IRL connection
> this clock rate is not possible anymore. the cost of packaging will increase exponentially, the amount of heating is non-economical (gotta use liquid cooling or something)

#### 2. CPI

![[performance examples 2.png]]

ISA: we have two implementations of the same instruction set for two machines. Both can run the same program (cuz same ISA) (thsi is 201 stuff)

Note: CPI is the lower the better (yea this is intuitive)
So, it *seems* that machine B is better. It has a lower CPI!

But, let's see how long does this program take on each machine.

$$ET = IC \times CPI \times CT$$
$$ET_A = IC \times 2 \times 250 = 500IC$$
$$ET_B = IC \times 1.2 \times 500 = 600IC$$
This means the CPI told us the opposite! In the end, **the execution time is what counts**. machine A is better!

Why is CPI is incorrect here? Well, its not that CPI is incorrect. But, CPI only gives us correct indication if everything else is equal.

#### 3. Instruction Count

![[performance example 3.png]]

Just by looking at the number of instructions, it seems the second is worse (6 vs 5)

Note: **"same machine" means the CT is the same for both sequences**

$$ET = IC \times CPI \times CT = total\_cycles \times CT$$
The first code sequence has 5 instructions:
$total\_cycles = 2*1 +1*2+2*3=10$
$ET = 10*CT$

The second sequence has 6 instructions:
$total_cycles = 4*1+1*2+1*3=9$
$ET=9*CT$

The second sequence is faster! Even though the second sequence is faster.

> **The instruction count can give us the wrong conclusion if the mix of instruction is not the same**. Example: 10 integer addition vs 3 double precision floating point divisions.

What is the CPI of each sequence?
- 1st sequence = $10/(2+1+2) = 2$
- 2nd sequence = $9/6=1.5$

#### 4. MIPS
(Million Instructions Per Second)

![[performance example 4 MIPS.png]]

MIPS = # instructions in millions / total time in seconds
Total time in seconds = total number of cycles \* cycle time = total number of cycles / Frequency

First compiler:
- total # instructions = $7 * 10^6$
- total # cycles = $(5*1+1*2+1*3)*10^6=10^7$
- Frequency = 4[[Hertz|GHz]] = $4*10^9$

> [!note] "Giga" and "Mega" units are unlike Memory
> In Memory, GB = $2^{30}$, MB = $2^{20}$

- MIPS = $7/(10^7 / (4*10^9)) = 2800$

Second Compiler:
- total # cycles = $10*1+1*2+1*3*10^6 = 15*10^6$
- MIPS = $12/(15*10^6/(4*10^9))=3200$

Intuitively higher MIPS = better
According to MIPs, the second compiler is better

Let's see if that's true:

1st compiler:
- ET = $10^7 / (4*10^9) = 1/400$

2nd compiler:
- ET = $15 * 10^6 / (4*10^9) = 1.5/400$

Even though the MIPs told us the second compiler is better, the execution time told us the first compiler is better.  ==Whenever there is a discrepancy, execution time is always the right one==