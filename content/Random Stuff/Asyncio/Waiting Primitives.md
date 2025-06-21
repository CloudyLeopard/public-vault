https://docs.python.org/3/library/asyncio-task.html#waiting-primitives

## `asyncio.wait`
...

## `asyncio.as_completed`
```python
asyncio.as_completed(aws, *, timeout=None)
```

Runs [[Awaitables|awaitable objects]] in the `aws` iterable concurrently. The returned object can be iterated to obtain the results of the awaitables **as they finish**. The object returned by `as_completed()` can be iterated as an asynchronous iterator or a plain iterator. 

When asynchronous iteration, the originally-supplied awaitables are yielded if they are tasks or futures, to correlate previously scheduled tasks with their results (this helps because `as_completed` doesn't ensure the returned order - just whatever finishes first). See below for an **example**:

> [!Example] Async iterator: originally-supplied awaitables are yielded
> ```python
> ipv4_connect = create_task(open_connection("127.0.0.1", 80))
> ipv6_connect = create_task(open_connection("::1", 80))
> tasks = [ipv4_connect, ipv6_connect]
> 
> async for earliest_connect in as_completed(tasks):
>     # earliest_connect is done. The result can be obtained by
>     # awaiting it or calling earliest_connect.result()
>     reader, writer = await earliest_connect
> 
>     if earliest_connect is ipv6_connect:
>         print("IPv6 connection established.")
>     else:
>         print("IPv4 connection established.")
> ```

If the input are coroutines and not wrapped in tasks, asyncio will internally wrap them in Futures (i think). And, `earliest_connect` will yield the implicitly created task.

When used as a plain iterator, each iteration yields a new coroutine that returns the results or raises the exception of the next completed awaitable (compatible with Python versions older than 3.13)

> [!Example] Plain Iterator (for python <3.13)
> ```python
> ipv4_connect = create_task(open_connection("127.0.0.1", 80))
> ipv6_connect = create_task(open_connection("::1", 80))
> tasks = [ipv4_connect, ipv6_connect]
> 
> for next_connect in as_completed(tasks):
>     # next_connect is not one of the original task objects. It must be
>     # awaited to obtain the result value or raise the exception of the
>     # awaitable that finishes next.
>     reader, writer = await next_connect
> ```

`TimeoutError` is raised if the timeout occurs before all awaitables are done.