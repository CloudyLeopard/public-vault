Running pytest
```bash
pytest
```

`contest.py` - mainly for fixtures that you want to be used repeatedly
**fixtures** - kind of like the set up part (logging into database, initializing client, etc.)
- defined with scope (see website but different scope means does the fixture get re-initialized every file, or every function, or perhaps once the entire test)
`pytest_asyncio` - 3rd party pytest package needed to run asyncio tests

If the module is built using [[Python Packaging, Hatch]], pytest can be run using `hatch` too. See [[Python Packaging, Hatch#Testing]]

# Configuration
Simple pytest configuration set up in `pyproject.toml` file:
https://docs.pytest.org/en/6.2.x/customize.html

## Logging
https://docs.pytest.org/en/stable/how-to/logging.html

Either add the flag `--log-cli-level=DEBUG`

or use the fixture **caplog** like so:
```python
def test_foo(caplog):
    caplog.set_level(logging.INFO)
    ...
```

see more at the link above

note: nothing getes printed out if the test is `PASSED`

## Flags

https://docs.pytest.org/en/7.1.x/how-to/output.html
Flags that modify pytest's output
`-r`: display a "short test summary" info at end of test session. Defaults to `fE` (list failure and errors). It accepts a number of characters after it, with `a` used above meaning "all expect passes"
- `f`: failed
- `E`: error
- `s`: skipped
- `x`: xfailed
- `X`: xpassed
- `p`: passed
- `P`: passed with output

Special characters for (de) selection of groups
- `a`: all expect `pP`
- `A`: All
- `N`: none, can be used to display nothing (since `fE` is default)
Example: `-rP` or `-rpP`

# 3rd Party Packages
## Environment Variables
Potential ways to set environment variables with pytest:
- https://github.com/pytest-dev/pytest-env
- https://github.com/quiqua/pytest-dotenv
```toml
[tool.hatch.envs.hatch-test]
extra-dependencies = [
	...
    "pytest-dotenv" # for loading .env in testing environment
]

[tool.pytest]
...
env_files = [
    ".env"
]
```

> [!Important] Read this when i have the chance
> https://pytest-with-eric.com/pytest-best-practices/pytest-environment-variables/
# Pytest-Retry
https://pypi.org/project/pytest-retry/
retry tests