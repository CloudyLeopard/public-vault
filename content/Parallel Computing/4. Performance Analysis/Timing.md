There are different type of time

![[execution time division.png]]

**Elapsed Time** (aka **Wall-clock time**, **Response Time**, or **Execution Time**):
- Includes *everything* (execution time, I/O waiting, context switches by OS, disk and memory access, etc.)
- A useful number, but often not good for comparison purposes

> [!note] Wall-Clock Time could be influenced by many factors
> - Influenced by you: your parallel algorithm
 > - Influenced by choice of compiler
> - depends on the compiler switches (eg turning optimization on/off)
> - The operating system: if operating system is very efficient at creating threads/processes, you're gonna get a better $T$
> - the type of filesystem holding the input data
> - The time of the day (different workloads, network traffic, etc.)
> 	- If you access a computer during a time when everyone else is accessing the same computer, your program is going to be slow since the computer will be doing context switches.

**CPU Time**: measures how well cores execute your code. Counter stops counting if code is removed from CPU due to I/O or context switch.
- Doesn't count I/O time or time spent running other programs
- Can be broken up into system time, and user time
	- **User time** (our focus): time taken by CPU to execute your code (i.e. in your program)
	- **System time**: time taken by CPU to execute system call to serve your code

> CPU Time includes not just your code, but also OS time that serves your code. Example: if you create a thread (system call), the OS will execute something, which is counted in CPU time.

## Taking Timings
In Linux (command line `time`):
```bash
time prog
```

Once it is done, it will return three numbers returned:
```bash
real Xs
user Ys
sys Zs
```

- real = Wall clock time
- user = User CPU Time
- sys = System CPU Time

In other words, user + sys ≤ real

We could also use a library in C to measure time of a specific segment of the code:

`clock_t clock(void)` returns the number of clock ticks elapsed since the program started.

```C
#include <time.h> // <-- include this to measure time
#include<stdio.h>

int main() {
	clock_t start, end, total; // <--
	int i;

	start = clock(); // <--

	for (i = 0; i < 10000000; i++) {}

	end = clock(); // <--
	total = (double) (end-start) / CLOCKS_PER_SEC; // cycles/cycles_per_sec

	printf("Total time taken by CPU: %f\n", total)
}
```

Note: `(end-start)` is the total number of cycles. 
Note 2: Divide by `CLOCKS_PER_SEC` to get **CPU Time** (so includes user *and* sys)


