One of the [[Essential Mathematics]] in Machine Learning

## Dot Product

**Dot product** (also known as **scalar product**) of $\boldsymbol{x}, \boldsymbol{y}\in {R}^n$ is defined as:
$$\boldsymbol{x}\cdot \boldsymbol{y} = \boldsymbol{x^T}\boldsymbol{y} = \sum_{i=1}^{n}x_iy_i = \alpha$$
Notes:
- $\boldsymbol{x^T}\boldsymbol{y}$ is the ML notation for dot product
- $x_i$, $y_i$ are elements of $\boldsymbol{x, y}$

## Vector Length

Geometric application of the dot product: The dot product can be used to determine the length of a vector $\boldsymbol{a}$ (pretty much pythagorean theorem)

$$\boldsymbol{a^T}\boldsymbol{a} = \sum_{i=1}^{n}a_ia_i = \sum_{i=1}^{n}a_i^2 = \Vert \boldsymbol{a} \Vert^2$$
$\Vert \boldsymbol{a} \Vert^2$ is called the **magnitude** of the vector, the **vector length**, and the **Euclidean norm**.

> [!info] Using dot product saves time
> In higher dimension, dot product saves time in than writing your own pythagorean theorem.

## The Unit Vector

> [!danger] Incomplete

## General Vector Norms

**Norms** are functions that determine/assign a length to a vector

In general:
$$\Vert\boldsymbol{x}\Vert_p = \left(\sum \vert x\vert^p\right)^{1/p}$$

| Norm                                         | Description                                                                      | Formula                                     |
| -------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------- |
| $L_1$, or $\Vert\boldsymbol{x}\Vert_1$       | Sum of absolute values                                                           | $\sum \vert x\vert$                         |
| $L_2$, or $\Vert\boldsymbol{x}\Vert_2$       | Square root of sum of squared absolute values<br>or **magnitude**/Euclidean norm | $\left(\sum\vert x\vert^2\right)^{1/2}$     |
| ...                                          | ...                                                                              | ...                                         |
| $L_{30}$, or $\Vert\boldsymbol{x}\Vert_{30}$ |                                                                                  | $\left(\sum\vert x\vert^{30}\right)^{1/30}$ |

## Geometric Implication of the Dot Product

Generally speaking, the dot product is the cosine of the angle between two vectors, times their length:
$$\boldsymbol{a^T}\boldsymbol{b} = \Vert\boldsymbol{a}\Vert\Vert\boldsymbol{b}\Vert\cos\theta_{ab}$$
Solving for cosine of the angle, we get:
$$\cos\theta_{ab} = \frac{\boldsymbol{a^T}\boldsymbol{b}}{\Vert\boldsymbol{a}\Vert\Vert\boldsymbol{b}\Vert}$$
Implications for geometric relationship between two vectors:
- If cosine is 1, the vectors point in the same direction, or they are **[[Collinearity|collinear]]**
- If the cosine is positive, the angle between the vectors is acute
- If the cosine is negative, the angle between the vectors is obtuse
- if the cosine is 0, the vectors are **orthogonal**

### Cosine Similarity

**Cosine similarity** conceptualizes the similarity of two vectors $\boldsymbol{a}$ and $\boldsymbol{b}$ in terms of the angle $\theta$ between them, regardless of their length (or their dimensionality)

$$\text{cosine similarity} = \cos\theta_{ab} = \frac{\boldsymbol{a^T}\boldsymbol{b}}{\Vert\boldsymbol{a}\Vert\Vert\boldsymbol{b}\Vert}$$

Intuitively this should make sense: 
- $\cos(0\degree) = 1$, meaning two vectors are the most similar
- $\cos(90\degree) = 1$
- $\cos(180\degree) = -1$, meaning two vectors are the least similar

![[cosine similarity.png]]

## Vector Projection

An important application is to project a *data* point $\boldsymbol{b}$ onto a subspace (usually a line, a plane, or a **hyperplane**). 

For now, let's start with the line $\boldsymbol{a}$. Vector projection is the shadow of one vector onto another. Formally, the projection of vector $\boldsymbol{b}$ onto $\boldsymbol{a}$ is the part of $\boldsymbol{b}$ that points in the direction of $\boldsymbol{a}$.

We are looking for a scale factor $\beta$ such that $\beta \boldsymbol{a}$ is as close as possible to $\boldsymbol{b}$ without leaving $\boldsymbol{a}$.
![[vector projection.png]]

Notice that $(\bm{b} - \beta\bm{a}) \perp \bm{a}$, meaning the [[Analytic Geometry (ML)#Dot Product|dot product]] between them is 0. We can use this to solve for $\beta$:

$$
\begin{align*}
(\bm{b}-\beta\bm{a})^T\bm{a}&=0\\
\bm{a^T}(\bm{b}-\beta\bm{a})&=0\\
&\ldots\\
\beta=\frac{\bm{a^T}\bm{b}}{\bm{a^T}\bm{a}}
\end{align*}
$$
Therefore, the projection of a point $\bm{b}$ onto a line $\bm{a}$ is:
$$\text{proj}_{\bm{a}} \bm{b} =\beta\bm{a}= \frac{\bm{a^T}\bm{b}}{\bm{a^T}\bm{a}} \bm{a}$$

Vector projection illustration:
![[vector projection illustration.png]]
## Matrix Multiplication

> [!danger] incomplete

## Determinants

> [!danger] incomplete

## Tensors

> [!danger] Incomplete


# Latex Commands
$\newcommand{\bm}{\boldsymbol}$