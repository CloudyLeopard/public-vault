A [[Unsupervised Machine Learning#Clustering|clustering]] algorithm (distance based)

> [!important] **Not** K-Nearest Neighbors
> KNN starts with dataset that is already classified. KMeans is an *[[Unsupervised Machine Learning]]* algorithm.

**K-Means** Algorithm:
1. place $K$ **centroids** (or cluster centers) at some initial location
2. Determine the nearest centroid for each data point in the dataset.
3. Calculate distance of all data points from their nearest centroid
4. Sum all these distances
5. Adjust location of centroids such that total distance of all points from centroids decrease
6. Iteratively do this until total distance / centroid location no longer move

Loss function: [[Distortion]]

![[k_means_animation_6cdd31d106.gif|500]]

**Lloyd's Algorithm**: fast K-means
1. Initialize centroids: Randomly choose k data points as initial centroids.
2. Greedy assignment step: For each data point, assign it to the nearest centroid (locally minimizing the squared distance for that point).
3. Greedy update step: For each cluster, recompute the centroid as the mean of all points assigned to it (locally minimizing within-cluster distortion).
4. Repeat until convergence: Continue reassigning points and updating centroids until the assignments stop changing or the change in distortion is very small.

## Hyperparameters

$k$: number of clusters you want
Initial centroid location (default is random)
- changing this helps with getting stuck in local minima
- though the impact isn't *thaaaaat* big
Distance metric (default is Euclidean Distance)

## Problem: Getting Stuck in Local Minimum

Suppose cluster centers are initialized at random

They could get fenced in: there is no way to move such that distortion would go down
- centroids get stuck --> local minima

Solution:
1. run 100 times and pick the one with the lowest distortion
2. **KMeans++**

> [!info] KMeans++
> Initialize centroids at [[Continuous Uniform Distribution|uniform density]]
> By putting uniform distribution over cluster centroids --> spreads initial placement of centroids out, reducing chance of poor clustering

## Finding Optimal Number of Clusters

KMeans Clustering tell sus
1. optimal location of cluster centers (centroids)
2. labeling the data using the centroids

But we don't know the cluster centers. There's two methods

### Elbow Method

### Silhouette Method

