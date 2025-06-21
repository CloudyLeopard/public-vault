Communication is when we send information across cores/processors. This takes time!

Random Notes on communication:
- Communication among [[Process (PL)|processes]] is slow
- Communication is way more expensive than hyperthreading threads competing for resources (source note: [[Amdahl's Law]])
- The more communication, the better it is to have fewer, but bigger cores (See [[Amdahl's Law]])
- For low arithmetic intensity tasks (less computation, more memory access or IO), the workload may better be assigned to one core, even if parallelization fraction is close to 1 ([[Amdahl's Law]])

Communication is the most expensive thing. if you have 100 byte you want to send, sending 1 message with 100 bytes is much faster than 10 messages with 10 bytes.

Whenever you try to use `send` and `recv`, build your program in such a way that reduces sending message as much as possible