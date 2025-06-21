install [miniconda](https://docs.anaconda.com/miniconda/)

Using [[Homebrew]] to install miniconda: https://formulae.brew.sh/cask/miniconda

> [!important] Caveats
> Please run the following to setup your shell:  
> ```bash
> conda init "$(basename "${SHELL}")"
> ```
> 
> Alternatively, manually add the following to your shell init:
> ```bash
> eval "$(conda "shell.$(basename "${SHELL}")" hook)"
> ```

I have a couple of options
**Automatic Setup**: do this by running `conda init` or `conda init "$(basename "${SHELL}")"` (see above). This will ==automatically modify shell config== (e.g. `~/.bashrc`, `~/.zshrc`) to **always enable Conda when I open terminal**
- It is possible to disable automatic activation of the *base environment* by running
```bash
conda config --set auto_activate_base false
```
- Conda will still remain available in the terminal
Note: the difference between the two `conda init` line is that, the first one will try to automatically detect my shell environment; the second one is explicitly telling conda what is my shell environment

I can **remove conda setup** (if i have already run `conda init`) by opening shell config file and remove the lines starting with
```bash
# >>> conda initialize >>>
...
# <<< conda initialize <<<
```

**Manual Setup**: if i want to control **when conda loads** into the environment, run `eval "$(conda "shell.$(basename "${SHELL}")" hook)"`. This will temporarily activate conda **for only the current session** without changing your config files

| Option             | Setup Command                                       | When to Use                   |
| ------------------ | --------------------------------------------------- | ----------------------------- |
| Automatic Setup    | `conda init`                                        | Easy setup, always enabled    |
| Manual Setup       | `eval "$(conda shell.$(basename "${SHELL}") hook)"` | Use Conda only when needed    |
| Completely Manual  | `source /path/to/miniconda3/bin/activate`           | Rare usage, manual activation |
| Remove Conda Setup | Edit shell config & remove Conda lines              | If you want to undo changes   |
