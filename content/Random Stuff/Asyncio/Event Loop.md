https://docs.python.org/3/library/asyncio-eventloop.html

Core of every asyncio application. Event loops run asynchronous tasks and callbacks, perform network IO operations, and run subprocesses.

Generally, just use high-level asyncio functions like `asyncio.run()`. Rarely should need to reference loop object or cal its methods.

Note: as more [[tasks]] are scheduled, the event loop becomes busier, and delays in resuming tasks may become more common.