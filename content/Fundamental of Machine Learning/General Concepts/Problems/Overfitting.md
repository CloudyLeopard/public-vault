---
aliases:
  - overfit
---

Model overfits on data noise. Usually on the [[Train Test Split|training set]], resulting in the model simply memorizing on the training data but not actually generalizing, so will perform poorly on unseen data.

We can prevent this with [[Train Test Split|cross validation]].

> [!info] [[Collinearity]] and Overfitting
> The common point between collinearity and overfitting is that the fit regression model is too **sensitive/unstable**. 
> - The estimated $\beta$'s is highly dependent on the training set
> - Even small changes in the training set (i.e. a different sampling, removing a few rows) can result in **very different $\beta$ estimates**
> - [[Variance]] of the unbiased estimators is high