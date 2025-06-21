One of the [[Essential Mathematics]] in Machine Learning, built on top of [[Linear Algebra (ML)|linear algebra]] and [[Calculus (ML)|calculus]]

## Gradient

Collects all [[Calculus (ML)#Partial Derivative|partial derivatives]] of a function $f$ in a [[Linear Algebra (ML)#Vectors|vector]]
$$grad\ f = \nabla_xf = \frac{df}{d\bm{x}}$$
$$\nabla_xf = \left[
\frac{\partial{f(\bm{x})}}{\partial{x_1}}\
\frac{\partial{f(\bm{x})}}{\partial{x_2}}\
\dots\
\frac{\partial{f(\bm{x})}}{\partial{x_n}}
\right]$$
Note: $\nabla$ is "\nabla" in latex
Note: $\bm{x}$ is a *vertex*.

## Jacobian

What if a function not only has multiple input variables, but also multiple outputs?

The Jacobian ([[Linear Algebra (ML)#Matrices|matrix]]) collects all first order derivatives of such a function and arranges them in a matrix $\bm{J}$.

Example:
> [!danger] Incomplete

## The Chain Rule

Allows us to take the derivative of composite functions

$$\frac{d}{dx} f(g(x)) = f'(g(x))g'(x)$$
or
$$\frac{df}{dx} = \frac{df}{dg}\frac{dg}{dx}$$

# Latex Commands
$\newcommand{\bm}{\boldsymbol}$