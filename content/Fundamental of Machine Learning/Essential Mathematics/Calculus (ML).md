One of the [[Essential Mathematics]] in Machine Learning

## The Difference Quotient

Basic idea: rise over run (rise / run). We assume that the "rise" is constant over the "run"
$$\frac{dy}{dx}:=\frac{f(x+dx)-f(x)}{dx}$$
![[the difference quotient.png|500]]

## Derivative

Found by taking $dx$ tiny, or $dx \rightarrow 0$. Assuming the function is differentiable everywhere, the **derivative** of $f$ at $x$ is given by the limit:
$$\frac{df}{dx} := \lim_{h\rightarrow 0}\frac{f(x+h)-f(x)}{h}$$
for $h>0$

## Partial Derivative

Defined by the symbol $\partial$, pronounced "del" and stands for partial. It is *not* the same as $\delta$.

$$\frac{\partial{f}}{\partial{x}}(x,y), \frac{\partial{f}}{\partial{y}}(x,y)
$$

![[partial derivative graph.jpeg|400]]

Note: this matters because we have a surface in *2* dimensions.
Note: when we "walk" in one direction, the other direction is *constant*.