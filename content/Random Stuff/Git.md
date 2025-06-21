Cloning private repo to another computer requires authentication. Two ways:
1. Personal Access Token (but may be bad if PAT expires, idrk)
2. Use [Git Credential Manager](https://github.com/git-ecosystem/git-credential-manager?tab=readme-ov-file)
	1. this is rlly easy. just download it, and whenever i do "git clone" "git push" etc. it just takes care of it by popping up a screen i can interact with

# Git Branching
https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging

Create a new branch and switch to it
```bash
git checkout -b iss53
```

Short hand for
```bash
git branch iss53
git checkout iss53
```

create a branch basically points to a different "screenshot" (idk whats the right term) and then you build off from there

merge branch
```bash
git checkout main
git merge iss53
```

when you merge, if the HEAD hasn't been changed, then the HEAD just gets "fast forwarded" to the "screenshot" that the branch is point to.

If both has been edited, but they are modifying different files, it'll just merge, and we get a screenshot shows parents are two different screenshots.

If both has been edited but on the same file, there is conflict and you gotta deal with that.

delete branch
```bash
git push -d <remote_name> <branchname>   # Delete remote
git branch -d <branchname>               # Delete local
```
## "Fetching" Remote Branch
If `daniels-branch` exists on remote repo but not on local repo, simply type
```bash
git switch daniels-branch
```
[Source](https://stackoverflow.com/questions/9537392/git-fetch-a-remote-branch)
