**Blessing of Dimensionality**: If the dataset can't be linearly separated by a hyperplane in the original space, we can *transform this space into a higher dimensional space by creating synthetic features*
- Example: squaring the original feature
- Hopefully, data becomes linearly separable in higher dimensional space

![[blessing of dimensionality.png|400]]

Mathematically, we look for mapping $\phi$ 
$$\bm{x} \rightarrow \phi(\bm{x})$$
Where $\phi(\bm{x})$ is of a higher dimensionality than $\bm{x}$, which we can (hopefully) apply a linear classifier on

**Problem**: we do not know what mapping $\phi$ would work, and it is too expensive to try and compute every mapping function (if not impossible when the dimension is huge)

**Kernel Trick**: we use **kernel functions** (aka **kernels**) that allow us to work in higher dimensional space *without* doing the transformation 
- i.e. instead of transforming the data, we just apply a kernel function on the data that mimics the transformation

Common Kernel Functions:
$$\begin{align*}
\text{linear}&: K(\bm{x}_i, \bm{x}_j) = \bm{x^T}_i\bm{x^T}_j\\
\text{polynomial}&: K(\bm{x}_i, \bm{x}_j) = (1+\bm{x^T}_i\bm{x^T}_j)^\gamma\\
\text{gaussian}&: K(\bm{x}_i, \bm{x}_j) = e^{-i\gamma(\bm{x}_i-\bm{x}_j)^T(\bm{x}_i-\bm{x}_j)}
\end{align*}$$

# Latex Commands
$\newcommand{\bm}{\boldsymbol}$
