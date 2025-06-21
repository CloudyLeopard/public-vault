https://docs.python.org/3/library/asyncio-task.html#timeouts

## `timeout`
```python
asyncio.timeout(delay)
```

Return an [asynchronous context manager](https://docs.python.org/3/reference/datamodel.html#async-context-managers) that can be used to limit the amount of time spent waiting on something.

`delay` can be `None`, which is useful if the delay is unknown when the context manager is created.

The context manager can be rescheduled after creation using `Timeout.reschedule()`

**Example**
```python
async def main():
    try:
        async with asyncio.timeout(10):
            await long_running_task()
    except TimeoutError:
        print("The long operation timed out, but we've handled it.")

    print("This statement will run regardless.")
```

If `long_running_task` takes more then 10 secs to complete, the context manager will cancel the current task. The context manager will also "transform" the resulting `asyncio.CancelledError` into a `TimeoutError` (which is why the `TimeoutError` needs to be caught *outside* of the context manager)


## `Timeout`

```python
asyncio.Timeout(_when_)
```

An [asynchronous context manager](https://docs.python.org/3/reference/datamodel.html#async-context-managers) for cancelling overdue coroutines.

`when` is an absolute time at which the context should time out, as measured by the [[event loop]]'s clock

Example:
```python
async def main():
    try:
        # We do not know the timeout when starting, so we pass ``None``.
        async with asyncio.timeout(None) as cm:
            # We know the timeout now, so we reschedule it.
            new_deadline = get_running_loop().time() + 10
            cm.reschedule(new_deadline)

            await long_running_task()
    except TimeoutError:
        pass

    if cm.expired():
        print("Looks like we haven't finished on time.")
```

## `wait_for`

```python
asyncio.wait_for(aw, timeout)
```

Waits for the `aw` [[Awaitables|awaitable]] to complete with a timeout. If `aw` is a [[Coroutines|coroutine]], it is automatically scheduled as a [[Tasks|Task]]

`timeout` is number of seconds to wait for

`timeout` can also be `None`, which means to block until the future is complete.

If a timeout occurs, cancels task and raises `TimeoutError`.

Example:
```python
async def eternity():
    # Sleep for one hour
    await asyncio.sleep(3600)
    print('yay!')

async def main():
    # Wait for at most 1 second
    try:
        await asyncio.wait_for(eternity(), timeout=1.0)
    except TimeoutError:
        print('timeout!')

asyncio.run(main())

# Expected output:
#
#     timeout!
```

