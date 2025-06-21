https://docs.python.org/3/library/asyncio-task.html#task-groups

Task groups combine a task creation API with a convenient and reliable way to wait for all tasks in the group to finish. Basically a better version of [[asyncio.gather]]

New API in python 3.11

> [!note] My Interpretation
> Recall parallel computing's [[MPI Components|MPI]] and the idea of a "global communicator" vs "sub communicators"
> 
> I think this is the same. Adding a coro using `asyncio.create_task()` adds a task to a "global" event loop, whereas adding a coro into a task group is like adding a task to a "sub" event loop.

The benefit of Task Group is that it doesn't leave any unfinished tasks lying around if other finish with an error. In a way, it's like a safer alternative of the `asyncio.create_task` then `asyncio.gather(tasks)`

> [!important] Why is it safer?
> If one of the task throws an error, the error will propagate all the way up to Task Group and `gather`. **However, `TaskGroup` will cancel the tasks that have not yet been run, while `gather` will not do that.**
## Creating a Task Group/Task

`asyncio.TaskGroup`: an [asynchronous context manager](https://docs.python.org/3/reference/datamodel.html#async-context-managers) holding a group of tasks. Tasks can be added to a group using `asyncio.create_task` (see [[Tasks#`create_task()`|here]])

Example:
```python
async def main():
    async with asyncio.TaskGroup() as tg:
        task1 = tg.create_task(some_coro(...))
        task2 = tg.create_task(another_coro(...))
    print(f"Both tasks have completed now: {task1.result()}, {task2.result()}")
```

The `async with` statement will wait for all tasks in the group to finish.
While waiting, new tasks may be added to the group by passing `tg` into one of the coroutines and calling `tg.create_task()` in the coroutine.

### Exceptions

The first time any tasks have an exception (other than `asyncio.CancelledError`), the remaining tasks are cancelled, and no further tasks can then be added. 

The resulting `asyncio.CancelledError` will interrupt an `await`, but it will not bubble out of the containing `async with` statement

Once all tasks have finished, if any tasks have failed with an exception other than [`asyncio.CancelledError`](https://docs.python.org/3/library/asyncio-exceptions.html#asyncio.CancelledError "asyncio.CancelledError"), those exceptions are combined in an [`ExceptionGroup`](https://docs.python.org/3/library/exceptions.html#ExceptionGroup "ExceptionGroup") or [`BaseExceptionGroup`](https://docs.python.org/3/library/exceptions.html#BaseExceptionGroup "BaseExceptionGroup") (as appropriate; see their documentation) which is then raised.


## Terminating a Task Group

Not natively supported by standard library, but can be implemented through exception