Functional units are arranged in stages that can be simultaneously executed.

> [!info] Textbook Chapter 2.2.5

This is a [[Parallel Hardware Evolution|second generation core]] implementation.

![[Second generation core.png]]

Assume we have each instruction has 4 stages. 
- In one cycle, the first instruction is fetched.
- In the second cycle, the "fetch" instruction will move forward, and the fetch part can fetch again. 

This is **[[Instruction Level Parallelism]]**: they are executing 5 instruction in parallel *without programmer interference*.

![[second generation core pipeline.png]]

**Pipelining**:
- the hardware divided into *stages*
- **[[Temporal Parallelism]]**: temporal because they are parallel while each program is in a *different stage in time* (fetch/decode/issue/execute/commit)
- Number of stages increases with each generation

After instruction finishes the "commit" stage, the best scenario is that every program gets committed. **Which means the minimum CPI (cycles per instruction) = 1**

> [!info] Interpreting CPI
> The lower this number the better. Remember, cycle is really a time frame. More cycle = more time. The lowest we can get is 1 cycle per instruction

Note: different companies have different stages. Some companies may split it into 6, 8, 3, etc. And, the number of stages is usually a secret for each company. We are using 5 as a general case. 

Now, since each stage is smaller, we can have a higher frequency.

## Problems with Pipelining

In many (in fact, most) cases, **CPI > 1**:
- What if the instruction is a conditional branch?
	- The fetch will not be able to know what instruction to get (since I will never know if A > or < B until the instruction (the if condition) reaches the execution phase)
	- Until that instruction reaches execution, *the fetch stage will not be able to fetch*
- Dependencies among instructions (i.e. an instruction must wait for the result of another)
	- Suppose you want to add `rax` to `rdx`, but both are dependent on two other instructions
	
Because of these, the optimal CPI=1 is rarely achieved.

**Conditional branch jump is a very severe problem**. Every thing related to function calls and OOP uses (to some extent) jumps and conditional jumps - in other words, most programs we run today have conditional jumps.

Additionally, there are **many different parts in the "Execute Stage"**
- addition and subtraction of int
- multiplication and division of int
- ... of float
- ...
Whenever we are using a part, *the rest is [[Idle]]*

In conclusion, while the efficiency of pipelining is bad because of conditional jumps, the idea of pipelining is good: we add parallelism *and* we did not add that much hardware.

We need to deal with conditional jumps. Solution: [[Speculative Execution]]
