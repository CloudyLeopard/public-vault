
Its hard cuz you have sequential programming bugs AND more

> when you write multithreads or something, this is why you always first test you thread with just one core. Need to make sure you're code is correct and see whether the result is correct. If not, you have something wrong related to the sequential code. after you are done with this, at least you are sure you have no bugs with sequential programming

Hard to find: bugs are non repeatable (cuz race condition)
Even harder to resolve
major reason for bugs: **[[Race Condition]]**. sometimes it will crash sometimes it will work correctly.

### How to Avoid Race Conditions:
**[[Critical Section]]**: a part of the code that is modifying some shared data (*shared memory*), and you want at most one thread to be there at a time. If two threads are there at the same time your code may be wrong

Prohibit more than one thread from reading and writing the shared data at the same time --> **[[Mutual Exclusion]]**

![[Screenshot 2025-02-24 at 10.12.33 PM.png]]
suppose red = critical section, grey = parallel part.
P=1 is purely sequential
with P=2 or above, you can parallelize grey part, but notice that *you cannot parallelize the red part*. The dotted part is waiting for critical section, and this is because you are waiting until yo ucan execute the critical section
- which critical section gets executed first doesn't really follow any particular order, and this is a **[[Race Condition]]** (thread #4 may run first then #3 etc.)

> [[OpenMP]] is for [[Shared Memory System|shared memory]] thing. This means you can have one program that is cut into threads, and those threads are executed i paralle.
