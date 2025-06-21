Atomic operation makes sure either all of it is run, or none of it. However, **this worsens performance.** Again sacrificing performance for correctness (fix [[Nondeterminism]])

Most operations are *not* atomic. An example is `x += my_val` (there are read, write, and store operations in this line). It could be that one thread needs to add `1`, another thread adds `2`, but *both threads need to execute `x+=...`*. 
1. `x` (with init value of `0`) will first move to register in core 1, and also be `0` in core 2. 
2. Execution unit will add `1` to `x` in thread 1, making `x=1`.
3. Then, the thread 2 will do `x+=2`, making `x=2`.
4. The first core will then right `x` back, making `x=1` in the memory.
5. Then, the second core will write `x` back, making `x=2` and overwriting the first core's result. The ending result is wrong (it should have been `x=3)

