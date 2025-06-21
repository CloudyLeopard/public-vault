One of the [[Essential Mathematics]] in Machine Learning
## Vectors

A **vector** is something that can be added to itself and multiplied with a scalar, and yields the same object.
- **Column** vector: $\boldsymbol{v} = \begin{bmatrix} 1 \\ 5 \end{bmatrix}$
- **Row** vector: $\boldsymbol{v^T} = [1\ 5]$

Vector operations: **Vector addition**, **Scalar multiplication**
*I'm not writing notes for this...*

> [!info] What is a Vector
> Heuristically, vector = "carrier". Vectors represent directions, *not* coordinates.
> In machine learning, we will use vectors primarily to represent data
## Vector Space
Vector spaces are structured spaces where vectors live
- $\boldsymbol x \in V$: the elements of a **vector space** $V$ are vectors.

$V$ is a **vector space** if two operations are defined (vector addition and scalar multiplication)
- "Inner operation" $+: V\bigotimes V \rightarrow V$ (vector addition)
- "Outer operation" $\dot: \mathbb{R} \bigotimes V \rightarrow V$ (scalar multiplication), for all $\lambda \in \mathbb{R}$ ($\lambda$ = scalars)
and if it is a **group** (e.g. it has a neutral and inverse element)
- Neutral element (**identity**) with respect to vector addition is the **zero vector**: $\vec{0}=[0\ 0\ldots\ 0]$
- Neutral element (**identity**) with respect to scalar multiplication is the number **1**.

> [!warning] Read Linear Algebra Notes for more review

## Vector Subspaces

A subset of the vector space such that if we perform vector space operations on the elements of the **subspace**, we will never leave it.

A **subspace** is the region of the vector space that can be reached by any **linear combination** of a set of vectors

### Linear Combination

**Linear combination**, or vector achieved by scalar multiplication and vector addition
$$\boldsymbol{v} = \lambda_1 \boldsymbol{x}_1 + \cdots + \lambda_k \boldsymbol{x}_k = \sum_{i=1}^k\lambda_i\boldsymbol{x}_i$$
The linear combinations of a collection of vectors **span** a subspace. In other words, by taking all possible linear combinations (sums of scalar multiples) of a set of vectors, you create a subspace. That subspace is **spanned** by those vectors.

If a vector $\boldsymbol{v}$ can be expressed as a linear combination of another vector $\boldsymbol{w}$, these vectors are **linearly dependent**. If no such combination exists (other than scaling both vectors with 0), they are **linearly independent**

> [!note] Linear Dependency and [[Analytic Geometry (ML)#Geometric Implication of the Dot Product|Collinearity]]
> This concept comes back pretty frequently, with the idea of **[[Collinearity|collinear]] predictors**. A collinear predictor is an entire **feature/column** that is linearly dependent on others, which means they can be reproduced by linear combinations of other predictors, which means they do not add any additional information tot he model (except add variance).

### Basis

A set of **basis vectors** $\{\boldsymbol{v_1}, \boldsymbol{v_2}, \ldots, \boldsymbol{v_n}\}$ forms a **basis** for some subspace of $V$ i.f.f. it spans that subspace *and* is an independent set of vectors

**Standard** basis vectors:
$$\mathbb{R}^2 = \left\{\begin{bmatrix}1 \\ 0\end{bmatrix} \begin{bmatrix}0 \\ 1\end{bmatrix}\right\}$$
$$\mathbb{R}^3 = \left\{\begin{bmatrix}1 \\ 0 \\ 0\end{bmatrix} \begin{bmatrix}0 \\ 1 \\ 0\end{bmatrix} \begin{bmatrix}0 \\ 0 \\ 1\end{bmatrix}\right\}$$

## Matrices

A rectangular array of real numbers with $m$ rows and $n$ columns

$$\boldsymbol{A} \in \mathbb{R}^{m\times n}$$
$$\boldsymbol{A} = \begin{bmatrix}
a_{11} & a_{12} & \ldots & a_{1n}\\
a_{21} & a_{22} & \ldots & a_{2n}\\
\vdots & \vdots & & \vdots \\
a_{m1} & a_{m2} & \ldots & a_{mn}\\
\end{bmatrix}$$
- The **dimensionality** of matrix $\boldsymbol{A}$ is $m$ by $n$, or number of its rows $M$ and columns $n$.
- $a_{ij} \in \mathbb{R}$

> [!info] By convention, always use $m \times r$ for matrix in ML

> [!info] ML only deals in $\mathbb{R}$

Some special matrices:
- **Square Matrices**
- **Symmetric Matrices**
- **Diagonal Matrices**
- **Identity matrices**

In machine learning, we will use matrices primarily to represent **linear transformations**

## Linear Mappings

**Linear mappings** (transformations) apply the concept of preserving the structure of the mathematical object under addition and scaling to vector spaces itself, i.e. mapping the vectors pace $V$ to the vector space $W$

> [!danger] Incomplete, also find specific examples/definitions when filling in this note

## Special Subspaces: Image and Kernel

The **kernel** is the set of vectors of $V$ that are mapped onto the zero vector of $W$

> [!danger] Incomplete, also this is stuff we've covered in lin alg

