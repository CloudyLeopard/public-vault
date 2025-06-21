---
aliases:
  - SM
---
A [[GPU Architecture]] Design

A **group** of execution units, or [[Streaming Processor]]

- Execution units are divided into fixed-size **groups** (all groups has the same number of execution units)
- Execution Units **within a group** can communicate very quickly.
- Communication **between groups** is slower.

Each SM runs one or more [[Block]]