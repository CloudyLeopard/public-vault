characteristic of a resource:
- must be inside of the SM
- Must be determined *before* kernel launch

So, L1 [[Cache]] is *not* a resource (even though L1 cache is inside SM, we cannot determine how much L1 cache is needed to be used before kernel launch, or the set associativity, etc.)

Example of [[Streaming Multiprocessor|SM]] resources:
- number of threads that can be simultaneously tracked and scheduled
- registers
	- We know registers needed because we just look at kernel and count how many scalar variables in kernel.
	- Multiply this number by threads per block = total number of registers needed by that block.
	- if 256 threads, each thread has `int x`, we need 256 registers.
- shared memory

