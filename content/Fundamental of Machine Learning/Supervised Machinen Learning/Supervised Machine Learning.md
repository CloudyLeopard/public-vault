**Supervised** learning: Dataset consists of **labeled** data (input/output pairs) that are characterized by **feature** vectors
- Example: Classification
- Historically the oldest branch of machine learning. Very straightforward

The "hope" of supervised ml is that the algorithm figures out the common properties of the labels by examples.

[[Regression]]
- [[Linear Regression]]
- [[Multiple Regression]]
- [[Polynomial Regression]]
- [[Regularized Regression]]
- [[Logistic Regression]]

[[Classification]]
- [[Logistic Regression]]
- [[Support Vector Machine]]
- [[Decision Tree]]
	- [[Tree Bagging]]
	- [[Tree Boosting]]
- [[Artificial Neural Network]]
	- [[Perceptron]]
	- [[Convolutional Neural Network]]

## The Bias/Variance Tradeoff

This is the ultimate Supervised Machine Learning challenge (i think)

The ultimate goal of Supervised Machine Learning is to **learn** the *function that maps predictor features to outcomes* from data (in the presence of noise)
- Model may simply **memorize** the training set
- Makes generalization on new data difficult --> high [[Variance|variance]] of model coefficients

Conversely, if the model is deliberately too simple to try to prevent this [[Overfitting]], it might be too simple to learn the function --> weak learner and [[Underfitting|underfit]]
- [[Bias]]: error due to overly simplistic assumptions in learning algorithm

![[bias variance tradeoff.png|500]]

## General ML Framework

The general supervised machine learning framework:

$$\theta^* = \text{argmin} \sum^n_{i=i}\mathcal{L}[Y_i=f(X_i; \theta, \lambda)]$$

Where we have:
- Loss function $\mathcal{L}$
	- There are an infinite number of solutions for an equation. The optimal solution minimizes loss from the loss function.
- Training with $n$ sample size
- Data, where $(X_i, Y_i)$ is the $i$th X/Y pair
	- The data is *immutable*: we are not solving for $Y$, but are given $Y$.
- Linking function $f$
	- The linking function is *mutable*
- Parameters $\theta$ (of $f$)
- Hyperparameters $\lambda$
	- $\lambda$ is something you pick, and will affect your parameters or (like $\theta$ or betas)
	- needs to be tuned in the [[Train Test Split|validation set]]