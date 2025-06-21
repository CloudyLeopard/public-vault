---
aliases:
  - point-to-point
---

Communication using [[MPI]] between [[Process (PL)|processes]] using `MPI_Send` and `MPI_Recv`. These are also considered point-to-point communication

Unlike [[MPI Collective]] functions, Point to point communications are matched on the basis of [[MPI Point-to-point|tags]] and [[MPI Communicator|communicators]].

## `MPI_Send`

API to send a message to another process.
- **Whenever there is an `MPI_Send`, you must have an [[MPI#Communication#`MPI_Recv`|MPI_Recv]]**
- Message sent by a process using one communicator **cannot be received by a process in another communicator**.

```C
int MPI_Send(
	void* msg_buf_p // int, pointer to beginning of memory im sending
	int msg_size // in, num of elements in msg_buf
	MPI_Datatype msg_type // in, type of each element in msg_buf
	int dest // in, rank of the receiving process
	int tag // in, to distinguish the messages
	MPI_Comm communicator // in
)
```

NOTES:
- `msg_buf_p`: the pointer tells the MPI [[Runtime]] where to start looking for the message to be sent to the destination
- `msg_size`: This is **not** the size, but **number of elements** to send. Sometimes, you'll see a extra `+1` for strings to account for ending \null.
- `msg_type`: tells MPI runtime size of each element (float, int, etc.). This is done by passing in an [[MPI_Datatype]]
- `tag`: suppose I send two messages (make two `MPI_Send` calls) from process 1 to process 2. *There is a chance they may be receive out of ordered.*. The receiving end knows which is which by using the tag, which is a positive number (e.g. 0, 1)
- `communicator`: the name of the communicator. Only processes in the same communicator can talk to each other (e.g. `MPI_COMM_WORLD`)

> [!info] Why do strings end with \null?
> If you look at something like `printf` in C, `f` means `formatting`. There is `%s`, which means a string. If you give `%s` a pointer to a string, `printf` really just says "start printing from the string the character starting from this address". But, you didn't give an end! if the string doesn't give a null, the `printf` will just keep printing without stopping. 
> in contrast, cannot do the same with array: if you want to print out an array of int, you loop through the ints for some number of elements to print.

> [!important] Blocking? Implementation Dependent
> Unlike `MPI_Recv`, there is no industry standard on if `MPI_Send` needs to block. So, it depends on implementation.

## `MPI_Recv`

Receive the messages sent by `MPI_Send`

```C
int MPI_Recv(
	void * msg_buff_p // out
	int buf_size // in
	MPI_Datatype buf_type // in
	int source // in
	int tag // in
	MPI_Comm communicator // in
	MPI_Status* status_p // out
)
```

The parameters are generally the same as those in `MPI_Send` - for more specific information, see above. See below picture on how they match:

![[MPI Message Matching.png|500]]

> [!important] `MPI_Recv` is **blocking**
> Whenever a process runs `MPI_Recv`, it will block. If the process runs an `MPI_Recv` *without a corresponding* `MPI_Send`, it will be blocked forever (deadlock).
>
> On the other hand, if it returns, we are sure the message has been received.
>
> >[!info] Industry Standard
> > Different companies have different MPI implementations, but all follow the same industry standard. The standard says `MPI_Recv` must be blocking. But, it doesn't say anything about `MPI_Send`.

Going back to the [[MPI#Example MPI Program|example]] above.
```C
MPI_Recv(greeting, MAX_STRING, MPI_CHAR, q, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE)
```
- `MAX_STRING` is the max num of elements received. Its ok if the message is shorter than `MAX_STRING` num elements, but not ok if message is longer.
- `MPI_Recv` will be blocking until I received the message from process `q`
- These processes are from `MPI_COMM_WORLD`
- I don't care about the status, so `MPI_STATUS_IGNORE`

### `MPI_Recv` Wild Cards

Wild card helps `MPI_Recv` receive things without being strictly in order. 

However, the problem is a receiver can get a message without knowing:
- the amount of data in the message
- the sender of the message (you are using `MPI_ANY_SOURCE`)
- the tag of the message (you are using `MPI_ANY_TAG`)
these could be important.
#### `MPI_ANY_SOURCE`

Message from any source can arrive out of order.

**Scenario:** What if Process 2's Message Arrives before Process 1?

The [[MPI#Example MPI Program|example]] above uses the for loop to make sure that the process receives the messages in order.

> [!note] [[Runtime]] buffers the message
> This works because the MPI system [[Runtime]] will buffer the message, and give it to you once you call `MPI_Receive` for that process.

But, you may not want to receive messages strictly in order - it is not efficient for calculations. Want to start working as soon as process receives data.

Solution: use `MPI_ANY_SOURCE` for `source` argument:

```C
MPI_Recv(result, result_sz, result_type,
	MPI_ANY_SOURCE, // this
	0, MPI_COMM_WORLD, MPI_STATUS_IGNORE)
```

#### `MPI_ANY_TAG`

Message with any tag can arrive out of order

**Scenario**: What if process 1 sends to process 0 several messages but they arrive out of order. 
- Process 0 is waiting for a message with tag = 0 but tag = 1 message arrives instead!

Solution: use `MPI_ANY_TAG` for `tag` argument:

```C
MPI_Recv(result, result_sz, result_type, q,
	MPI_ANY_TAG, // this
	MPI_COMM_WORLD, MPI_STATUS_IGNORE)
```


### `status` Argument in `MPI_Recv`

```C
MPI_Recv(recv_buf_p, recv_buf_sz, recv_type, src, recv_tag, 
	recv_comm,
	&status // this
);
```
The status argument is a pointer, which points to an `MPI_Status` struct, which has the following properties:
- `MPI_SOURCE
- `MPI_TAG`
- `MPI_ERROR`

In other words, you can access the attributes inside the struct with commands like: `status.MPI_SOURCE` or `status.MPI_TAG`

**Then, use `status` to find how much data you are receiving:**
```C
MPI_Get_count(
	MPI_Status* status_p // in
	MPI_Datatype type // in
	int* count_p // out
)
```
