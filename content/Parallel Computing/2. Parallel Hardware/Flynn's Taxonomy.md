Flynn's classification is based on how instructions and data are used.

|                                 | **Single Data Stream** | **Multiple Data Stream** |
| ------------------------------- | ---------------------- | ------------------------ |
| **Single Instruction Stream**   | SISD                   | SIMD                     |
| **Multiple Instruction Stream** | MISD                   | MIMD                     |

> [!info] *Pacheco* 2.3.1

![[Flynn's Taxonomy Diagram.png]]

PU = processing unit; could be a full CPU, or a core, of an execution unit (this is just an theoretical overviewarp)

General overview:
- SISD is also the "classic von Neumann", consisting of a main memory, a [[Processor|CPU]], and an interconnect between memory and CPU
- MIMD: traditional multicore.
- SIMD: Example is GPUs, which calculate pixels on the screens that are totally independent of each other
- MISD: does not exist

> [!info] MIMD and SIMD
> MIMD can execute SIMD programs, and so is the most generic. BUT, people design stuff specifically for SIMD even though MIMD exists. But, we don't do the same for MISD. Why?
> - there are many applications that require SIMD's architecture. Also, all the Machine Learning applications also use SIMD (cuz they need matrix multiplication, and SIMD is the textbook definition of matrix multiplication)
> - not as much application for MISD, and all of them can be done using MIMD.

For more specific information, see the following notes:
- [[SISD]]
- [[SIMD]]
- [[MIMD]]
	- [[Shared Memory System ]]
	- [[Distributed Memory System]]


