https://docs.python.org/3/library/asyncio.html

Note: it's all just *one thread*. Coroutines and tasks just make it so that, when all scheduled (in the event loop), when one task blocks (e.g. `await`-ing for an IO), the event loop can run the next task while waiting.

"Pseudo [[Concurrency]]"
## Coroutines and Tasks
https://docs.python.org/3/library/asyncio-task.html

[[Coroutines]]
[[Awaitables]]
[[Tasks]]
[[Task Groups]]
[[Sleep]]
[[asyncio.gather]]
[[Eager Task Factory]]
[[Timeout]]
[[Waiting Primitives]]

### Things I didn't look into

- `asyncio.shield`
- Threads

## Event Loop
[[Event Loop]]

## Synchronization Primitives

https://docs.python.org/3/library/asyncio-sync.html#asyncio-sync

Semaphore
https://medium.com/@kasperjuunge/semaphore-in-asyncio-1aaaf4038e30

# Python Concurrency Stuff

Queue

Futures

Asyncio

## Debug

```python
asyncio.run(afunc, debug=True)
```

It will generate `warning` that provides diagnostic information on a task's execution (when it is pending, execution, etc.)
- it will always print one for the very first task
- later on, warning is generated when a task *takes longer than expected to resume execution* 

I *think* it will always send `debug` messages on diagnostic information on task's execution. only when its longer than expected it becomes `warning`

> [!note] Observations
> I noticed that the warning is much more frequent for later tasks, which could be explained by:
> 1. increased load on event loop - more tasks are competing for CPU time, event loop becomes too busy, so delay in resuming tasks become more common
> 2. task scheduling delays
> 
> or others...
> basically, don't queue up too many tasks at once

### Test Results

Request url: https://httpbin.org/get

| Request Method         | Number of URLs | Semaphore | Max Connect | Seconds |
| ---------------------- | -------------- | --------- | ----------- | ------- |
| `asyncio.gather`       | 10,000         | 20        | 20          | 16.78   |
|                        | 20,000         | 20        | 20          | 29.44   |
| `asyncio.create_task`  | 10,000         | 20        | 20          | 17.48   |
|                        | 20,000         | 20        | 20          | 32.84   |
| `asyncio.TaskGroup`    | 10,000         | 20        | 20          | 20.08   |
|                        | 20,000         | 20        | 20          | 28.48   |
| `asyncio.as_completed` | 10,000         | 20        | 20          | 16.22   |
|                        | 20,000         | 20        | 20          | 28.09   |

Request url: https://httpbin.org/anything/{i}

> [!warning] Common Error
> I frequently get the following error with the `TaskGroup` method and `as_completed` method (its a `httpx.RequestError`). The error doesn't happen again when I retry... so i think it's ok.
> ```
> httpx.ConnectError: [Errno 8] nodename nor servname provided, or not known
> ```

Request size: 20,000
Number of Semaphores: 200
max_connections (httpx): 300
max_keepalive_connections (httpx): 20

| Request Method         | Attempt 1 | Attempt 2 | Attempt 3 | Average |
| ---------------------- | --------- | --------- | --------- | ------- |
| `asyncio.gather`       | 29.81     | 38.72     | 30.39     | 32.97   |
| `asyncio.create_task`  | 29.84     | 30.08     | 30.07     | 30.00   |
| `asyncio.TaskGroup`    | 30.82     | 29.43     | 28.01     | 29.42   |
| `asyncio.as_completed` | 31.24     | 32.30     | 29.98     | 31.18   |

Request size: 20,000
Number of Semaphores: 200
max_connections (httpx): 100
max_keepalive_connections (httpx): 20

| Request Method         | Attempt 1 | Attempt 2 | Attempt 3 | Average |
| ---------------------- | --------- | --------- | --------- | ------- |
| `asyncio.gather`       | 124.63    | 118.71    | 116.24    | 119.87  |
| `asyncio.create_task`  | 117.93    | 118.80    | 118.36    | 118.36  |
| `asyncio.TaskGroup`    |           |           |           | -       |
| `asyncio.as_completed` |           |           |           | -       |

Request size: 20,000
Number of Semaphores: 300
max_connections (httpx): 300
max_keepalive_connections (httpx): 20

> [!danger] There is a *lot* more `httpx.ConnectError`
> My observation: when `n_semaphores` is bigger than around 200 (actually 250, based on observations later), there is a lot more error. I think httpx client can't handle anything bigger than around 200.

Despite the errors, let's see with `retry` if its faster

| Request Method         | Attempt 1 | Attempt 2 | Attempt 3 | Average |
| ---------------------- | --------- | --------- | --------- | ------- |
| `asyncio.gather`       | 35.50     | 41.53     | 57.43     | 44.82   |
| `asyncio.create_task`  | 35.33     | 37.13     | 36.35     | 36.27   |
| `asyncio.TaskGroup`    | 28.40     | 26.90     | 27.52     | 27.61   |
| `asyncio.as_completed` | 35.92     | 26.34     | 26.91     | 29.72   |

Request size: 20,000
Number of Semaphores: 200
max_connections (httpx): 200
max_keepalive_connections (httpx): 20

| Request Method         | Attempt 1 | Attempt 2 | Attempt 3 | Average |
| ---------------------- | --------- | --------- | --------- | ------- |
| `asyncio.gather`       | 36.38     | 42.66     | 32.05     | 37.03   |
| `asyncio.create_task`  | 35.03     | 42.26     | 37.48     | 38.26   |
| `asyncio.TaskGroup`    | 43.77     | 28.40     | 31.02     | 34.40   |
| `asyncio.as_completed` | 34.25     | 33.09     | 28.44     | 31.93   |
Request size: 20,000
Number of Semaphores: 250
max_connections (httpx): 200
max_keepalive_connections (httpx): 20

> [!warning] Lots of `httpx.ConnectError` when `n_semaphores=300`

| Request Method         | Attempt 1 | Attempt 2 | Attempt 3 | Average |
| ---------------------- | --------- | --------- | --------- | ------- |
| `asyncio.gather`       | 98.06     | 101.29    | 99.68     | 99.68   |
| `asyncio.create_task`  | 102.10    | 98.87     | 100.12    | 100.36  |
| `asyncio.TaskGroup`    | 94.74     | 98.00     | 76.35     | 89.70   |
| `asyncio.as_completed` | 92.88     | 94.58     | 91.64     | 93.04   |

> [!important] Maintain `n_semaphores` < `max_connections`
> Interestingly, when `n_semaphores` is more than `max_connections` (like in this case), the program is *much* slower. See the case where both are 200: the average is ~35 sec. Or the case where `n_semaphores=200` but `max_connections=300`: the average is ~30 sec.
>
> I interpret this as, if httpx.client forces requests to wait (rather than immediately send the request due to `max_connections` cap), the overhead or slowdown or whatever is *much higher*. So, it's probably better to make it so that whenever we send a request (i.e. `await client.get(...)`), we should send the request asap rather than wait.

Request size: 20,000
Number of Semaphores: 250
max_connections (httpx): 300
max_keepalive_connections (httpx): 20

> [!warning] A good amount of `httpx.ConnectionError`

| Request Method         | Attempt 1 | Attempt 2 | Attempt 3 | Average |
| ---------------------- | --------- | --------- | --------- | ------- |
| `asyncio.gather`       | 39.24     | 59.51     | 35.30     | 44.48   |
| `asyncio.create_task`  | 42.09     | 36.77     | 44.94     | 41.27   |
| `asyncio.TaskGroup`    | 33.71     | 35.30     | 36.39     | 35.13   |
| `asyncio.as_completed` | 31.68     | 30.77     | 33.45     | 31.97   |

> [!important] Maintain `n_semaphores` < 250
> When `n_semaphores >= 250`, I observed a *lot* more `httpx.ConnectionError`, causing much more retries. The time spend for each method is, on average, higher as well.

Request size: 20,000
Number of Semaphores: 225
max_connections (httpx): 300
max_keepalive_connections (httpx): 20

> [!warning] The below time is done at home (the previous tests are at NYU)
> my home wifi is obviously faster. But i also ran a quick test, and re-ran some of my other tests above. this is still the fastest run (and the other runs, aren't faster by much when ran at home)

| Request Method         | Attempt 1 | Attempt 2 | Attempt 3 | Average |
| ---------------------- | --------- | --------- | --------- | ------- |
| `asyncio.gather`       | 29.61     | 30.04     | 29.04     | 29.56   |
| `asyncio.create_task`  | 31.37     | 29.99     | 29.47     | 30.28   |
| `asyncio.TaskGroup`    | 28.22     | 25.70     | 25.65     | 26.52   |
| `asyncio.as_completed` | 26.20     | 26.46     | 26.01     | 26.22   |

**Most optimal combination:**
- Number of Semaphores: 225
- max_connections (httpx): 300
- max_keepalive_connections (httpx): 20

New test: request size = 100,000