The **exploding gradient problem** occurs when gradients become **very large** during [[Backpropagation]], causing the model’s weights to grow uncontrollably and the training to become unstable.

Like [[Vanishing Gradient]], this happens due to the **[[Vector Calculus (ML)#The Chain Rule|chain rule]]** in backpropagation:
- When the derivatives involved in the chain are **greater than 1**, multiplying many of them across layers can cause the gradient values to **grow exponentially**.
- This is especially common in **very deep networks** or **recurrent neural networks (RNNs)**.

