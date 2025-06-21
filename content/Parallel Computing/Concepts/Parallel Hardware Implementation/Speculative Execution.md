---
aliases:
  - branch prediction
---


A key step to make use of [[Superscalar|multiple issue]]: compiler or processor makes a guess about an instruction, and executes instruction on the basis of the guess.

In a superscalar system, this allows for introductions to execute **out-of-order** to make best use of superscalar capability.

Examples:
```
z = x+y;
if (z > 0):
	w = x;
else:
	w = y;
```
System might predict outcome of `z=x+y` and give `z` a positive value, so execute `w=x`.

```
z = x + y;
w = *a_p // a_p is a pointer
```
System might predict `a_p` does not refer to `z` (there are no dependency issue!) and simultaneously execute the two assignments

## Incorrect Prediction

Speculative execution must allow for the possibility that the predicted behavior is incorrect. In the first example, we will need to go back and execute the assignment `w = y` if the assignment `z = x + y` results in a value that’s not positive. In the second example, if `a_p` does point to `z`, we’ll need to re-execute the assignment `w = *a_p`.

> [!Quote]- *Pacheco* 2.2.5: How is "Testing" for Prediction Correctness Done?
> If the compiler does the speculation, it will usually insert code that tests whether the speculation was correct, and, if not, takes corrective action. If the hardware does the speculation, the processor usually stores the result(s) of the speculative execution in a buffer. When it’s known that the speculation was correct, the contents of the buffer are transferred to registers or memory. If the speculation was incorrect, the contents of the buffer are discarded, and the instruction is re-executed.
> While dynamic multiple issue systems can execute instructions out of order, in current generation systems the instructions are still loaded in order, and the results of the instructions are also committed in order. That is, the results of instructions are written to registers and memory in the program-specified order.
> Optimizing compilers, on the other hand, can reorder instructions. This, as we’ll
see later, can have important consequences for shared-memory programming.
## Branch Prediction
If there is a conditional if-else, where do I jump? If I jump, will this make the performance go down?

**Branch prediction**: an additional piece of hardware which has an algorithm that predicts if the condition is true or false. This is *also* under NDA (i.e. company doesn't tell you their specific implementation)

In a [[Pipelining|pipeline]], this is done in the **fetch phase**

How does this work?
- The first time it encounters a branch it does not make any prediction. Just see and wait.
- if you see this branch a second time (which happens, due to for loops, etc.). Then you see a program - if you see a pattern like True True False False, then maybe the next is True (pairs)

> [!info] Random Knowledge
> This was a hot topic back then - there were branch prediction championships

**Vulnerabilities**
When you make a prediction, you won't know if the prediction is correct or not
- if it is correct its ok
- But if it is not correct, you have to erase a lot and restart. This causes performance loss

In a [[Pipelining|pipeline]], the **issue phase** checks for outcome of a conditional branch. If the prediction is correct, do nothing. If it is not correct, need to initiate fetch and decode instructions from correct path, and discard instruction from wrong path.

This is why machine-learning branch prediction doesn't work, since even if it is very accurate, it is slow and power hungry - might as well have a lower accuracy but faster
- e.g. prediction in one cycle, and if you have a 4GHtz machine thats just 25 nanoseconds

Note: now all the cores have branch predictions