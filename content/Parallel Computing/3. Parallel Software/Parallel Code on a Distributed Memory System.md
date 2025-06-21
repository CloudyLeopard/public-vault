First, see [[Distributed Memory System]] for review of the system

Here, each core runs its own process, and there is no shared memory. Since the processes are not sharing anything, there are no **critical sections** and no need for **locks** (unlike [[Parallel Code on a Shared Memory System|for a shared memory system]])

## Message Passing

Suppose we have two processes, each running the following code:
```C
char message[100];
...
my_rank = Get_rank();
if (my_rank == 1) {
	sprintf(message, "Greetings from process 1");
	Send(message, MSG_CHAR, 100, 0); // send a msg of 100 char to process 0
} else if (my_rank == 0) {
	Receive(message, MSG_CHAR, 100, 1);
	printf("Process 0 > Received: %s\n", message);
}
```

Notice the processes are not sharing anything. Each process has its own `message`
1. There are 2 `message`: each has their own
2. When process 1 writes to `message`, process 0's `message` is unchanged. After receiving it, process 0's `message` will have the string from process 1.