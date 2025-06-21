
When gradients (used to update weights during training in [[Backpropagation]]) becomes **very small**, eventually shrinking so much that earlier layers basically stops updating

Happens if component derivatives are < 1

> [!info] Why?
> (chatgpt generated but i think it makes sense)
> During [[Backpropagation]], gradients are calculated using the [[Vector Calculus (ML)#The Chain Rule|chain rule]]. For deep networks, this means multiplying many small numbers ([[Calculus (ML)#Partial Derivative|partial derivatives]]) together:
> - If those numbers are < 1, the gradient shrinks exponentially as it moves backward.
> - Eventually, the gradient becomes so small it’s nearly zero.
> 
> This is especially problematic when using activation functions like:
> - Sigmoid: squashes outputs into the (0, 1) range, and its derivative is always < 0.25.
> - Tanh: similar issue in the (–1, 1) range.

Issue is worse when there are too many layers, like in modern deep NNs