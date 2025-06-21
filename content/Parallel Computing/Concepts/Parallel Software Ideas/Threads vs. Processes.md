process consists of one or more threads
each thread has its own stack
each process has its own (virtual) memory
## Choosing Threads Or Processes

Comparing [[Threading|threads]] and [[Process (PL)|processes]]. This is part of the decision making process [[PCAM]] on [[Writing Parallel Programs]] - should we use threads or processes to map the tasks?

| Threads                                  | Processes                       |
| ---------------------------------------- | ------------------------------- |
| Smaller Sized Tasks                      | Bigger tasks                    |
| Larger amount of communication           | Smaller amount of communication |
| Tasks that have the same characteristics | Totally different type of tasks |

> [!info] Task Sizes
> Threads benefit from smaller sized tasks because it is much cheaper to create threads than processes (i.e. if we have lots of small tasks, compared to a few number of big tasks, use threads)

> [!info] Communication
> Use threads when we have heavier [[Communication (Constraint)|communication]] among the task. Communication among processes is slow.

> [!info] Type of Task
> Use [[Process (PL)|processes]] when there are lots of different type of tasks. For example, if a task requires a lot of recursion, nested calls, and hence require a larger stack, dynamic allocation, etc. -> this requires very different memory map. As such, it is better that each task have its own virtual memory address space, and so processes will be better than threads.

**Important**: The **number** of tasks is **not enough of a factor** to tell us processes or threads. It is the size, communication, and type of tasks.

