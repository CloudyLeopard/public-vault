Every [[Process (PL)|process]] inside [[MPI]] has a unique ID called a **rank**

- Identify processes by non-negative integer **ranks**
- Each process has a unique rank
- `p` processes are numbered 0, 1, 2, ...., p-1

> [!note] Processes Use the Same Code but Do Different Things
> If all the processes do the same thing, it is redundant. 
> However, all processes (at least in MPI) have the same code, but does different things. So, we need things like:
> ```
> if (rank = 0)
> 	do this
> elif (rank = 1)
> 	do this
> else
>	...
> ```
> Rank pinpoints different processes to make them do different things.
