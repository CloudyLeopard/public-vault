 **Critical Section**: a piece of code where you don't want more than one thread to be at in any point of time
1. **[[Mutual Exclusion]]**: no more than one thread executes critical section at any point in time. Must line up the threads so that they run critical section code one at a time
2. Need to enforce mutual exclusion through locks **(mutex, semaphore, ...)**