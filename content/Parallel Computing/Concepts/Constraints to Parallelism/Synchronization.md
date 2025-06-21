**Synchronization** make sure all the code are done before putting things together. Uses a code barriers.
- Its for correctness: without it, sometimes you may get lucky and all the threads move forward in the correct order, but in other cases you will get wrong results.
- But it worsens performance, because it is a system call, and it also forces a thread to wait for other threads.

**Barrier**: a place in the code that all processes must reach before anybody can continue.
- Example: matrix multiplication, we do not want the multiplication to start before two matrices that are being calculated by two processes has finished calculating

