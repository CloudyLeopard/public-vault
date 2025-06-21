See [[Mutual Exclusion]]

[[Pragmas|pragma]] directive:

```C
# pragma omp critical
global_result += my_result;
```

The like `critical` tells the program that only **one thread** can execute the following structured block at a time.

> inside, we are executing stuff sequentially


## What about *Different* Critical Sections/

Q: Suppose you have multiple thread reaches different critical section. can you allow both threads to proceed in their corresponding critical sections?
A: The OpenMP runtime will not be able to determine if variables are "related" - like if they refer to the same shared global variable or something. like fi there are two pointers, but they rlly point to the same variable
A: So, OpenMP takes teh conservative section, **only one thread will proceed in one critical section**, even if the critical sections are totally independent. THis is because the openruntime cannot tell if they rae independent

So, later advancement:
```C
# pragma omp critical(name)
```

Now, if you are sure that two critical sections are totally independent from each other, give them different names!

OpenMP provides you the option of adding a name to a critical directive.
When we do this, two blocks protected with critical directives with different names can be executed simultaneously