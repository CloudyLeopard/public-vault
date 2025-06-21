In other words, *attempts to make multicore programming **easy***

War between hardware and software programming language

FIRST ATTEMPT: The right computer language would make parallel programming straightforward
- this obviously came from the hardware community, trying to put the work on the software community lol
- But, here's a question. what is the "right" computer language?
	- What makes a language easy or hard? turns out, it's a "comfort zone" thing. If the first class we took is C, C probably would have been our comfort zone. But then, why are we not using Java in this class?
	- One of the main reason is because of **garbage collection**. As a programmer, we have no control over when the garbage collector will stay in the heap and kick in. We cannot write a program and cannot expect good performance since we have no control
	- Java virtual machine, also, is something that *doesn't exist*, and is something we do not have control over. If we cannot have control over it in the end, we cannot achieve higher performance.
- Results so far: some languages made parallel programming easier, but none has made it as fast, efficient, and flexible as traditional sequential programming. The problem is *we cannot control which thread goes first, etc.* we have **non-repeatable bugs (nondeterministic)**

The software community fires back! 
SECOND ATTEMPT: If you just design the hardware properly, parallel programming will become easy
- What does it mean to "design the hardware properly"?
	- "How to submit sequential code to hardware and make it run in parallel?"
	- Results so far: no one has yet succeeded
 
 THIRD ATTEMPT: Write software that will automatically parallelize existing sequential programs
 - Results so far: success here is inversely proportional to the number of cores
	 - simply speaking, we cannot do it except for applications that have for loops and loop interations are independent from each other
	 - Anything more sophisticated than that requires intervention of the programmer. Only you, the programmer, knows if two parts are independent
		 - e.g. programmer knows if two pointers are pointing to the same thing

This is why people are saying parallel programing are easy if you don't care about performance lol

See next: [[Parallelizing a Sequential Program]]