https://docs.python.org/3/library/asyncio-task.html#id2

Coroutines are lightweight, **non-blocking units of execution** that allow you to write asynchronous code in a sequential style.

Coroutines are declared with the `async`/`await` syntax.
```python
async def main():
	...
	await asyncio.sleep(1)

asyncio.run(main)

```

Simply calling a coroutine will not schedule the coroutine to be executed.

Coroutines are run using one of the following mechanisms:
- `asyncio.run()`: top level entry point
- `await` on a coroutine

> [!example]-
> The following snippet of code will print "hello" after waiting 1 second, then "world" after *another* seconds (since the `await` follows each other)
>
> ```python
> import asyncio
> import time
> 
> async def say_after(delay, what):
> 	await asyncio.sleep(delay)
> 	print(what)
> 
> async def main():
> 	print(f"started at {time.strftime('%X')}")
> 
> 	await say_after(1, 'hello')
> 	await say_after(2, 'world')
> 
> 	print(f"finished at {time.strftime('%X')}")
>
> asyncio.run(main())
> ```

- `asyncio.create_task()`: run coroutines *concurrently* as asyncio **tasks** (see [[Tasks|here]])

> [!Example]-
> Using the same example but with `create_task`, we will see that program starts at time 0, "hello" prints at time 1, and "world" prints at time 2 (instead of time 3)
>
> ```python
> async def main():
>     task1 = asyncio.create_task(
>         say_after(1, 'hello'))
> 
>     task2 = asyncio.create_task(
>         say_after(2, 'world'))
> 
>     print(f"started at {time.strftime('%X')}")
> 
>     # Wait until both tasks are completed (should take
>     # around 2 seconds.)
>     await task1
>     await task2
> 
>     print(f"finished at {time.strftime('%X')}")
> ```

- `asyncio.TaskGroup`: modern alternative to `create_task()` (python 3.11)

> [!Example]-
> ```python
> async def main():
>     async with asyncio.TaskGroup() as tg:
>         task1 = tg.create_task(
>             say_after(1, 'hello'))
> 
>         task2 = tg.create_task(
>             say_after(2, 'world'))
> 
>         print(f"started at {time.strftime('%X')}")
> 
>     # The await is implicit when the context manager exits.
> 
>     print(f"finished at {time.strftime('%X')}")
> ```
