A nonlinear [[Unsupervised Machine Learning#Dimensionality Reduction|dimensionality reduction method]]

Uniform Manifold Approximation and Projection for Dimension Reduction

How UMAP works:
- compute topological representation of high-dimensional data as a fuzzy simplicial set
- identify k nearest neighbors of each data point
- create low-dimensional representation of the data
- optimize representation (by moving points around) so that it preserves simplicial topological structure of the high dimensional data as much as possible, reducing [[Cross-Entropy Loss]]

## Assessment of UMAP
- Makes use of topological concepts to represent data, **preserves overall structure of data better** and yields more **consistent result** when ran repeatedly (compare [[Stochastic Neighbor Embeddings|t-SNE]])
- faster than t-SNE $O(n\log n)$
- makes nice "archipelago-like" pictures
- downside
	- relatively large number of hyperparameters
		- number of neighbors
		- repulsion strength
		- sensitivity to noise and extreme values
	- lack of metric to assess quality of low-dimensional embedding
	- need to validate meaning of distances and dimensions of low D solution