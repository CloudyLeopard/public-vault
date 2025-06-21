**Concurrency**: At least two tasks are making progress at the same **time frame**.
- Not necessarily at the same time. Maybe during that 1 minute, only one core will work with one task for a while, and work with another task after that.
- Include techniques like time-slicing
- Can be implemented on a single [[Core|processing unit]]
- Concept more general than parallelism (it includes having only one core)

Note that [[Parallelism]] is a **subset** of concurrency.
(All Programs (Concurrent Programs (Parallel Programs)))

We say that a code is concurrent if its pieces are independent (i.e. it does not matter if task 1 goes first, or task 2 goes first).

## Example

Assume:
- task 1 makes request 1, task 2 makes request 2
- The yellow box is a server (single [[Core]])
![[concurrency quick example.png|500]]

Even with single core, concurrency is beneficial.
With multicore, things will be even better: tasks can execute in parallel