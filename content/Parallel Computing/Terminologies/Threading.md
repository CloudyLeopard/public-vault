---
aliases:
  - thread
  - threads
---

> [!info] *Pacheco* 2.1.2

**Threading**: threads are **contained within [[Process (PL)|processes]]**. The part of the code being executed
- allow programmers to divide their programs into (more or less) independent **tasks**
- The hope is that when one thread blocks because it is waiting on a resource (e.g. memory, from internet), another thread will have work to do and can run

Creating threads is time consuming - it requires [[Introducing... Operating Systems!|operating system]] calls (every thread needs it sown stack and other things). 

## Threads

![[thread memory layout.png|200]]

Text = the code

Data = global variables and static variables

Heap = where you do dynamic allocation (`malloc` in C, `new` in C++)

Stack = memory area. Contains the following:
- Nested function calls

> When a function calls another function, we put stack frame on top of the stack that contains information for that function. This allow us to return to the function that called us. 
> Ex: When f1 calls f2 calls f3, you are returning from f3 to f2 to f1. 
> Last in First out, so stack

- Local variables

> this is how semantic of the language is imposed. You know local variables are only accessed in the function. If there is an x in f1, and f1 calls f2, inside f2 cannot access x. But when you return back to f1 when f2 is done, you can access x. x has to reside somewhere until you are back inside f1 (it is in the stack)


> [!Info] Stack and Heap Growth Toward Each Other
> stack grows towards the 0 address, heap go towards higher address.
> 
> Note: This is **language independent**; The difference between the languages will be only the order of the stuff in the stack frame
> 
> > Q: Why do they have stack and heap go towards each other?
>> A: Once the program is starting, we know exactly the size of the text, data+bss, but we do not know the size of the heap and the size of the stack (we do not know what dynamic allocation the program will do, we do not know how many nested function calls we will do). in order to not lose any memory, the best way to put two unknown entities is to put them grow toward each other.


> [!Important] Every Thread Has Its Own Stack
> **Reason**: in multi-threaded programs, the threaded programs will not always execute the same code.
> - threads may be calling on different functions, etc.
>
> As such, threads need their own stacks - the stack will be the functions you call
> - E.g. Thread 0 calls f3, which calls f5; Thread 1 calls f1, which calls f5
>- these are totally different things, so needs different stacks.
>
> There is no way that two threads can use the same stack regardless if one depends on the other or not. Every thread is executing different code with different data.

Similarly, every [[Distributed Memory System|every process needs its own memory]]

---

[[Threads vs. Processes]]
- process consists of one or more threads
- each thread has its own stack

The picture that we see above is the memory map of *one process*. if it has only one stack, it is single threaded. if it has more than one thread, its multi threaded. if we have two processes we will have two pictures.

Once created a thread can be in one of 4 states: ready, running, waiting (blocked), or terminated.

### Multithreaded Programs
Using established APIs at the application program. 
- Example: pthreads, OpenMP

OpenMP
- Developer-friendly
- required compiler supporting OpenMP API
PThreads
- More lower-level

> previously, people who wanted to have really high performance will write in pthread. Pthread is not easy to write with. OpenMP has evolved a lot such that it can compete pthread, and it is much more user friendly

Higher-level languages exist, but they tend to sacrifice performance to make program-development easier.
- Example: Haskell


