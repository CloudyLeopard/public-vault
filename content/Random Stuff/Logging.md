
[Python Logging HOWTO](https://docs.python.org/3/howto/logging.html)
[Reddit Post on When to Use Logging](https://www.reddit.com/r/Python/comments/wt6325/is_adding_logging_to_a_library_good_design/)

## Logging in Jupyter Notebook

> In Jupyter the default logging level is WARNING and there isn’t a handler attached to print lower‑level logs to your notebook “console.” You just need to configure the logger (or the root logger) to emit INFO/DEBUG messages and attach a StreamHandler.

In other words, for loggers in module to log messages like `info` or `debug`, we need to manually attach a handler to the logger

```python
import logging

# create console handler
ch = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)

import module
logger = logging.getLogger('logger_name')
logger.addHandler(ch)

# run modules function that logs message
# the logs will now go into the jupyter notebook console
```

**IMPORTANT**: HAVE TO GET LOGGER *AFTER* YOU IMPORT THE MODULE. OTHERWISE IT DON'T WORK.

for example, the following *will not work*

```python
import logging

# create console handler
ch = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)

logger = logging.getLogger('logger_name')
logger.addHandler(ch)

import module
# run module's function that logs messages
# the logs will NOT go into jupyter notebook's console
```