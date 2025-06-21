Used to grow [[Decision Tree]]

**Gini Index** quantifies leaf impurity
- tells you how “impure” or mixed a *node* is in terms of class distribution.
- Higher gini index = more impure, or the node is less useful for making prediction

In multi-class, gini index is:
$$GI = 1 - \sum_{i=1}^n p_i^2$$
Where
- $n$ is the number of classes
- $p$ is the probability per class, or proportion of examples in the node that belongs to class $i$

In a binary classification example, this formula simplifies to:
$$GI = 1 - (p_A^2 + p_B^2) = 1 - p^2 - (1-p)^2$$

> [!Example]- Calculating Gini Index
> Suppose a leaf node has 10 samples:
> 
> - 4 belong to Class A
> - 6 belong to Class B
> 
> Then:
> - $p_A = \frac{4}{10} = 0.4$
> - $p_B = \frac{6}{10} = 0.6$
> 
> $$\text{Gini} = 1 - (0.4^2 + 0.6^2) = 1 - (0.16 + 0.36) = 1 - 0.52 = 0.48$$
> 