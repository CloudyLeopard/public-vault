Basic Linear Algebra
Basic Calculus
Basic Probability
## Installation
Jupyter lab

Pytorch example: https://nextjournal.com/gkoehler/pytorch-mnist

## Basic Linear Algebra

### Matrix Multiplication

...

```python
A = np.array([[1, 7], [2, 4]])
B = np.array([[3, 3], [5, 2]])
np.matmul(A, B)
A * B # element wise multiplication
```


### Tensor
**https://www.tensorflow.org/guide/tensor** - this basically covers all the things i want to know to use tensor in machine learning

**Tensor Shape**
![[tensor shape.png]]

![[tensor shape 3 axis.png]]

Examples of using tensor: first axis defines how many images in a batch, second and third axis describes the other dimensions of an image

## Basic Calculus

### Partial Derivatives
Useful for multivariate functions

### Gradients
The gradient of a scalar-valued multivariable function $f(x, y, ...) \rightarrow \mathbb{R}^4$ defined over 10 variables, defined by $\nabla f$ and it packages blah blah blah

> [!warning] fill in notes here

Gradient really means:
$$\text{Gradient} = \frac{\text{Change in } x}{\text{Change in } y}$$
$$\text{Gradient} = \frac{f(x+\Delta x) - f(x)}{\Delta x}$$
It collects all partial derivatives of a function $f$ in a vector
$$grad\ f = \nabla_xf=\frac{df}{dx}$$
$$\nabla_x f=\left[\frac{\partial f(\mathbf{x})}{\partial x_1}\ \frac{\partial f(\mathbf{x})}{\partial x_2}\ \dots\ \frac{\partial f(\mathbf{x})}{\partial x_n}\right]$$
### Chain Rule
If $f$ and $g$ are both differentiable and $F(x)$ is the composite function defined by $F(x) = f(g(x))$ then $F$ is differentiable and $F'$ is given by the product
$$F'(x) = f'(g(x))g'(x)$$



## Probability
### Moments