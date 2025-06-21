## Python Libraries
### Pydantic

**Pydantic v1 v2 Warning**
I got an error with this warning message:
```bash
File "/Users/danielliu/Library/Application Support/hatch/env/virtual/finrag/SC07CWML/experimental/lib/python3.10/site-packages/pydantic/_internal/_generate_schema.py", line 777, in _generate_schema_from_property
    warn(
UserWarning: Mixing V1 models and V2 models (or constructs, like `TypeAdapter`) is not supported. Please upgrade `Settings` to V2.
```
The problem is, i have no idea where the error is at. so i dont know how to fix it.

a potential solution to finding out where the problem is:
add this message: (make sure at the top)
```python
import warnings
warnings.simplefilter("error")
```

this forces warnings to become errors, so that it will produce a traceback all the way to where the problem spawned.

> [!info]
> The problem was i had a type declaration like this:
> ```python
> client: Optional[chromadb.Client]
> ```
> But `chromadb.Client` is a function. It should have been:
> ```python
> client: Optional[chromadb.ClientAPI]
> ```
> Which is a class.


### HTTPX

I can use this:
```python
print(repr(client))
```
To check the connection pool's state

```python
httpx.Limits(max_keepalive_connections=..., max_connections=...)
```
Sets a limit on how many connections is maintained between us and the server. Suppose I send 1000 requests. My understanding is that, httpx will send `max_connections` at a time. it controls the **maximum number of connections** that can be **opened at the same time**. 

When this limit is exceeded, the rest of the requests will just be waiting for a new connection. Suppose `max_connections` = 100, then 100 requests will be sent immediately but 900 will basically be waiting.

`max_keepalive_connections` controls how many connections stay open even after a request finished. If this is exceeded, idle connections are closed. So, after the 100 requests are finished, 10 of them are kept open and 90 of them are closed.

**Pool Timeout Error** (and i think **Connect Timeout**??)
Here's a problem: suppose in `httpx.AsyncClient`, you set a *timeout* (well, default is 5.0 seconds). if after the 5.0 seconds, the 100 connections are still not finished yet, they essentially timeout. Then, httpx will hit me with a fckn `PoolTimeout` error.

*Oh, the default pool timeout is only 5 second* (https://github.com/encode/httpx/blob/master/httpx/_config.py#L361)

A few fixes:
- increase max_connections
- do things in batches so requests are sent after
- [asyncio.Semaphore](https://docs.python.org/3/library/asyncio-sync.html#asyncio.Semaphore)??? ([community solution](https://github.com/encode/httpx/issues/1171#issuecomment-791614435))
- `httpx.Timeout`: the "pool timeout" ([link](https://www.python-httpx.org/advanced/timeouts/))

I can increase `httpx.Timeout(pool=...)`, but this is more of a temporary fix imo. if max_connections is like 100 (remember, this can't be too big because if a site gets 1000 requests at a time it may block me), and if i make like 10,000 requests, then the later 5000 requests will still have to wait. if it waits longer than 60 seconds, then...

... ok now im extra confused
shouldn't this have fixed the problem?: https://github.com/encode/httpcore/pull/880
*huh ok maybe it did???? I didn't need sempahore in the end, i just set* `connect=60.0` and `pool=60.0`

### YFinance
If i'm getting a 429 too many requests error *without even doing any requests*, it may be because the yfinance version is too low (at least thats what happened to me.)