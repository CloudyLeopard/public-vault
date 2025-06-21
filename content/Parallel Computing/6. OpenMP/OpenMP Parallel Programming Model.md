
I guess related to [[Parallel Code on a Shared Memory System]]

Writing Parallel code for [[OpenMP]]

1. Start with a *parallelizable* algorithm
	- loop level parallelism is necessary
> if you are trying to solve a problem with OpenMP, think of algorithms that have for loops that are independent. the openmp compiler will not check for correctness. It will blindly parallelize for loop even if it is wrong. 

> [!important] Rule of Thumb
> A sign of a good parallel program is that when problem size gets bigger, you can (its better to) increase the number of threads, but not increase the number of work per thread.

2. Implement serially
> start with serial stuff. this is so that after step 3, we eliminate all bugs from the sequential version

3. Test and Debug

4. Annotate the code with parallelization (and synchronization) directives
	- Hope for linear speedup

5. Test and Debug
> Test for performance and debug parallel bugs. E.g. we removed a `no wait` but is now wrong.

Test and debug first with one thread: remember that one thread will be little but slower than purely sequential. One thread has a few more lines on using openmp library.

When we reach step 5, test with one thread first. If it is correct, move to two threads only. Then, 3 and 4 threads. If after 4 threads everything is ok for correctness, then go back to 2 threads and start optimizing the code for speedup.

Of course, your whole progam may have some part that can be parallelized with 3 threads then sequential then another part w 4 threads and again. so it depends on how youa re designing your code

**OpenMP uses the fork-join model of parallel execution**
![[openmp programming thread flow.png]]

When you start your openmp program, it will start with one single thread: a **master thread** with `ID=0`. Then, the master thread will **fork** then creates a team of parallel threads. Once we are outside of the `pragma omp parallel` structured piece of code, we are back to initial thread with ID=0. **join**

**Forking** and **join**

### Programming Model - Threading
Basically the above diagram but in code

![[parallel threading flow code.png]]
