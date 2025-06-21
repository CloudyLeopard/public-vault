The interconnect affects performance of both distributed and shared memory system. This is because [[Communication (Constraint)|communication]] is *very expensive*.

> [!info] *Pacheco* 2.3.4

There are two categories:
1. [[Shared Memory Interconnect]]
2. [[Distributed Memory Interconnect]]

### Definitions For Interconnection Networks

Anytime data is transmitted, we're interested in how long it will take for the data to reach its destination

**Latency**: The time that elapses between the source's *beginning to transmit* the data and the destination's *starting to receive* the first byte

**Bandwidth**: The *rate* (e.g. bytes per sec) at which the destination receives data after it has started receiving the first byte

Assume this is one wire, with a source and destination. A source needs to send 0.5 byte (4 bits) to the destination. The source will first send 1 bit, and put the next bit onto the line

![[latency and bandwith example.png]]

latency: the time it takes from 1 bit to start from source and reach destination
bandwidth: how many bits are received at the destination once per cycle (with one wire, bandwidth = 1)

$$ \text{Message transmission time} = l + n/b$$
- l = latency (seconds)
- n = length of message (bytes)
- b = bandwidth (bytes per second)

> [!warning]- Other Definitions of "Latency" and "Bandwidth"
> From *Pacheco* 2.3.4
> "Beware, however, that these terms are often used in different ways. For example, latency is sometimes used to describe total message transmission time. It’s also often used to describe the time required for any fixed overhead involved in transmitting data. For example, if we’re sending a message between two nodes in a distributed-memory system, a message is not just raw data. It might include the data to be transmitted, a destination address, some information specifying the size of the message, some information for error correction, and so on. So in this setting, latency might be the time it takes to assemble the message on the sending side—the time needed to combine the various parts—and the time to disassemble the message on the receiving side (the time needed to extract the raw data from the message and store it in its destination)."
