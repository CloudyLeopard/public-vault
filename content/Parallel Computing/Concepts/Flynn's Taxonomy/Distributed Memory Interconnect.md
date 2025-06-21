Interconnect for a [[Distributed Memory System]]

> [!info] *Pacheco* 2.3.4

There are two types:
1. Direct Interconnect
2. Indirect interconnect

## Direct Interconnect
Each switch is directly connected to a processor-memory pair, and the switches are connected to each other

![[direct interconnect example.png|500]]
Circles=switches, squares=processors, lines=bidirectional links

The figure shows a **ring** and a two-dimensional **toroidal mesh**.

A ring is better than a simple bus because it allows multiple simultaneous communications: $P_1$ can send to $P_2$, and $P_3$ and send to $P_1$

## Indirect Interconnect
An alternative to direct interconnect. Here, the switches may not be directly connected to a processor. They're often shown with unidirectional linnks and a collection of processors, each of which has an outgoing and incoming link, and a switching betwork.

Examples: **crossbar** and the **omega network**

![[distributed memory systemcrossbar interconnect.png|500]]

