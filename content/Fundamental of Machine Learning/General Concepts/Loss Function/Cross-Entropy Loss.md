TL;DR:
$$L(y, \hat p) = -[y\log \hat p + (1 - y)\log(1-\hat p)]$$
Basically [[Entropy]] but with two probability distributions instead of 1
## Cross Entropy

Consider two distributions:
- $p(x)$, the distribution of outcomes (ground truths)
- $q(x)$, the distribution of predictions produced by model

We define cross-entropy between $p(x)$ and $q(x)$ as:
$$H(p, q) = -\sum_xp(x)\log q(x)$$
A **higher** cross-entropy means the model’s predicted probability distribution q(x) is **further from the true distribution** p(x).

> [!note] Intuition
> When model prediction matches ground truth ==> $p(x) = q(x)$ ==> $p(x)\log q(x)\rightarrow 0$
> When model prediction and ground truth mismatches ==> $\rightarrow \infty$

## Cross Entropy *Loss*

In the case of cross-entropy *loss*
- $p(x)$: always evaluates to 0 or 1
- $q(x)$: predicted probability $\hat p$ that $y = 1$

$p(x)$: In [[Supervised Machine Learning]], we *already know the ground truth label*, so the ground truth probability that some event happens is always 0 or 1

Case 1: True outcome $y=1$
$$
\begin{align*}
H(p, q) &= -[p(1)\log q(1) + p(0)\log q(0)] \\
&= -[1 \cdot \log q(1) + 0 \cdot \log q(0)] \\
&= -\log q(1)
\end{align*}
$$
Note that $q(1) = \hat p =\text{model's prediction that }y=1$
Loss: 
$$L(y=1, \hat p) = -\log \hat p$$

Case 2: True outcome $y=0$
$$
\begin{align*}
H(p, q) &= -[p(1)\log q(1) + p(0)\log q(0)] \\
&= -[0 \cdot \log q(1) + 1 \cdot \log q(0)] \\
&= -\log q(0)
\end{align*}
$$
Note that $q(0) = 1 - \hat p =\text{model's prediction that }y=0$
Loss:
$$L(y=0, \hat p) = -\log (1- \hat p)$$
Generally, loss is:
$$L(y, \hat p) = -[y\log \hat p + (1 - y)\log(1-\hat p)]$$
> [!note] Since ground truth $y=0$  or $y=1$, one of the two expression insides always evaluates to $0$

