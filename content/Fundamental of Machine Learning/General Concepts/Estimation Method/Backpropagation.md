**Backpropagation** is the method used in [[Artificial Neural Network]]s to calculate the gradient $\nabla$, which is then used by [[Gradient Descent]] to update the model’s parameters.

> [!important] Essentially a type of [[Gradient Descent]]; used for [[Artificial Neural Network|ANN]]

1. Find [[Calculus (ML)#Partial Derivative|partial derivative]] in each dimension (with the chain rule)
	- "dimension"/parameter refers to each "weight" and "bias" for every neuron in the NN
2. Assemble all partial derivatives in gradient $\nabla$

[[Gradient Descent]] then adjusts the weight accordingly ($-\nabla$) to lower the cost

![[backpropagation intuition example.png]]

Step by step explanation on what is happening above:
1. 0.54 is the output neuron's activation after a forward pass from the previous hidden layer
Back propagation begins here (i think? or in step 3)
2. Compute cost between predicted value $\hat y$ and actual label $y$ using some cost function
3. Compute [[Calculus (ML)#Partial Derivative|partial derivative]] w.r.t. previous hidden layer raw output (before activation function)
4. Propagate the error back using chain rule,
	- Keep doing derivatives to find the previous layer's activation contribution to the error

> [!note] My understanding
> Intuitively, i'm just going to understand this as you just keep doing [[Vector Calculus (ML)#The Chain Rule|chain rule]] and chain rule and chain rule to go back and see how much all the previous layer's node affects the cost that's all the way at the end.

![[backpropagation in deep neural network.png]]

Potential problems in backpropagation
- [[Vanishing Gradient]]: component derivatives are < 1
- [[Exploding Gradient]]: component derivatives are > 1