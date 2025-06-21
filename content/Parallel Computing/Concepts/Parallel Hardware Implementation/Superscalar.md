**Superscalar**: a [[Processor]] that supports dynamic multiple issue
- **Static** multiple issue: functional units are scheduled at compile time (by compiler)
- **Dynamic** multiple issue: functional units are scheduled at run-time (by CPU)

Put simply, superscalar processes have more execution units to execute several instructions at the same time.

> [!info] *Pacheco* Chapter 2.2.5

This is also a method to achieve [[Instruction Level Parallelism]]: Whereas [[Pipelining]] improves performance by breaking down instructions into functional units and connecting them in sequence, **multiple issue** replicates functional unit (execution units) and try to simultaneously execute different instructions in a program

![[Third generation core.png|500]]

In super scalar systems, there are multiple execution units. The instruction stage will know which execution part will handle each instruction, and makes sure dependencies are satisfied (avoid incorrect execution order)

For multiple issue to work, the system needs to find instruction that can be *executed simultaneously*, whether by the compiler (static) or the processor (dynamic). This is done through **[[Speculative Execution|speculation]]**, where the compiler/processor takes a guess about an instruction.

> [!important] [[Speculative Execution]] Makes Superscalar Effective
> *Technically speaking*, speculative execution is **not needed** for superscalar to work correctly. Superscalar means **executing** several instruction at the same time. However, speculative execution (i.e. branch prediction) makes superscalar more effective if there are more conditional branches.

> [!Question] Modifications to Pipelining Stages
> **Q:** What modifications do we have to make for the [[Pipelining|fetch, decode, issue, and commit]] phases to get the best performance from superscalar?
> 
> Fetch Phase:
> - Must be able to fetch several instructions at the same time
> - In case of condition branch, fetch phase tries to make [[Speculative Execution#Branch Prediction|branch prediction]]
>
> Decode Phase: Must be able to decode several instructions at the same time
>
> Issue Phase:
> - Must be able to check instructions coming from the decoding phase to see which ones are independent from each other, and issue them in parallel whenever there are enough idle execution units
> - Must check for [[Speculative Execution#Branch Prediction|check for the outcome of a conditional branch]]. If prediction (done in fetch phase) is correct, do nothing. If it is not, has to initiate fetch and decode instructions from correct path and discard instructions from the wrong path
> 
> Commit Phase: Must ensure instructions' results are written in-order.
