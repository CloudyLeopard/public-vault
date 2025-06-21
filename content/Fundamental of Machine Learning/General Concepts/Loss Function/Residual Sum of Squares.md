---
aliases:
  - RSS
---
**Residual Sum of Squares**, or **RSS**

$$RSS = \sum_{i=1}^n e_i^2 = \sum_{i=1}^n (y-\hat y)^2$$

Critical assumption: Residuals are [[Normal Distribution|normally distributed]]

> [!info] Why RSS?
> Sum of squared differences is an attractive loss function because it has a **1 global min** and is a **convex** function. Though there are other loss functions that can be used (e.g. sum of absolute differences).
> 
> ![[RSS vs other loss functions.png]]

