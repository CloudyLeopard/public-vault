[[Linear Regression]], except the model looks at multiple predictors.

For every new predictor/feature, 
1. add a [[Linear Algebra (ML)#Vectors|column vector]] to the **predictor matrix** $X$
2. add a coefficient $\beta_i$  to the weight vector $\bf{\beta}$

Adding predictors increase the **variance of the outcomes explained** by the regression model (often measured by $R^2$ (see [[R-Squared]])). This should make sense because you have more variables now.

Regression coefficient $\beta_i$ tell us how much a predictor affects the outcome, assuming other predictors are kept constant. In other words, $\beta_i$ tells us how important is variable $x_i$ **alone**?

> [!important] Coefficients are directly explainable!
> Suppose we have $\beta_0=-10.2, \beta_1=0.104, \beta_2=-1.57$. We can directly interpret that predictors $x_0, x_2$ has a negative correlation with the output.

## Linking Function

$$y = \beta_0 + \beta_1x_1+\beta_2x_2+\ldots$$
## Math

The same model equation from linear regression applies
$$\bm{y}=\bm{X\beta}+\bm{e}$$
When there is one predictor, we have:
$$X = 
\begin{bmatrix}
1 & x_{11} \\
1 & x_{21} \\
\vdots & \vdots \\
1 & x_{n1}
\end{bmatrix},
\quad
\bm{\beta} = 
\begin{bmatrix}
\beta_0 \\
\beta_1
\end{bmatrix},
\quad
\bm{y} = 
\begin{bmatrix}
y_1 \\
y_2 \\
\vdots \\
y_n
\end{bmatrix}
$$
When we want to add a predictor, the math is as simple as adding a column vector and a weight to multiply the new variable:
$$
X = 
\begin{bmatrix}
1 & x_{11} & x_{12} \\
1 & x_{21} & x_{22} \\
\vdots & \vdots & \vdots \\
1 & x_{n1} & x_{n2}
\end{bmatrix},
\quad
\boldsymbol{\beta} = 
\begin{bmatrix}
\beta_0 \\
\beta_1 \\
\beta_2
\end{bmatrix}
$$
To fit the model:
$$y = \beta_0 + \beta_1 x_1 + \beta_2 x_2$$

## Geometric Interpretation

This corresponds to a [[Analytic Geometry (ML)#Vector Projection|projection]] onto the [[Linear Algebra (ML)#Vector Space|column space]] of $X$ (a plane for two predictors, a hyperplane for 3 predictors, etc.)

> [!danger] I don't understand this slide
> ![[regression_flavor_10.png]]


## Measuring Performance

[[Root Mean Squared Error|RMSE]]
[[R-Squared|R^2]]

## Collinearity Problem

[[Collinearity]]

# Latex Commands
$\newcommand{\bm}{\boldsymbol}$