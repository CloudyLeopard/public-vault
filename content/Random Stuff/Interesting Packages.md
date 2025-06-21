# Requests
[HTTPX](https://www.python-httpx.org/)
- Has both sync and async request clients. Can use this instead of needing to separate `requests` and `aiohttp`
- OpenAI's Python client is based on `httpx` i believe

Notes:
```python
httpx.Limits(max_keepalive_connections=20, max_connections=1000)
httpx.Timeout(10.0, connect=60.0, pool=60.0)
```

`max_connections` is the maximum connections httpx will send, before needing to wait for these connections to finish (receive the data back) then sending more
- I've noticed that when `max_connections` is too big, the time it takes to finish executing the [[Tasks|task]] is longer for later requests.
- which i interpret as, we are waiting on waaaay too many requests to be executed, and so the memory it takes up and maybe the [[Runtime]] stuff just slows things down. do not keep a huge `max_connections`.
`max_keepalive_connections` is as the name implies
`pool` is how long, after we send an request (see [[Tasks|task]]), can the request wait for before it basically says "waiting for too long throwing an error"
- I think this should be proportional to `max_connections`
- Note: limiting `max_connections` **does not prevent a request from being "pooled"**. the "pool" timer starts the moment you call `await client.get(url)` (i think). to prevent this, either increment `pool` or use [[Asyncio (START HERE)#Synchronization Primitives|semaphores]]


# OpenAI
Official [OpenAI Python API Library](https://github.com/openai/openai-python?tab=readme-ov-file)

# ArgParse
https://docs.python.org/3/library/argparse.html
parse arguments

# Tenacity
https://tenacity.readthedocs.io/en/stable/#
Python retry. Another package is "[backoff](https://pypi.org/project/backoff/)"