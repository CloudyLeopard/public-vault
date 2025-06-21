---
aliases:
  - Process
  - Processes
---

> [!info] *Pacheco* 2.1.2

An operating system "**process**": an instance of a computer program that is being executed.
- A process is an operating system process. Its not just a code to be executed.
- Its more like a box that contains the instruction to be executed (whether it is one [[Threading|thread]], or multiple threads, etc.)
- It has information on what resources this program is using (e.g. what files, how much memory it is taking, billing information - if you are using aws google etc., ...)
- What is really being executed by the core is the **code itself**

Components of a process:
- the executable machine language program (the thread - single or multiple if parallel code)
- A block of (virtual) memory (every process has its own). The OS will ensure (through page table entries) that not two virtual addresses from different processes correspond to the same physical address, except for libraries
- Descriptors of resources the OS has allocated to the process
- Security information
- Information about the state of the process

Creating a process takes time (OS call). In fact, it is more expensive than creating [[Threading|threads]]

For more, see OS notes: [[Process]]