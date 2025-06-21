**Repository Model**: a data structure that depends on the application we are parallelizing, and that contains work to be done.

For each [[Threading|thread]], the thread will get piece of work. It will start doing it. Once it is done, the thread write back the result so it can get another piece of work, and so on.

![[repository model.png]]

Analogy: a repository of database of work and threads. The threads keep getting pieces of work to execute them, then puts them back.

This model is good when you have work that keeps coming. 
- You do not have problem size from very beginning (eg matrix multiplication), instead more like web server that has work over time

Related to [[Parallel Code on a Shared Memory System#Managing Threads]]