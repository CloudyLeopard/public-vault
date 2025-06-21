---
aliases:
  - multicollinearity
---
**Collinearity** is when two independent variables are highly correlated with each other. **Multi-collinearity** is when multiple independent variables are highly correlated with each other.

Because predictors are correlated, adding a predictor *does not give the model any new information*. Instead, you are just padding information the model already knows. In fact, collinearity may even **introduce more variance**.

When predictors are highly correlated, it's hard to [[Multiple Regression|isolate the effect of each one]].

> [!info] Collinearity and [[Overfitting]]
> The common point between collinearity and overfitting is that the fit regression model is too **sensitive/unstable**. 
> - The estimated $\beta$'s is highly dependent on the training set
> - Even small changes in the training set (i.e. a different sampling, removing a few rows) can result in **very different $\beta$ estimates**
> - [[Variance]] of the unbiased estimators is high
## Mathematical Explanation

If two features are collinear, it's as if the two dimensions are the same
See [[Linear Algebra (ML)#Linear Combination]]

two collinear dimensions is basicaly just one dimensino, and how can you project $y$ onto just one dimension
> [!warning] double check on this

