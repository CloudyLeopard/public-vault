Greene is NYU's Super Computer

## SSH to Greene
**Method 1:**
SSH to greene jump host
```bash
ssh drl7253@gw.hpc.nyu.edu
```

SSH to Greene cluster
```bash
ssh drl7253@greene.hpc.nyu.edu
```


**Method 2:**
```bash
ssh -i /Users/danielliu/Workspace/parallel-computing/greene-key-rsa drl7253@greene.hpc.nyu.edu
```
Then enter passcode (which is my NYU password)

*I followed NYU's instruction [here](https://sites.google.com/nyu.edu/nyu-hpc/accessing-hpc?authuser=0#h.ja8d9dqzdqx2)*

> [!important] Must Be on NYU Wifi or NYU VPN

### SSH to Burst
Run this once inside Greene cluster

SSH to Google Cloud Burst
```bash
ssh burst
```

## Running Parallel Job
Run the following command:
```bash
srun --account=csci_ua_0480_051-2025sp --partition=n2c48m24 --nodes=1 --tasks-per-node=24 --cpus-per-task=1 --mem=0 --time=04:00:00 --pty /bin/bash
```

Then run the following command:
```bash
/share/apps/images/ubuntu-22.04.sif
```

The prompt will now look like:
```bash
Singularity>
```

After that, you can execute your program 

## Transfer Files to Greene

Copy from local machine to Greene
```bash
scp -o ProxyJump=drl7253@gw.hpc.nyu.edu /path/to/file drl7253@greene.hpc.nyu.edu:/home/drl7253
```

Below to do the same, except use rsa key instead of requiring duo push everytime
```bash
scp -i /Users/danielliu/Workspace/parallel-computing/greene-key-rsa /path/to/file drl7253@greene.hpc.nyu.edu:/home/drl7253
```

Copy from Greene to Google Cloudu Burst
SSH to Greene, run the parallel job and execute the command below
```bash
scp -rp greene-dtn:/home/drl7253/filename .
```

it is also possible to transfer multiple files at once ([link](https://stackoverflow.com/questions/16886179/scp-or-sftp-copy-multiple-files-with-single-command))

## Others

Running code after remote connection disconnects:
```bash
nohup ./your_program &
```

can also be used with sh script to run multiple program
```bash
nohup sh -c 'command1; command2; command3' &
```

or, create a `script.sh` and run that
```bash
chmod +x script.sh
nohup ./script.sh &
```

Note: the result is outputted to a file called `nohup.out`. However, this can be changed with some redirecting `>`
