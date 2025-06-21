
[[Threading|Threads]], create a pool of **tasks**. After the pool creation is finished, every thread grabs a task.

Relevant to [[Dividing Work Among Threads (OpenMP)#Type 2 Threads Run Different Code in Parallel]]

> [!info] Feature added to version 3.0 of OpenMP (we are at around 6 now)

A **task** is an independent unit of work

A thread is assigned to perform a task

Uses the directive [[omp task]]

### Example

```C
# pragma omp parallel
{
	# pragma omp single
	{
		node *p = head_of_list;
		while (p)
		{
			#pragma omp task private(p)
				process(p);
			p = p->next;
		} // end while
	} // end pragma single; thread start executing tasks at this point
} // end pragma parallel; implicit barrier
```

`pragma omp single` ([[omp single]]): the code after will only be executed *once* (by any thread).
- slight variation: `pragma omp master` ([[omp master]]) is only the master thread execute it once (the thread with rank=0)

For every iteration, we create a `task` of `process(p)`.

The whole magic will happen when we get out of the `single` braces, and before the `parallel` braces.

> [!important] Comparison to Sections
> [[Sections (OpenMP)|Sections]] have less overhead (i think), but because there are cases where we do not know the number of sections at programming time, we use tasks.

There is an implicit barrier at the end of `parallel` because If we put extra code after the `single` braces and before the `parallel` braces, there are some threads that can finish before the other threads can.


## Task Synchronization

[[omp barrier]]
```C
# pragma omp barrier
```

Explicitly waits on the completion of **child tasks**
[[omp taskwait]]
```C
# pragma omp taskwait
```

EXAMPLE: Write a program that prints either "A Race Car" or "A Car Race"

### Without Tasks

![[task synchronization pt 1.png]]

There are no threads; this will always print "A Race Car".

Assume we have a two core machine:
![[task synchronization pt 2.png]]

It will print 'A Race Car', 'A Car Race', but also could print "A A race race car car", blah blah. it could be duplicated.

What about:
![[task synchronization pt 3.png]]

It will always print "A Race Car" - exactly the same as the purely sequential code, but now we also have the openmp parallel for `pragma`


### With Tasks

![[task synchronization pt 4.png]]

Create a task that `printf("race")`, but the task is not executed yet.
Create another task that `printf("car")`, but the task is not executed yet.

It will always print "A" first, because its sequential.
After `single` is done, it could print EITHER  "race" or "car" first - task execution ordering is nondeterministic.

What if i want to print "A race car is fun to watch" or "A car race is fun to watch"
![[task synchronization pt 5.png]]
This won't work - this will print "A is fun to watch race car " or "A is fun to watch car race"

Now, we add `taskwait`

![[task synchronization pt 6.png]]

This will create two tasks, and now the line after `taskwait` *will only execute* after the child tasks that i have created has finished executing.

