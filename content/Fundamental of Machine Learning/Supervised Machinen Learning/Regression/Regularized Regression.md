---
aliases:
  - L1 Regularization
  - L2 Regularization
---

Problem: when we have [[Multiple Regression|multiple predictors]], we have issues with [[Collinearity]] and [[Overfitting]]. **Regularized Regression** attempts to address these issues

The common point between collinearity and overfitting is that the fit regression model is too **sensitive/unstable**. 
- The estimated $\beta$'s is highly dependent on the training set
- Even small changes in the training set (i.e. a different sampling, removing a few rows) can result in **very different $\beta$ estimates**
- [[Variance]] of the unbiased estimators is high

> [!Example] Best Linear Unbiased Estimator (BLUE)
> $$OLS: \min||\bm{y}-X\bm{\beta}||^2$$
> [[Linear Regression|OLS]] finds you the best $\beta$ that minimizes [[Residual Sum of Squares|RSS]] in the *training set*. But, we don't care about the training set... we want the $\beta$'s to generalize on *new data*.

Regularization adds a constraint (**regularization term**) that biases the estimator a little, but reduces variance a lot. Intuitively, we introduce [[Bias]] on purpose to reduce variance.

> [!important] Regularization Term/Constraint Penalizes Large $\beta$'s values
> Intuitively, regularization cuts down betas that stick out; we do not believe $\beta$ can be that large.
> simpler curves are more robust to outlier points

> [!note]- Overview of Regularized Regression
> ![[overview of regularized regression.png]]
## General Form

From [[Linear Regression]] to Regularized Regression
$$\beta^* = \underset{\beta}{\text{argmin}} \left[ \sum_{i=1}^n (Y_i - f(X_i; \beta))^2 + \lambda \cdot \Omega(\beta) \right]$$
Where $\Omega(\beta)$ represents the regularization function.
- the expression inside the brackets is the **loss function**

Most used forms of regularized regression:
- Ridge Regression ($L_2$)
- LASSO Regression ($L_1$)
## L2 Regularization (Ridge Regression)

This is a constrained optimization problem:

$$\min ||\bm{y}-X\bm{\beta}||^2 \text{, subject to } (||\bm{\beta}||_2)^2\leq c^2$$
$c$ = some (hyperparameter) number which serves as a constraint

> [!info] $||\bm{\beta}||_2^2 = \beta_1^2+\beta_2^2+\ldots$ = (squared) [[Analytic Geometry (ML)#General Vector Norms|L2 norm]] of the vector $\bm{\beta}$

> [!warning] Apparently $c$ is similar to how lagrange multipler works, but idrk

Essentially, we penalize large coefficients by adding a term to the loss function
$$
\begin{align*}
\beta^* &= \underset{\beta}{\text{argmin}} \left[ ||\bm{y}-X\bm{\beta}||^2 + \lambda \cdot ||\beta||^2 \right]\\
&= (X^TX+\lambda I)^{-1}X^T\bm{y}
\end{align*}$$
> [!note] Difference to [[Linear Regression|OLS]]
> In the matrix form, we have an additional $\lambda I$, which is essentially a [[Linear Algebra (ML)#Matrices|Diagonal Matrix]]. This is why this method is called **ridge** regression
>
> instead of minimizing RMSE, we now minimize and some coefficient norm (which adds penalty for generating large coefficients)

### Result of L2 Regularization

"The length of $\bm{\beta}$ is shorter than a constraint from the $L_2$ norm, making all $\beta_i$ smaller (but never zero)"
- "length of $\beta$": the [[Analytic Geometry (ML)#General Vector Norms|L2 Norm]] of the coefficient vector, $\bm{\beta}$
- "is shorter than a constraint from $L_2$ norm": $||\beta||_2^2 \leq c^2$ (see visualization below)
- "making all $\beta_i$ smaller": **L2 penalty shrinks all coefficients toward zero**
- "but never zero": Unlike [[Regularized Regression#L1 Regularization (LASSO Regression)|L1 Regression]], coefficients are never set to zero (i.e. removed); only their magnitudes are reduced
### Visualization

(Assume we have a multi-regression with 2 predictors)

![[Ridge Regression Visualization.png|500]]

Our solution (i.e. the parameters) has to be within the green circle, but also has to minimize [[Residual Sum of Squares|RSS]]

> [!note] Intuitions
> - $\beta_1^2 + \beta_2^2\ \leq c^2$: ensures the betas cannot be too big (hence the circle)
> - Bottom of 2D blue parabola that is the *minimal* [[Residual Sum of Squares|RSS]], where the x value is optimal $\beta_1$ and y value is optimal $\beta_2$. Can't use it though because its not in the green circle

### Solving Objective Function

![[Solving L2 Objective Function.png]]
## L1 Regularization (LASSO Regression)

**LASSO**: Least Absolute Shrinkage and Selection Operator

The constrained optimization problem is:

$$\min ||\bm{y}-X\bm{\beta}||^2 \text{, subject to } (||\bm{\beta}||_1)\leq c^2$$
> [!info] $||\bm{\beta}||_1 = |\beta_1|+|\beta_2|+\ldots$ = [[Analytic Geometry (ML)#General Vector Norms|L1 norm]] of the vector $\bm{\beta}$

$$\beta^* = \underset{\beta}{\text{argmin}} \left[ ||\bm{y}-X\bm{\beta}||^2 + \lambda \cdot ||\beta||_1 \right]$$
$\beta^*$ for LASSO regression is not convex, so it cannot be solved in closed form like L2

$\beta^*$ can be found using numerical methods, like coordinate descent or LARS (least angle regression)

### Result of L1 Regularization

"Length of $\bm{\beta}$ is shorter than some constraint according to $L_1$ norm, by setting individual $\beta_i$ to zero"
- L1 Penalty Term $\lambda||\bm{\beta}||_1$ constraints length of $\bm{\beta}$ to be less than some number: $||\bm{\beta}||_1 \leq c$ 
- LASSO **sets collinear $\beta$ to 0, and only keep the useful $\beta$**. In other words, it's a **feature selection method**.

### Visualization

![[LASSO Regression Visualization.png|500]]

Essentially ensures the L1 norm of $\bm{\beta}$ is less than $c$, and while ensuring that constraint minimize [[Residual Sum of Squares|RSS]]

## $\lambda$ term in $L_1$ and $L_2$ Regression

$\lambda$ is a hyperparameter that affects the betas
- The optimal $\lambda$ comes from hyperparameter tuning by user
- Hyperparameter tuning is done by [[Train Test Split|validation set]]
- Is a non-negative number between $(0, \infty)$
> [!note] $\lambda=0$ just means no regularization

- tuning range of $\lambda$ constrained by **domain knowledge**, or what you know about what you are trying to research
 
 # Latex Commands
$\newcommand{\bm}{\boldsymbol}$