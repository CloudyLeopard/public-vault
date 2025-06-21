
Loss function of [[K-Means]]

$$L = \sum_{i=1}^{k} \sum_{x \in C_i} \|x - \mu_i\|^2$$
- $x$ = a data point
- $k$ = number of clusters
- $C_i$: $i$th cluster (set of data points assigned to cluster $i$)
- $\mu_i$: centroid of cluster $i$


Issues:
- no analytical solution
- not convex (prone to local minima)
