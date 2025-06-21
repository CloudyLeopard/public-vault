well i had a note for hatch but it was deleted cuz i screwed up backup

## Environment variables
https://stackoverflow.com/questions/43267413/how-to-set-environment-variables-from-env-file
```bash
export $(xargs <.env)
```

## Hatch Test

https://hatch.pypa.io/1.13/tutorials/testing/overview/

basically 
```python
hatch test ...
```

is equivalent to stuff from [[Pytest]]

Add `-p` flag for *parallel* workers

Note: sometimes the `hatch test` flags are different from `pytest` flags. You can use `--` when `hatch test` flags are in conflict with `pytest` flags:

Example:
```python
hatch test -p --  -rP -- tests/data_sources/test_sources.py
```

This will enable the `-p` flag for `hatch test`, then `-rP` flag for `pytest`
- `-p`: parallelize test worker
- `-rP`: print out stdout and log output regardless if test passes or fails