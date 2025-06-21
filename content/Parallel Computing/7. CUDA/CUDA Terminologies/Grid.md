---
aliases: []
---


A **grid** the name for a function that's been sent to the GPU to be executed (similar to how a file becomes a process when its executed)

Before a grid has been sent to the GPU, its called a **[[Kernel]]**

A grid contains [[Block|blocks]]. You have to determine the organization of the blocks and threads/blocks

A grid can be 1D, 2D or 3D

this dimensionality **has no effect on performance**. the reason you pick 2D or 3D is because, what determines this is the **problem**. Suppose, if we are solving matrix multiplecation, matrix is 2D, so blocks can be 2D etc.

## Dimensions

`gridDim`
- Type: `dim3`
- Dimensions of the grid, or how many blocks exist in each direction (x, y, z) of the grid
- `gridDim.x, gridDim.y, gridDim.z`

`blockIdx`
- Type: `uint3`
- Index of current block within the grid
- `blockIdx.x, blockIdx.y blockIdx.z`
- Ranges from 0 to `gridDim.{x, y, z}-1`