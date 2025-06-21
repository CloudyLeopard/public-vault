
```python
awaitable asyncio.gather(*aws, return_exceptions=False)
```
Runs [[Awaitables|awaitable objects]] in the `aws` sequence **concurrently**. If any awaitable in `aws` is a [[Coroutines|coroutine]], it is automatically scheduled as a [[Tasks|task]]

> [!important] New, Safer Alternative: [[Task Groups]]
> > A new alternative to create and run tasks concurrently and wait for their completion is [`asyncio.TaskGroup`](https://docs.python.org/3/library/asyncio-task.html#asyncio.TaskGroup "asyncio.TaskGroup"). _TaskGroup_ provides stronger safety guarantees than _gather_ for scheduling a nesting of subtasks: **if a task (or a subtask, a task scheduled by a task) raises an exception, _TaskGroup_ will, while _gather_ will not, cancel the remaining scheduled tasks).**
> 
> Basically, `gather` just sucks.
> 

If all awaitables are completed successfully, the result is an aggregate list of returned values. The order of result values corresponds to the order of awaitables in `aws`

`return_exceptions`:
- if `=False`, the first raised exception is immediately propagated to the task that awaits on `gather()`; other awaitable in the `aws` sequence **won't be cancelled** and will continue to run

> [!danger] oh.
> doesn't this mean, suppose i gather on a long list of tasks, and them "bam" one of them got an error. However, the outer future (in this case, `gather`) will *not* be cancelled, so then the rest of the tasks *that are not yet run will STILL KEEP RUNNING*.

- if  `=True`, exceptions are treated the same as successful results, and aggregated in the result list

If `gather()` is _cancelled_, all submitted awaitables (that have not completed yet) are also _cancelled_.

> [!info] So, here's another way to cancel the remaining awaitables
> Once an error is propagated up, we *cancel `gather`*.
> 
> There is a caveat, however (tho i don't quite understand it so imma just copy paste)
> > If _return_exceptions_ is false, cancelling gather() after it has been marked done won’t cancel any submitted awaitables. For instance, gather can be marked done after propagating an exception to the caller, therefore, calling `gather.cancel()` after catching an exception (raised by one of the awaitables) from gather won’t cancel any other awaitables.

If any Task or Future from the _aws_ sequence is _cancelled_, it is treated as if it raised [`CancelledError`](https://docs.python.org/3/library/asyncio-exceptions.html#asyncio.CancelledError "asyncio.CancelledError") – the `gather()` call is **not** cancelled in this case. This is to prevent the cancellation of one submitted Task/Future to cause other Tasks/Futures to be cancelled.

