# Cron
Automate jobs
https://medium.com/@justin_ng/how-to-run-your-script-on-a-schedule-using-crontab-on-macos-a-step-by-step-guide-a7ba539acf76

Create a new cron job (or edit one)
```bash
crontab -e
```

> [!info] Example cron job
> this is the cron job i used to run `finrag-load`
> ```
> 0 20 * * * /Users/danielliu/Workspace/fin-rag/bash/run_finrag_load.sh

See all cron jobs:
```bash
crontab -l
```

Use [[Terminal Line#Vim|Vim]] to edit cron jobs

> [!warning] Cron Job Does Not Run when Computer is Sleeping
> yea as the title says.
> 
> Old Work around:
> > `cron` doesn't execute while the computer is asleep, so there's no way for you to have a crontab entry to wake the computer. That said you can schedule the computer to wake just a minute or two before your cron task in Preferences >> Energy Saver >> Schedule.
> > 
> > It's also worth pointing out that since Tiger, Apple has moved most scheduled jobs from `cron` and scripts like `init.rc` to the `launchd` process. It provides more detailed (but cumbersome, I think) means of control (through several plist files). It will also automatically run tasks missed because the computer was sleeping when it awakens. Take a look at Apple's [Scheduling Timed Jobs](https://developer.apple.com/library/mac/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/ScheduledJobs.html) page. [Source](https://superuser.com/questions/14836/crontab-to-wake-osx-from-sleep)
> 
> With new OS, **the above no longer works** (the energy saver thing is gone). We can achieve the same with `pmset` in terminal (see below)

## pmset
Terminal line to wake up (or shut down) computer at specific time
[source](https://osxdaily.com/2022/11/10/how-to-schedule-boot-turn-on-shutdown-wake-sleep-on-macos-ventura/)
https://www.dssw.co.uk/reference/pmset/
[Apple page on pmset](https://support.apple.com/guide/mac-help/schedule-your-mac-to-turn-on-or-off-mchl40376151/mac#:~:text=You%20can%20use%20the%20pmset,when%20you%20aren't%20working.)
or just do `man pmset`

Note: `pmset` uses 24 hour time
> pmset uses 24 hour time, and you can specify days, dates, and time down to the second, using the format MTWRFSU for days of the week and MM/DD/YY HH:MM:SS for specific dates and times.
> 
> For example for December 25 2025 at 8:30am you would use the following format 12/25/25 08:30:00.
> 
> Or for every Monday, Wednesday, Friday, at 6 PM, you would use MWF 18:00:00.

**Schedule Mac to Power On or Wake**
Example: Schedule a Mac to wake up or boot up Monday-Friday at 8am:  
```bash
pmset repeat wakeorpoweron MTWRF 8:00:00
```

**Schedule Mac to Shutdown**
Example: Scheduling a Mac to shut down every Monday through Friday at 8pm:  
```bash
pmset repeat shutdown MTWRF 20:00:00
```

**View Currently Active pmset Settings**
To see the currently active settings with pmset, use the following command:  
```bash
pmset -g
```
To check all scheduled events:
```bash
pmset -g sched
```
### Remove All Prior Scheduling on the Mac

To remove any currently active scheduling for the Mac to power on / boot, sleep / wake, or shut down, use the following command syntax:
```bash
sudo pmset repeat cancel
```


See current cron jobs
# Vim
https://opensource.com/article/19/3/getting-started-vim
Basic things:
- Changing between modes: `esc` (normal mode, for commands), `i` (insert mode, for editing) and `v` (visual mode, for highlighting, copying, etc.)
- always start with normal mode (press `esc`). If i want to edit, press `i`
- In normal mode, if you type `:`, the rest of the stuff becomes command line
- `:q!` to quit without saving, `:x!` (or `:wq`) to quit with saving
- type `:set number` to show line number, then i can type `:1` (or any number) to jump to that number (note, since its `:`, these operations should always be done in normal mode)
- `dd` to delete line; `u` to undo
- `v` to select/deselect test, `y` to yank (copy), `o` to create new line (this puts you into input mode), `p` to paste copied text (again still make sure you're in normal mode before doing this)
- `:/<SEARCH_KEYWORD>` to search for key word and `n` to go to next key word
- `$` to go to end of line. Use `A` to move to end of line and switch to editing mode (append)
- `^` to go to beginning of line. 
- `g` then `_` to jump to last non-blank character
