
## Blocking Websites

Obviously the most straightforward way to increase productivity is to block the sites that's distracting you. Couple methods that I've worked with:

### Terminal

First, open up the file `/etc/hosts`:
```bash
sudo vim /etc/hosts
```

> [!info] What is `/etc/hosts`
> I have no idea. Here's a [stackexchange article](https://unix.stackexchange.com/questions/421491/what-is-the-purpose-of-etc-hosts) on it though

For each website you want to block, add the following lines into the file
```
127.0.0.1 youtube.com
127.0.0.1 www.youtube.com
```

Remove existing cache to refresh existing cache on host database
```bash
sudo dscacheutil -flushcache
```

