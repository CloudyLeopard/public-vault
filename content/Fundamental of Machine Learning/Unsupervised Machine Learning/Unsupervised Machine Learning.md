In [[Supervised Machine Learning]] we always had labeled data

What if we do not have labeled training data?

## Dimensionality Reduction

In a dataset, what matters is the amount of [[Independence|independent]] information in the dataset
[[Collinearity|Correlated information is redundant]]

Methods to deal with this:
- Feature selection (example: [[Regularized Regression|LASSO Regularization]] set features to 0)
- **Feature Extraction**

Feature extraction: reveal (independent) **latent factors** underlying the data
### Linear Methods

[[Singular Value Decomposition (ML)]]
[[Principal Component Analysis (ML)]]
[[Linear Discriminant Analysis]]

### Nonlinear Methods

Linear methods try to create a new (low-dimensional) space in which high-dimesional data is embedded such that distances, similarities, or neighbors among high-dimesional data is maximally preserved

[[Multi-Dimensional Scaling]]
[[Stochastic Neighbor Embeddings]]
[[UMAP]]
[[Autoencoder]]
## Clustering

Once you have applied dimension reduction, the data likely "cluster" now in the low-dimensional space (for t-SNE and UMAP in particular)

Intuition: members of cluster (or natural group in data) are similar to each other, but dissimilar from members of other groups/clusters

[[K-Means]] (distance-based)
[[Gaussian Mixture Models]]
[[DBScan]] (density-based)
[[Hierarchical Clustering]]
[[Kohonen Networks]]