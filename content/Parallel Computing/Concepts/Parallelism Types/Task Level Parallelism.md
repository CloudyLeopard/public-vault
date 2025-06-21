[[Parallelism]] among tasks/threads/processes. Code is doing different things independently.

> [!info] The first two parts of our course will be task level parallelism

![[task-level parallelism.png]]

At programming time, you already know what are the tasks and how big they are and know that they are totally independent.

This is also called **embarrassingly parallel** because you are giving the processes tasks that are totally parallel (no dependencies at all). There are no delays to the hardware.

> its so independent and parallelizable its embarrassing to them

#### Task Level
- Break application into tasks, decided offline (a priori - at programming time)
- Generally, this scheme *does not have strong **scalability***

> The number of tasks is fixed. Even if we get more cores, we cannot split tasks into more tasks.

#### Example
![[task-level parallelism example.png]]

Note, however, we will not get exactly a 3x speedup. This is because in the parallel version, we get 3 loops (instead of 1 loop in the sequential version). The extra “loop” computation takes time.
