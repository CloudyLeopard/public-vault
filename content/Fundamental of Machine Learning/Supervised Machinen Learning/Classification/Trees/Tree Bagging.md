---
aliases:
  - Bagging
  - Random Forest
---
An ensemble trees strategy: 
1. Start with several *full-grown* [[Decision Tree]]
	- Every single tree will *memorize **their** training data*; each individual unit will have high variance
2. We **blue** the many individually *[[Overfitting|overfit]]* trees by averaging
	- This effectively aggregates their prediction in parallel

This method allows us to reduce variance of ensemble while keeping [[Bias]] low

**Bagged** Tree: **B**ootstrapped **Agg**regated **E**nsemble of **D**ecision Trees
Training
We create $n$ trees (~20-200)
1. Create a [[Bootstrapping|bootstrapped]] dataset (creates an **in-bag** and **out-of-bag** set).
2. Train on **in-bag** set
	- When each tree makes a [[Decision Tree#Growing The Tree|split]], algorithm *selects a random subset of features* to increase the column (instead of bootstrapping rows, we bootstrap the columns)

> [!important] Selecting Random Subset of Data and Features
> Selecting subsets of training data at random --> helps with [[Overfitting]]
> 
> Selecting subsets of features at random --> helps decorrelate the trees (we force each tree to make splits differently (with different features), rather than end up with very similar trees)

Testing (**Aggregating**)
1. After all the trees are created, run points from **out-of-bag** set through all of the classification trees for which it is out-of-bag
2. Forest's classification is the **modal** classification made by the individual trees
	- modal classification: equal voting power of each tree

![[ensemble slide deck 7.png]]

## Results

Out of bag classification error decreases with the number of trees bagged

![[out-of-bag classification error graph.png|400]]

This is because it leverages the same principle as [[Central Limit Theorem]] (surprisingly this comes back again)
- Integrating independent information to cancel random error
- Also why we don't need a *huge* number of trees (after a certain point CLT's blessing stops)

Random forest tends ti yield "patchwork" solutions

![[random forest result patchwork.png|400]]


