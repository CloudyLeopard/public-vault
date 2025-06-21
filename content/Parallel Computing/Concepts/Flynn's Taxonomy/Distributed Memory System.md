Collection (**cluster**) of **nodes**
- Nodes are connected by an **interconnection network**
![[distributed memory system 1.png]]

Every node can have one CPU (or multicore) and one memory.
For simplicity, in the picture above, each node has 1 CPU and 1 memory, and are interconnected *somehow*. Here, you can have [[Process (PL)|Processes]] running on different nodes and communicate with each other
- They **cannot** communicate by memory (they have different memories)
- They **communicate** by **sending messages**

[[MPI]] is for distributed memory system, and is the first language we will learn. It is used to send messages between nodes.


> [!Example] Analogy to Understand Distributed Memory System
> lets say you open one cabinet from these big supercomputers, and find some motherboards. Each motherboard is like your laptop with its own memory.
> If you put a piece of code in one board and another piece of code on another board, each one cannot access the memory of the other. 
> So there is no program running on a board that can access the memory of another board. 
> this means the memory is distributed - it’s not shared among anybody. thus, every process needs its own memory.


> [!important] Communication Cost
> Communication is more expensive than computation; as a result, distributing a fixed amount of data among several messages is more expensive than sending a single big message
> 
> Example: sending one message of 100 bytes is much cheaper (less time) than sending 10 messages of 10 bytes each
> - Reason 1: all communications are OS calls, and OS calls are expensive
> - Reason 2: When [[MPI]] system sends message from one point to another, its not just adding one message, but also sending header and footer to be routed correctly; all of this is over head, and gets multiplied when we send multiple messages
