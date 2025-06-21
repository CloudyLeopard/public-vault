Special case of [[Multiple Regression]]

The relationship between predictors and outcomes is modeled as a $n^{th}$ degree polynomial, thus **nonlinear with respect to** $\bm{x}$

## Linking Function

$$y=\beta_0 + \beta_1x_1+\beta_2x_2^2+\beta_3x_3^3+\ldots+\beta_nx_n^n+\epsilon$$

> [!important] Still considered [[Linear Regression]]
> This is because polynomial regression is still linear **with respect to its parameters**. It is strictly a [[Linear Algebra (ML)#Linear Combination|linear combination]] of its parameters (i.e. the $\beta$'s are still linear/no powers)
>
> An example of non-linear regression will be like this:
> $$y = \beta_0e^{\beta_1x}$$
## Overfitting problem

By increasing the number of degrees, the model will reduce [[Root Mean Squared Error|RMSE]]. However, the model is actually not generalizing new information, but instead [[Overfitting]] on noise in the data.

![[regression_flavor_14.png|500]]


# Latex Commands
$\newcommand{\bm}{\boldsymbol}$