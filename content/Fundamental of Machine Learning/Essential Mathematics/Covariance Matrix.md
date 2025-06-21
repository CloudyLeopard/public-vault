
**Covariance matrix** captures how much each pair of feature in data varies together
- it literally tells you covariance between a feature and another feature in the matrix

We can construct it using [[Linear Algebra (ML)]]

$$
C = M^TM =
\begin{bmatrix}
\text{Var}(X_1) & \text{Cov}(X_1, X_2) & \cdots & \text{Cov}(X_1, X_n) \\
\text{Cov}(X_2, X_1) & \text{Var}(X_2) & \cdots & \text{Cov}(X_2, X_n) \\
\vdots & \vdots & \ddots & \vdots \\
\text{Vov}(X_n, X_1) & \text{Cov}(X_n, X_2) & \cdots & \text{Var}(X_n)
\end{bmatrix}
$$

Where $M \in \mathbb{R}^{m\times n}$
- $m$: number of samples; each row is a sample
- $n$: number of features; each column is a feature
	- $X_1, X_2, \ldots, X_n$ refers to individual features in dataset

> [!info] Eigenvector points in the direction where variance is maximized
> yea idk how this works but it just does
> 
> And eigenvalue is the amount of variance captured by the eigenvector; so the eigenvector with the highest eigenvalue points in the direction of maximum variance


