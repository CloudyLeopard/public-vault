---
aliases:
  - Neural Network
---

Type of [[Classification]] algorithm (also can do [[Regression]])

> [!info] From Prof. Wallisch
> Neural Network is like an oversimplification of our brain - it is inspired by mid- to late-20th century notion of brain function

> [!important] Neural Networks are amazing function approximators
> If the goal is to just map a set of inputs to a set of outputs, neural network is your guy... this is why it's used in [[Reinforcement Learning]].

![[neural network overview.png]]

> [!info] ANN is **Turing Complete**
> Anything that is *computable* can be computed by NN, but with all these unrealistic assumptions that makes it impossible to do in real life. Best we can do is see how far we can get with these limitations
## Perceptrons

Early attempt at neural network: a single perceptron
Mimics how a neuron works

See [[Perceptron]]
## Fully Connected Feedforward Networks

Each neuron is connected to every other neuron in its neighboring layers

Note that this is already a really simple NN, but it already has hundreds of parameters

**Neuron**: basically a computational unit that just does dot product
- computes [[Analytic Geometry (ML)#Dot Product|dot product]] between inputs and weights
- adds a [[Bias|bias]]
- optionally passes results in activation function

![[feedforward neural network.png|500]]


1. Activity of each neuron is represented by a *number from 0 to 1*
2. Weight of each connection is represented by a *positive* or *negative* number

Below, we will see how neurons in input layer flow to a single neuron in the hidden layer
$$z = \sigma(\mathbf{w}\cdot\mathbf{x}+b)$$
where
1. $\mathbf{w}\cdot \mathbf{x}$: dot product between input activation and weights
2. $b$: bias, ensure meaningful activation
3. $\sigma$: (optionally) pass output through an activation function

### Pass Forward

![[neural network single pass update.png|500]]

The above example shows how neurons in input layer flow to a single neuron in the hidden layer
1. Each neuron in the input layer is either activated (1) or not activated (0)
2. Each input neuron corresponds to a weight in the hidden layer; multiply weight to activation
3. Sum up all these products

hence... this is basically [[Analytic Geometry (ML)#Dot Product|dot products]]
### Activation Function

Take the summed and weighted activations from the input layer, and put them through an activation function to output a modified activation

> [!important] Activation Function Captures Non-linearity
> WITHOUT ACTIVATION FUNCTION, A NEURAL NETWORK WILL NEVER BE ABLE TO WORK ON NONLINEAR CASES.
> 
> A neural network without any activation function can estimate linear functions, which... at that point... why even use neural network (might as well use perceptrons)
>
> A single linear layer can model *any* linear function

Commonly used activation functions:
**Sigmoid**: maps to $(0, 1)$
$$f(x) = \frac{e^x}{e^x+1}$$
**Softplus**: maps to $(0, \infty)$
$$f(x) = \ln(1+e^x)$$
**ReLU**
$$f(x) = \max(0, x)$$

![[nn common activation functions.png|400]]

### Bias

To avoid activation from noise, we only want meaningful activation if the inputs exceed a certain threshold -- which we call [[Bias]] $b$

Often a negative number

### Benefit: Tremendous Flexibility

Using the example from earlier, we have:
- 25 neurons in input layer
- 15 neurons in hidden layer
- 10 neurons in output layer

Connection between input and hidden layer: $25 \times 15 = 375$ weights 
Connection between hidden and output layer: $15 \times 10 = 150$ weights
Number of biases: $15+10=25$
Total number parameters: 550

*And this is for a relatively small network...*

- Each neuron has its own weights for all the neurons from the previous input layer
- Then we can add even more hidden layers...

Basically, a **sufficiently large network can learn arbitrarily complex functions** by adjusting weights and biases

## Training Neural Network

Learning happens by minimizing cost of being wrong. As such, we need
1. a cost function that quantifies network performance
2. calculate cost for all data
3. minimize cost

> [!info] Cost vs Loss
> Loss function is usually convex (so you can use derivative to find minimum and what not)
> Cost function does not have to be. It measures how far the outputs are from model's prediction
### Notations

Given $n=25$ input neurons, $k=15$ neurons in hidden layer, we use [[Analytic Geometry (ML)#Matrix Multiplication|matrix multiplication]] (its the most efficient way to represent and [[Matrix Multiplication (PC)|compute]]) for the resulting activations in the neurons

$$
\underbrace{
\textcolor{cyan}{
\begin{bmatrix}
w_{1,1} & w_{1,2} & w_{1,3} & \cdots & w_{1,n} \\
w_{2,1} & w_{2,2} & w_{2,3} & \cdots & w_{2,n} \\
w_{3,1} & w_{3,2} & w_{3,3} & \cdots & w_{3,n} \\
\vdots  & \vdots  & \vdots  & \ddots & \vdots  \\
w_{k,1} & w_{k,2} & w_{k,3} & \cdots & w_{k,n}
\end{bmatrix}
}
}_{\text{15$\times$25}}
\underbrace{
\begin{bmatrix}
a_1 \\
a_2 \\
a_3 \\
\vdots \\
a_n
\end{bmatrix}
}_{\text{25$\times$1}}
+
\underbrace{
\textcolor{red}{
\begin{bmatrix}
b_1 \\
b_2 \\
b_3 \\
\vdots \\
b_k
\end{bmatrix}
}
}_{\text{15$\times$1}}
$$

$$
\underbrace{\mathbf{h}}_{\text{15$\times$1}} = \sigma(\textcolor{cyan}{\mathbf{W}}\mathbf{a} + \textcolor{red}{\mathbf{b}})
$$
Where
- $\mathbf{a}$ is the activations from previous layer
- $\mathbf{W}$ is the connections/weights between previous layer's neurons and next layer's neurons; each row represents the weights for one (next layer) neuron
- $\mathbf{b}$ is bias lol, one for each (next layer) neuron
### Cost Function

- Cost function $C$ takes all parameters of the network (all weights and biases) as an input, along with activations yielded by the training data
- Outputs a number, the average cost over all the training data
- Quantifies performance of the entire network at any step in the training

> [!example]- Example of Cost Function in Action from class
> Used [[Residual Sum of Squares]] as cost function
> ![[nn cost function example.png]]

[[Root Mean Squared Error|Mean Squared Error]]
- More often used for [[Regression]]
- (basically [[Residual Sum of Squares|RSS]] but used more often because it normalizes error by number of samples, has consistent scale, and is differentiable)
$$\mathcal{L} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$$

[[Cross-Entropy Loss]]
- Binary Cross Entropy Loss for binary [[Classification]]
- Categorical Cross Entropy for multi-class classification

### Learning
**Learning**: adjusting the weights and biases to *minimize the output of the cost function* of all dimensions 

In each training step, we need to 
1. update *all weights + biases* at once (550, per [[Artificial Neural Network#Benefit Tremendous Flexibility|example above]])  do
2. do so in a way that decreases cost the quickest (i.e. direction in this 550 dimensional space where cost function is steepest)

We use [[Backpropagation]] to find this direction, or the gradient $\nabla$
[[Gradient Descent]] then adjusts the weight accordingly ($-\nabla$) to lower the cost

General step by step idea:
1. [[Artificial Neural Network#Fully Connected Feedforward Networks|Forward Pass]] (compute outputs layer by layer)
2. Compute loss (compare prediction $\hat y$ with true label $y$) using [[Artificial Neural Network#Cost Function|some cost function]]
Then [[Backpropagation]] via [[Vector Calculus (ML)#The Chain Rule|chain rule]] to compute gradient of loss
3. Compute gradient at output layer (compute derive of loss at last layer)
4. Propagate error back, compute derivative of loss at previous layers

> [!Example] Suppose we use [[Residual Sum of Squares|RSS]] as cost function, need to calculate $\nabla_J$
> [[Vector Calculus (ML)#Jacobian|Jacobian]]: $SS_R = J(w, b)$
> Need to calculate $\nabla_J$ as:
> $$\frac{\partial J}{\partial w} = \sum -2x_i (y_i - (w x_i + b))$$
> $$\frac{\partial J}{\partial b} = \sum -2 (y_i - (w x_i + b))$$
> $$\nabla_J = \begin{bmatrix}
> 
> \frac{\partial J}{\partial w} \\
> 
> \frac{\partial J}{\partial b}
> 
> \end{bmatrix}$$


Finally [[Gradient Descent]]
5. Update weights using all the gradients

### `PyTorch`

Basically give steps:
```
1. compute prediction
2. use prediction to cmopute loss
3. clear out gradient cache in optimizer
4. compute gradient
5. take a step in the direction of the gradient
```

### Results

We can get cost close to 0 --> classification performance can get arbitrarily close to perfect (with enough training and good data)

Problems with this approach:
- does not scale well beyond simple examples (image is *huge*...)
- shift invariance is poor: small shift in input (e.g. small change in img) does not lead same output (e.g. if cat position moves in an img, not able to recognize cat)
- does not take advantage of correlations between pixels in image
- extracted features in hidden layer are usually meaningless

Solution to the last three problems: [[Convolutional Neural Network]]

