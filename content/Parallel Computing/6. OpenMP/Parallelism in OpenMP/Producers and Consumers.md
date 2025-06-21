**Producers**: they produce some data
**Consumers**: they consuming/use the data to work on it.

A [[Threading|thread]] can be a producer and a consumer at the same time:
- it can produce work for another thread, and consume work from another thread
- Think of a pile of threads, each one is producing work to be processed by other threads, and consuming work produced by other threads.

## Queues

A data structure to use in many multithreaded applications 

The two main operations for a queue:
- **enqueue**: put element into the tail of the queue
- **dequeue**: get and remove element from head of the queue

For example, suppose we have several **producer** threads and several **consumer** threads
- producer threads might "produce" requests for data
- consumer threads might "consume" the request by finding or generating the requested ata

## Example: Message Passing

each thread could have a **shared message queue**, and when one thread wants to "send a message" to another thread, it could enqueue the message in the destination thread's queue

A thread could receive a message by dequing at the message at the head of its message queue

A thread can be both a producer for another thread, and consumer for another thread.

The most natural way to implement this by using a **queue**. We `enqueue` - put something inside the queue at the tail, and `dequeue` - remove something from the queue at the head.

**Important**:
- All the queues can be accessed by **all the threads**. Specifically, any thread can `enqueue` work to any threads' queue
- **only the owner of the queue can `dequeue`**. 

![[openmp queue message threading.png]]

### Pseudocode

Each thread will do the following:
```C
for (sent_msgs = 0; sent_msgs < send_max; sent_msgs++) {
	Send_msg();
	Try_receive();
}

while (!Done())
	Try_receive();
```

This thread will try to `send_max` messages. After that, we have `while(!Done())` because even if you have sent all your messages, what if some other threads is still trying to send you messages? you have to receive them.

#### `Send_msg()` Pseudocode
Suppose we send some random message, and we send the message to some random destination (but we do modulus to make sure its less than the total number of threads)

```
mesg = random()
dest = random() % thread_count;
# pragmp omp critical
Enqueue(queue, dest, my_rank, mesg);
```

`Enqueue` is a pseudocode, not actual C code. We need to send the message, my thread's rank, and destination thread's rank, to the enqueue.

Q: `#pragma omp critical`: why is enqueueing to the queue of another thread considered a critical section (see [[omp critical]])?
A: What if several other threads decide to `enqueue` to the same queue? E.g. five threads decide to send messages to thread 4. Usually you have to increase the tail and put your message. That means several threads are trying to increase the tail -> critical section. 

Q: why `critical` and not `atomic` ([[omp atomic]]). even though critical section is just one statement?
A: This is a function call statement, not one of the acceptable forms for the atomic directive

#### `Try_receive()` Pseudocode

```
if (queue_size == 0) return;
else if (queue_size == 1)
	# pragma omp critical
	Dequeue (queue, &src, &mesg);
else:
	Dequeue(queue, &src, &mesg);
Print_message(src, mesg);
```

In both else if, and else, we are dequeuing something from the head of the queue. Yet, when queue has a size of element 1, dequeuing is a [[Critical Section]]. But if the dequeue has a size of more than 1 element, it is *not* a critical section.

Reason:
- First, to keep the case simple, each time you call `Try_receive` you are dequeuing one element at a time. Especially, there will be no more than one thread `dequeuing` that thread at any time - because only the owner thread can dequeue the thread.
- Under the hood in queue, a queue has a head that points to first element, and a tail that points to last element. When you dequeue you are decreasing head and removing that element. when you are enqueuing you are increasing head and adding element. when you have one element, both head and tail is pointing to one element. while you are `dequeuing`, what if another thread is trying to enqueue? both you and another thread will try to access the tail (the same element). This makes the tail the critical section.
- But if you have more than one element, this won't happen.

**When queue size is 1, dequeue affects the tail pointer**

Random point; the word `critical` means that no two threads will be access that element at any time.

#### Termination Detection

Specifically, this refers to the `Done()`
```
while (!Done())
```
from above

```
queue_size = enqueued - dequeued;
if (queue_size == 0 && done_sending == thread_count)
	return TRUE;
else
	return FALSE
```
**each thread increments `done_sending` after completing its for loop**

every thread keeps two numbers:
- `enqueued`: how many have been enqueued
- `dequeued`: how many have been dequeued
- shared variable called `done_sending`: whenever a thread has finished sending stuff in their for loop (see pseudocode above), it will increment `done_sending`. In other words, if that has incremented, that means a thread has finished.

## Startup

### Allocating the Queues

> [!info] Ways Dynamically Allocate 2D Arrays
> In [[Introducing... Operating Systems!|201]], we learned dynamic allocation: i.e. dynamically allocate array of like 10 ints. 
> 
> Q: Harder question: how to dynamically allocated a 2d array?
> A: Option 1: allocate an array of 10 **pointers** to int. for each pointer, we malloc 10 int
> A: Option 2: we can allocate 1 big array of 10x10, but then access it like 2d array
>
> We choose option 1 (better parallelism; each thread can allocate its own queue)

Here, we have some number of thread, each one has its own queue. 

When the program begins execution, a single thread, the master thread, will get command line arguments and allocate an **array of message queues**: one for each thread.

> the thread will allocate an array of message queues

This array needs to be **shared among the threads** - that is the job of the master thread

After that, each thread allocates its queue in the array

Essentially, **each master thread mallocs like some number of pointers, and then each thread does its own allocation for each pointer**... (i think)

### Synchronization Post Allocation

One or more threads may finish allocating their queues before some other threads

> `malloc` is a sequential function. if 10 threads from openmp all call `malloc`, `malloc` will be serialized: how can 10 threads access the same heap at the same time?

> that is why there are better libraries that is better than `malloc`, that can access heap in parallel

We need an explicit barrier so that when a thread encounters the barrier, it blocks until all the threads in the team have reached the barrier

> A [[Synchronization]] point: we need to make sure all the threads have finished allocating queues, before we start producing and sending tasks.

See [[omp barrier]]
```C
# pragma omp barrier
```

## Critical Section Problem

How can we let threads **enqueue** and **dequeue** into other threads in parallel, since they are all critical sections (even if they are both different?)

For example, when thread 5 enqueues into thread 0, and thread 6 needs to enqueue into element into thread 1. These are **totally different queues**. But, by default (see [[omp critical]]), since they are both critical sections (despite being **different** ones), OMP only allows one thread to enqueue one queue at any time.

### Solution 1: Give Critical Sections Name

A new advancement in critical section is to give critical section names (see [[omp critical]])

Doesn't help us... we have to give critical names at **programming time**. But, we do not know the number of threads at programming time.

## Solution 2: Locks

See [[Locks (OpenMP)]]

For enqueue, instead of
```C
# pragma omp critical
/* q_p = msg_queues[dest] */
Enqueue(q_p, my_rank, mesg);
```
We have:
```C
/* q_p = msg_queues[dest] */
omp_set_lock(&q_p->lock);
Enqueue(q_p, my_rank, mesg);
omp_unset_lock(&q_p->lock);
```

For dequeue, instead of
```C
# pragma omp critical
/* q_p = msg_queues[my_rank] */
Dequeue(q_p, my_rank, mesg);
```
We have:
```C
/* q_p = msg_queues[dest] */
omp_set_lock(&q_p->lock);
Dequeue(q_p, &src, &mesg);
omp_unset_lock(&q_p->lock);
```

