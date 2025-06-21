https://docs.python.org/3/library/asyncio-task.html#awaitables

An object is **awaitable** if it can be used in an `await` expression

> [!info] `await` expression
> https://docs.python.org/3/reference/expressions.html#await
> Suspends execution of coroutine on an awaitable object. Can only be used inside a coroutine function

Three main types of **awaitable** objects: coroutines, Tasks, and Futures

**[[Coroutines]]**: these are awaitables, and therefore can be awaited from other coroutines (creating a "nested" effect)

```python
import asyncio

async def nested():
    return 42

async def main():
    # Nothing happens if we just call "nested()".
    # A coroutine object is created but not awaited,
    # so it *won't run at all*.
    nested()  # will raise a "RuntimeWarning".

    # Let's do it differently now and await it:
    print(await nested())  # will print "42".

asyncio.run(main())
```

**Tasks**: used to schedule coroutines *concurrently*. When a coroutine is wrapped into a *Task* with functions like `asyncio.create_task()`, the coroutine is automatically scheduled to run soon

```python
import asyncio

async def nested():
    return 42

async def main():
    # Schedule nested() to run soon concurrently
    # with "main()".
    task = asyncio.create_task(nested())

    # "task" can now be used to cancel "nested()", or
    # can simply be awaited to wait until it is complete:
    await task

asyncio.run(main())
```

**Future**: special *low-level* awaitable object that represents an *eventual result* of an asynchronous operation. When a Future object is _awaited_ it means that the coroutine will wait until the Future is resolved in some other place.

Notes:
- Future objects in asyncio are needed to allow callback-based code to be used with async/await.
- Normally **there is no need** to create Future objects at the application level code.
- Future objects, sometimes exposed by libraries and some asyncio APIs, can be awaited:
```python
async def main():
    await function_that_returns_a_future_object()

    # this is also valid:
    await asyncio.gather(
        function_that_returns_a_future_object(),
        some_python_coroutine()
    )
```