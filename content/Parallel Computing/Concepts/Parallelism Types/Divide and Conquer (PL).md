General idea is similar to [[Divide and Conquer]] algorithms. A pattern for [[Parallelism]].

![[divide and conquer diagram pc.png]]
split split split then merge merge merge

The high level of parallelism will happen **in the middle of the picture**

**Q: When do you stop splitting?**
**A:** Depends on number of cores, and how much work per thread
- Want to give every thread a good amount of [[Work]], which takes trial an error
After you finish and solve the sub-problems in parallel, start merging.

There is some **overhead** here - you are using extra time during split and the merge. Because of this (which are all sequential things), you *will not get 4x speed up* (4 in reference to diagram)

**If the problem size is not big enough, the sequential solution will always be faster than the parallel version**

Some problems are good for divide and conquer.

## Example

Sequential Version
```
// Input A
DnD(A) {
	if (A is a base case)
		return solution(A);
	else {
		split A into N subproblems B[N];
		for (int i = 0; i < N; i++)
			sol[i] = DnD(B[i]);
		return mergeSolution(sol);
	}
}
```

Parallel Version
![[divide and conquer paralle pseudo code.png]]

It is bad to split a small workload task, because creating a task has overhead. 

> [!Question] How do you know if the problem size is big enough to be split?

