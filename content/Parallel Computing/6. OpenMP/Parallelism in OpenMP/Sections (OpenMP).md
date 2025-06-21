**Section**: used for when you have different pieces of code that needs to be accessed in parallel

Relevant to [[Dividing Work Among Threads (OpenMP)#Type 2 Threads Run Different Code in Parallel]]

```C
#pragma omp parallel
#pragma omp sections
{
	#pragma omp section
		// structured_block
	#pragma omp section
		// structured_block
}
```
This means one thread will execute the first section, another thread will execute the section section, etc.

![[openmp sections example.png]]

Start with master thread, the code in `section` will be executed in parallel until the end of `sections`.

Q: What if, between `sections` and `parellel` we have a function `f1`? How many threads will be executing `f1`?
A: `f1` will be executed by all the threads
Q: what if `f1` is outside of `parallel`?
A: `f1` will be executed by only the master thread, we are back to purely sequential code.

`section` is useful when you don't have a for loop but you have different piece of code you want to execute in parallel. But there is a catch: *you must know how many sections at programming time.*

> [!Question]
> Q: Can you think of a scenario where the number of sections is not known at programming time?
> A: suppose i have a linkedlist, a i want to increment every element's value by 1. we do not know how many elements there are, but obviously a task like this is very parallelizable. we do not know how many elements, so for loop or sections do not work!
