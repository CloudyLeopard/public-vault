---
aliases:
  - Principal Component Analysis
  - PCA
---
A [[Unsupervised Machine Learning#Dimensionality Reduction|Dimensionality Reduction method]]

General Idea:
**Data** --> **Covariance Matrix** --> **Factor Extraction** (on [[Covariance Matrix]])

> [!important] What does PCA do?
> PCA performs dimensionality reduction by finding principal components (new axes) that points in the direction of *maximum variance* in the data
>
> Hence we are finding eigenvectors of covariance matrix!
> - eigenvectors -> direction in feature space where variance is maximized
> - eigenvalue -> how much variance in that direction

PCA finds [[Linear Algebra (ML)#Basis|orthonormal basis]] and [[Analytic Geometry (ML)#Vector Projection|projects]] data onto the basis
1. Start with a dataset that has (many) [[Collinearity|correlated]] features/variables
2. [[Normal Distribution|Z-score]] the data

> [!important] PCA works better on normalized data
> If data is not normalized, the variables with the larger scale will DOMINATE
> PCA maximizes [[variance]]; without standardization, eigenvalue is not interpretable
>
> A more subtle point, looking at the normalization formaul
> $$z = \frac{x-\mu}{\sigma}$$
> 
> Subtracting mean $\mu$ -> ensures PCA axes' origin is 0

3. Compute the **[[Covariance Matrix]]**
4. Find the [[Eigendecomposition|Eigenvectors]] of the covariance matrix
	- become basis vectors of the orthonomal basis that PCA projects data to
	- Eigenvectors' eigenvalues correspond to how much variance is accounted for by respective vector
	- PCA finds eigenvectors that (if projected onto) will *maximize the projected data's [[variance]]*
5. Project the data on **Principal Components (PCs)**
	- Project data on first eigenvector, called the *first principal component*
	- Then project data on next eigenvector that (if projected onto) has the next highest variance; called the *second principal component*; PC2 is orthogonal to PC1
6. Use as many PCs as needed to capture an acceptable proportion of variance in original data
	- Proportion = sum of eigenvalues of retained PCs vs overall sum of all eigen values (if z-scored)

![[principal component analysis (2d).png|500]]

In essence, PCA finds *coefficients of a [[Linear Algebra (ML)#Linear Combination|linear combination]]* of original variables ($X_1, X_2, \ldots$) that *maximizes captured variance*
$$P = a_1X_1 + a_2X_2+a_3X_3+\ldots+a_nX_n$$
Where $\mathbf{a} = [a_1, a_2, \ldots, a_n]$ is an eigenvector of the covariance matrix; it *points in the direction of maximum variance*

> [!info] Kaiser Criterion
> "Keep only the components with eigenvalues greater than 1."
> An eigenvalue of 1 means the component explains as much variance as one original variable.
## PCA maximizes variance *only*

PCA is blind to class labels

"It yields a transformation of the correlated input data into an lower-dimensional space that represents most of the information in the data with as few orthogonal variables as possible"

This could have bad consequences for [[Classification]] tasks

## PCA Use Case

(very similar to [[Singular Value Decomposition (ML)|SVD]])

PCA works very well if primary objective is actual dimension reduction (i.e. reducing redundant information, especially when class labels are missing)

Helps with data compression and feature *extraction*

But because it only maximizes dimensions that optimize variance accounted for, it can compromise use cases (like when you know the labels)