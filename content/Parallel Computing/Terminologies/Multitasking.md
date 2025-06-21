> [!info] *Pacheco* 2.1.2

Gives the illusion that a single processor system is running multiple programs simultaneously
- Each process takes turns running -> time slice
- **Context switching** - really its just running one program, switches to another, runs it, etc.
- But if it does this really quickly, it looks like its all done i parallel
- Few processes can run in parallel if the hardware is equipped with several cores. THIS PART (assigning which code goes to which core) is OUTSIDE OF THE PROGRAMMERS CONTROL
	- all you can do is design as many threads as you can (you want to create more threads than cores - if one thread on a core is doing something that is taking a long time, and the OS can remove it and put another waiting thread on it)

	