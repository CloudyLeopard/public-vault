
> [!important]
> Understanding a new language's programming model is more important than understanding a specific language's syntax.

It is the language and libraries that create an *abstract view* of the machine.

> When you are using a procedural language like C, your abstract view of the machine is a bunch of "things" (i missed it) calling each other

> Here, if we write code with OpenMP, we see the machine as a shared memory machine. Several core that shares the same memory.

> [!warning] missing info from what he talked about - some examples (02/13)

Control:
- How is [[Parallelism]] created?
- How are dependencies enforced? (How does this language help enforce the dependencies?)

Data
- Shared or private? (how to make data shared to every core or private to every core)
- [[Flynn's Taxonomy|How is shared data accessed]]? Or [[Interconnection Network|private data communicated]] (between cores/processes)?

[[Synchronization]]
- What operations can be used to coordinate parallelism? (Does this program support atomic operations, etc.)
> [!warning] missing a bullet point here

The hardware can be *heterogeneous*.

**The whole challenge of parallel programming** is to make the best use of the underlying hardware to exploit the different types of parallelisms (Task level using threads or processes; data level using SIMD chips; instruction level is done by hardware without my involvement)
