https://docs.python.org/3/library/asyncio-task.html#task-object

A Future-like object that runs a Python [[Coroutines|coroutine]]. Not thread safe.

Tasks are used to run coroutines in [[Event Loop|event loops]].If a coroutine awaits on a Future, the Task suspends the execution of the coroutine and waits for the completion of the Future. When the Future is _done_, the execution of the wrapped coroutine resumes.

Event loops use cooperative scheduling: an event loop runs one Task at a time. While a Task awaits for the completion of a Future, the event loop runs other Tasks, callbacks, or performs IO operations.

## Create Tasks

https://docs.python.org/3/library/asyncio-task.html#creating-tasks
https://stackoverflow.com/questions/71938799/python-asyncio-create-task-really-need-to-keep-a-reference

The biggest hurdle in using `create_task` is that you have to keep a strong reference to all the tasks, and there is no automatic "check" to ensure all the tasks have finished running. A couple solution to this is:
1. add a call back function so that when a task is done it gets discarded
2. Add `asyncio.gather` at the really end to make sure all the tasks finish (but this may be tricky if a task meets an exception)
3. Switch to [[Task Groups]]
### `create_task()`
```python
asyncio.create_task(coro, *, name=None, context=None)
```

This function wraps the `coro` [[Coroutines|coroutine]] into a **Task** and schedule its execution. Returns the Task object.

The task is executed in the [[event loop]] returned by `get_running_loop()`.

> [!important] Useful Function Call
> This is probably the best way to concurrently run coroutines. I interpret `create_task` as just "adding" a coroutine to the end of the loop "queue"

Parameters:
- `name`: If set to `None`, it sets the name of the task using `Task.set_name()` (see [here](https://docs.python.org/3/library/asyncio-task.html#asyncio.Task.set_name)). The benefit of `name` is that the name is visible when you print out the task object.
- `context`: specify custom `contextvars.Context` for `coro` to run in. Current context copy is created when no context is provided.

**Important**: Save a reference to the result of this function to avoid a task disappearing mid-execution.

> The event loop only keeps weak references to tasks. A task that isn’t referenced elsewhere may get garbage collected at any time, even before it’s done. For reliable “fire-and-forget” background tasks, gather them in a collection:
```python
// i think the below works
running_tasks = set()

async for item in async_generator:
	task = asyncio.create_task(some_coro(item))

	# Add task to the set. This creates a strong reference.
	running_tasks.add(task)
	
	# To prevent keeping references to finished tasks forever,
    # make each task remove its own reference from the set after
    # completion:
	task.add_done_callback(running_tasks.remove)
```

## Cancel Tasks

Use the `cancel()` method. 

When a task is cancelled, `asyncio.CancelledError` will be raised in the task at the next opportunity.

Best for coroutines to use `try/finally` blocks to perform clean-up logic. In case when `asyncio.CancelledError` is explicitly caught, best it be propagated when clean-up is complete. This is because if coroutine swallows this error, other asyncio components may not work.

> The asyncio components that enable structured concurrency, like [`asyncio.TaskGroup`](https://docs.python.org/3/library/asyncio-task.html#asyncio.TaskGroup "asyncio.TaskGroup") and [`asyncio.timeout()`](https://docs.python.org/3/library/asyncio-task.html#asyncio.timeout "asyncio.timeout"), are implemented using cancellation internally and might misbehave if a coroutine swallows [`asyncio.CancelledError`](https://docs.python.org/3/library/asyncio-exceptions.html#asyncio.CancelledError "asyncio.CancelledError"). Similarly, user code should not generally call [`uncancel`](https://docs.python.org/3/library/asyncio-task.html#asyncio.Task.uncancel "asyncio.Task.uncancel"). However, in cases when suppressing [`asyncio.CancelledError`](https://docs.python.org/3/library/asyncio-exceptions.html#asyncio.CancelledError "asyncio.CancelledError") is truly desired, it is necessary to also call `uncancel()` to completely remove the cancellation state.

`cancelled()` to check if the Task was cancelled.

## Some Other Methods
- `done()`
- `result()`
- `exception()`
- `add_done_callback()`
- `remove_done_callback()`
- `get_stack()`
- `print_stack()`
- `get_coro()`
- `get_context()`
- `get_name()`
- `set_name()`
- `cancel()`
- `cancelled()`
- `uncancel()`
- `cancelling()`

## Overhead of Asyncio Task
https://stackoverflow.com/questions/55761652/what-is-the-overhead-of-an-asyncio-task

Basically creating task has overhead, so creating too many task could be bad.