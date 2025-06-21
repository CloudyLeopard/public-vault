**Single cycle implementation**: a black box, gets an instruction, executes the instruction, gets an output; get next instruction, executes it, gets another output, etc.
![[first generation core.png]]

Problem: Not every instruction is created equally - some instructions take longer time to finish than others. As a result, the length of a [[Clock|cycle]] needs to be **the length of the slowest instructions that can be executed**

However, this is *bad*.
1. Inefficiency: long cycle = fewer frequency. We are making the frequency **as slow as the slowest instruction**, which means all the instructions will take as slow as the slow instruction.
2. Power Consumption: [[Pro and Con of Multiple Processors| Sophisticated circuity is power hungry]]
3. Resource Waste: this circuit has a part that fetches instruction from the memory, a part that tries to decode it (cuz from the memory its 0s and 1s), a part that executes it, etc. So, when you have an instruction is being executed, *most of the circuit is being idle*

The response to this implementation's short coming is [[Pipelining]] (at least for the third point)
