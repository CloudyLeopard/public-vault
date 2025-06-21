---
aliases:
  - MDS
---

A nonlinear [[Unsupervised Machine Learning#Dimensionality Reduction|dimensionality reduction method]]

A nonparametric method, i.e. no fixed [[Linear Algebra (ML)#Linear Mappings|mapping]] between inputs and outputs

Transform data into distance (similarity / affinity) matrix by:
1. computing all distances between all data points
2. place same data points in lower dimensional space (# dimensions = hyperparameter)
3. compute **stress**
4. iterative move points in lower dimensional in a way that reduces stress
5. keep doing this until stress drops under some threshold (ideally 0)

$$\text{Stress} = \sqrt{ \frac{ \sum_\limits{i<j} \left( d_{ij} - \hat{d}_{ij} \right)^2 }{ \sum_\limits{i<j} d_{ij}^2 } }$$
(kinda similar to [[Residual Sum of Squares|RSS]])

> [!important] MDS does two things:
> 1. Determine what dimensions matters in a person's mind
> 2. Map the datapoint onto that dimension

MDS uses actual distance, and each data point is *mapped to a new datapoint in the new dimensional space*

MDS will, quite literally, create a *map* using pairwise distances between all points
- could even create a *mental map* based on *your perceived similarity/distance between all points*

The dimensions are also interpretable
- suppose the pairwise distance is perceived similarity; different people will determine similarity differently
- meaning the MDS map that's created is different. axis could mean different thing; even the number of dimensions could be different

Problem: for some problem, we know the true metric space (e.g. we are putting distance between cities into MDS); for most problems, we don't know the true metric space.

## Downsides

MDS work best if dataset is small; complexity is $O(n^2)$

MDS preserve pairwise high-dimensional distances in lower-dimensional space

There might be *no configuration of points in a lower dimensional space that preserves the distances in the higher dimensional space sufficiently*
- Stress cannot be reduced past a certain point

E.g. trying to create an MDS map of five global cities location on 2D; quite literally impossible because earth is not flat