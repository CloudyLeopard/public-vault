
The MPI Standard allows [[MPI Point-to-point#`MPI_Send`|MPI_Send]] to behave in two different ways:
- it can simply copy the message into an MPI managed buffer and return
> it means it can be nonblocking
- or it can block until the matching call to `MPI_Recv` starts

Many implementations of MPI set a threshold at which the system switches from buffering to blocking
- relatively small messages will be buffered by MPI_Send (by the run time, which means i am nonblocking)
- larger messages will cause it to block

If the `MPI_Send` executed by each process blocks, no process will be able to start executing a call to `MPI_Recv` and the program will be hung or **deadlock**

Each process is blocked waiting for an event that will never happen

> [!example]
> See [[MPI Example Programs#Parallel Odd-even transposition sort|Odd Even Transposition Sort]]
> 
> In the "Send my keys" and "Receive my keys" line: me and my partner will send and receive from each.
> if `MPI_Send` blocks, then i will be blocked while sending, and you will be blocked while sending. 
> But now we are both blocked while sending, and none of us will reach receive
> If MPI Implementation is nonblocking with send, this will work. if it is blocking, the pseudocode will work. You are under the mercy of the version of MPI we are running under the machine!

A program that relies on MPI provided by buffering is said to be **unsafe**. Such a program may run without problems for various sets of input, but it may hang or crash with other sets.

> [!important] Your code must *not* be unsafe
> unsafe: it may work sometimes, crash other times
>
> there are no such thing as a 'small bug'. Users nor computers don't care if the bug happens because you forgot to init a variable... In fact, small and trivial bugs are one of the main reason that put millions of ppl out of electricity a few years ago --> there are huge consequences.

Solution:
- one partner sends first then receives
- the other partner receives first then send

this solves the problem for what we have seen so far. But, is there a general way for finding out if our code is safe or unsafe? in case we found it unsafe, how do we make it safe?

## `MPI_Ssend`

The extra `S` means synchronous, and synchronous means blocking. the arguments of the MPI Ssend is exactly same as MPISend, but MPI Ssend is always blocking

MPI_Ssend is guaranteed to block until the matching receive starts.

How can this guarantee program is safe?
- Replace all MPI_Send calls in your code with MPI_SSend
- If your program does not hang or crash -> the original program is safe, and you can go back to MPI_Send. 

## `MPI_Send_recv`

### Vanilla Solution: Restructuring Communication

**Scheduling communication ourselves**

What if when you replace and you find you have problem? (Find that our program is unsafe)?

--> The problem occurs because all processes send then all of them receive.
Instead of each process send, then receive, let's make it so that processes with even ranks will send then receive, and processes with odd ranks will receive then send:

![[reordering mpi_send to avoid deadlock (unsafe).png]]

Always be careful about communication causing deadlock.

**Efficiency problem**: what if i want process x to send first then receive because there is no contention in path from x to x+1, but there is problem with others. this depends on underlying interconnect and which one has contention.
- As a programmer, we cannot see this, and we make do with what we have.

BUT, MPI gives us something we can work with:

### `MPI_Sendrecv`

You do not decide who sends first then receive, you delegate this to the MPI Runtime

An alternative to scheduling the communications ourselves

Carries out a **blocking send and a receive in a single call**

Especially useful because MPI schedules the communications so that the progarm won't hang or crash

> Because MPI schedules the communication, MPI runtime knows what type of interconnect is there among different nodes, which one has contention, etc. it will guarantee performance and guarantee no hanging or crash. it is by definition a non-blocking call

use this when: replace all pairs of consecutive send and receive calls. 

> Use this when there is mutual send and receive - when two processes needs to exchange data among themselves.

The argument for the send and receive is the union of [[MPI Point-to-point|MPI_send and MPI_Recv]]

```C
int MPI_Sendrecv(
    void*        send_buf_p      /* in  */,
    int          send_buf_size   /* in  */,
    MPI_Datatype send_buf_type   /* in  */,
    int          dest            /* in  */,
    int          send_tag        /* in  */,
    void*        recv_buf_p      /* out */,
    int          recv_buf_size   /* in  */,
    MPI_Datatype recv_buf_type   /* in  */,
    int          source          /* in  */,
    int          recv_tag        /* in  */,
    MPI_Comm     communicator    /* in  */,
    MPI_Status*  status_p        /* in  */);
```

Note: there are two tags now, one for sending and one for receiving.

One small modification to `MPI_Send` and `MPI_Recv` - process needs two buffers. One that contains data to be sent, the other is a pointer to where it will be receiving.

## `MPI_Sendrecv_replace`

Following from the `MPI_Sendrecv`... What if you want to save some of the storage and only use one buffer?

MPI will ensure correctness - the buffer will not be overwritten before all the data is sent. This is also blocking.
In this case, what is in `buf_p` will be sent and replaced by what is received.

```C
int MPI_Sendrecv_replace(
    void       *buf_p,         /* in/out */,
    int         buf_size,      /* in     */,
    MPI_Datatype buf_type,     /* in     */,
    int         dest,          /* in     */,
    int         send_tag,      /* in     */,
    int         recv_tag,      /* in     */,
    MPI_Comm    communicator,  /* in     */,
    MPI_Status *status_p       /* in     */);
```

> Q: can `MPI_Sendrecv_replace` in the [[MPI Example Programs#Parallel Odd-even transposition sort|odd-even transposition sort]] when two processes are exchanging list?
> A: You *cannot*. Now, i am sending you my sorted list, you are sending to your sorted list. I am not replacing my list with yours! If i have high rank, i keep highest 4 elements, if i am low rank, I keep the lowest 4 elements. *after the send and receive, i need both lists for some time and work on it before i can delete the list*

