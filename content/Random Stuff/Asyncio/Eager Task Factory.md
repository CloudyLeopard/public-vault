
https://docs.python.org/3/library/asyncio-task.html#eager-task-factory
```python
asyncio.eager_task_factory(loop, coro, *, name=None, context=None)¶
```

Put in short, when you `create_task` on a Coroutine, the program will immediately begin to execute the coroutine rather than putting it in like the back of the line of the event loop. Task will only be scheduled if they block (e.g. have an `await`)

Use it like this:
```python
loop.set_task_factory(asyncio.eager_task_factory)
```
See [[Event Loop]]