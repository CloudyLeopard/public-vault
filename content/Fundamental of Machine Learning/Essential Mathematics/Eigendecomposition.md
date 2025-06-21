
> [!warning] Incomplete

**Eigenvectors:** vectors $\mathbf{v}$ such that, when multiplied by matrix $A$, do not change direction and only stretched (as if you did scalar multiplication)
- These vectors are called Eigenvectors of $A$

**Eigenvalues**: $\lambda$, or the scalar value that $\lambda$ scaled by when $A\mathbf{v}$

Using eigendecomposition, we can factor a [[Linear Algebra (ML)#Matrices|square matrix]] into a *product of Eigenvectors and Eigenvalues*

> [!warning] Incomplete on how Eigendecomposition works

$$A = PDP^{-1}$$
where
- $A$: a square matrix
- $P$: a matrix of Eigenvectors
- $D$: a matrix of Eigenvalues
- $P^{-1}$: inverse of $P$, it has to exist (matrix has to be diagnolizable)
