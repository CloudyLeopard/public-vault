Interconnect for [[Shared Memory System]].

> [!info] *Pacheco* 2.3.4

Shared-memory interconnect evolved from using "bus interconnect" to a "switched interconnect"

## Bus Interconnect

**Bus**: a collection of **parallel communication wires** together with hardware that controls access to the bus. Its key characteristic is that the communication wires are shared by the devices connected to it.

> [!important] Only one core can access the bus at a time
> A bus is a broadcast medium. If one core puts data on the bus, every core will see it.
> As such, you *cannot have multiple cores put data on the bus*, or something will go wrong. You have to add things (bus arbitration mechanisms) to control access to bus and prevent multiple cores from sending data simultaneously.

As the number of devices connected to the bus increase:
- Contention for use of the bus increase: bus is not scalable because if several cache needs to send to global memory, and cores number increase, performance will drop very quickly.
- [[Communication (Constraint)|Communication]] becomes unreliable due to noise: electrical engineering says that increasing connection to bus will make electronic noise, which will distort transmitted data
- Performance decrease

This led to the next interconnect

## Switched Interconnect

Switched interconnect uses **switches** to control the **routing** of data among the connected devices. Those switches are connected by **wire** forming network of some **topology**.

> [!info]- Topology
> Topology is a subfield of mathematics - a study of shapes or something and you gotta look at shapes to compare distance between points etc. These are all mathematical optimization so they bring in mathematics

A relatively simple and powerful switched interconnect example is **crossbar**
- allows simultaneous communication among different devices --> faster than buses
- but the cost of the switches and links is relatively high (a small bus-based system is much less expensive than a same sized crossbar-based system)

![[switched interconnect example - crossbar.png|500]]
(a.) a simple crossbar where the lines are bidirectional communication links, squares are cores or memory modules, and circle are switches
(b.) possible configurations for the individual switches. With switches and at least as many memory modules as processors, there will only be a conflict between two cores attempting to access memory if the two cores attempt to simultaneously access the same memory module. 
(c.) Example of switch configurations if $P_1$ writes to $M_4$, $P_2$ reads from $M_3$, $P_3$ reads from $M_1$, and $P_4$ writes to $M_2$

