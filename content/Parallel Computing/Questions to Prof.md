
What type of parallelism (2nd generation) does pipelining solve?
- Temporal? Instruction Level? What's the difference between the two?
- In the notes, it seems like we achieved instruction level parallelism only in the third generation. Why? Third generation only introduced "Branch Prediction" - is it because this sped up efficiency so much?

Temporal Parallelism vs Spatial Parallelism
- What are all the different types of parallelism? Where does temporal and spatial belong to? (instruction level?)

Execution unit vs Functional unit?

What is "superscalar"? Is its definition "execute several instruction at the same time"? Or, doing so dynamically (i.e. CPU decides at run time) and "multiple issue" is "execute several instructions at the same time"

In a superscalar system, at which stage does the CPU predict the instruction? Is it at the "Instruction" stage - after fetching and decoding? Does the instruction stage also make sure that multiple instructions are not dependent on each other?
- follow up: same thing for branch prediction. does it jump from D to E?
- is branch prediction *different* from speculative execution??? because branch prediction require a special hardware

Commit stage - especially in hyperthreading - how does it work?

SIMD vector processors, does `MPI_Reduce` take advantage of this?

==Nonuniform memory access==: is it nonuniform because you have to jump to another processor to access memory, or is it ebcause of memory distance to the memory bank?
- When you say "communication is much faster with neighbors", do you *literally mean cores close to you*, or do you mean this *non-uniform memory access* thing where you have to jump around to get to another core ([[PCAM]])
- "Locality" - same thing, what it means?

> yes, real distance.
> using core as hubs doesnt apply much to chips. it applies like networks or bigger stuff.

In [[Concurrency#Example]], why is it that even with single core concurrency is beneficial?

How does [[MPI Collective#`MPI_MAXLOC` and `MPI_MINLOC`]] work? Does it find the best rank by using the info in the struct, or the process's rank info?

For [[MPI Collective#`MPI_Reduce`|MPI_Reduce]], which process does the reducing? Does it automatically implement a tree-like approach?

With `MPI_Reduce`, does process 0 get added to?

for lab1, can i edit the stuff above the "TODO"
**is tree structured broadcast faster? how? cuz aren't you making more MPI_Send calls?**
> we also said in class this:
> - reducing messages sent is a good performance strategy!
> 	- collective vs point-to-potin
> - distributing a fixed amount of data among several messages is more expensive than sending a single big message

> leave MPI to decide what is the best pattern
> most of the case it is tree like. sometimes it is a skew tree. how it will depend  will decide on if there are some other processes that are programs on the machine and some connection on the interconnect.

> Q: why is tree like structure good?
> A: as programmer, you call lots of mpi send is calling os
> but with MPI_Bcast, its all done in the system. so no os time save.
> the other thing is we can reduce thenumber of messages if we reduce the number of nodes to everybody and ther emay be contention etc.
> we are leaving the MPI to decide.

MPI Runtime - i know its additional code in the os but like why is it called run **time**
> runtime si part of the proces itself - simply speaking, if you have just a c code what is compiled is not just your code but also extra library. also if you have function call there is a stack
> who is managing the stack? extra code added by the compiler to make the language behave in the way you want it oto
> why is it caled runtime? it onnly apperas only in runtime in execution.


coudl MPI_Scatter have different recv-elements than the send elements? what happens?