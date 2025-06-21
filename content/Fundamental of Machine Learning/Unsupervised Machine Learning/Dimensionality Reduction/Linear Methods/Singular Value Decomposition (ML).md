---
aliases:
  - Singular Value Decomposition
  - SVD
---
A [[Unsupervised Machine Learning#Dimensionality Reduction|Dimensionality Reduction method]]

SVD is a more general factorization than [[Eigendecomposition]] that works on *any* $M \in \mathbb{R}^{m\times n}$  uniquely (up to sign ambiguities) into **readily interpretable component matrices**

$$\underbrace{M}_{m \times n} = 
\underbrace{U}_{m \times m} 
\underbrace{S}_{m \times n} 
\underbrace{V^T}_{n \times n}$$
Where
- $m$ = number of samples, $n$ = number of features
- $U$ is an [[Linear Algebra (ML)#Matrices|orthogonal matrix]] (it "rotates")
- $S$ is a [[Linear Algebra (ML)#Matrices|diagonal matrix]] (it "stretches")
- $V^T$ is an [[Linear Algebra (ML)#Matrices|orthogonal matrix]] (it "rotates")

[[Linear Algebra (ML)#Vectors|Column vectors]] of $V$ are directions in feature space, tells you how to **rotate and align** original features to uncorrelated axis

Singular values $S$ indicate how important each direction in $V$ is (larger singular value = more variance captured in that direction)

> [!info] By convention, after SVD, $S$ is ordered in decreasing order
> This ensures uniqueness. So the larger singular value (and corresponding $V$ columns that are more important) comes first.

$US$: representation of data in new feature space (sample's low-dimensional encoding)

## Example: Image Compression

First, decompose the image matrix
$M = U S V^T$

Then, truncate the SVD to only keep the top $k$ singular values and corresponding vectors
$M_k = U_k S_k V_k^T$
- $U_k \in \mathbb{R}^{m \times k}$
- $S_k \in \mathbb{R}^{k \times k}$
- $V_k^T \in \mathbb{R}^{k \times n}$

Finally, reconstruct the image
Multiply the truncated matrices to get a compressed version:
$\tilde{M} = U_k S_k V_k^T$
- This reconstructed image is visually similar to M, especially if k is large enough.
- But it requires much less storage.

![[svd image compression.png]]


## SVD Use Case

(very similar to [[Principal Component Analysis (ML)|PCA]])

SVD works very well if primary objective is actual dimension reduction (i.e. reducing redundant information, especially when class labels are missing)

Helps with data compression and feature *extraction*

But it can compromise use cases like when you actually know the labels