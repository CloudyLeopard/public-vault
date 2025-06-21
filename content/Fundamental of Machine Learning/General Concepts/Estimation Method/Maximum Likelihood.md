---
aliases:
  - Maximum Likelihood Estimation
  - MLE
---

Method to estimate parameters $\theta$ (like $\beta$'s in [[Logistic Regression]]) of a model by finding the values that make the observed data most likely.

> “Given the actual data I observed, what parameter values make it most probable this data would occur?”

To get **Maximum Likelihood Estimation (MLE)** of the betas:

We are given:
- A dataset: $\{(x_1, y_1), (x_2, y_2), \dots, (x_n, y_n)\}$
- A probabilistic model: $P(y \mid x;\beta)$, where $\beta$ are the parameters (e.g., weights)

Compute likelihood of each datapoint. 
- In other words, calculate $P(y_i|\bm{x_i}; \bm{\beta})$ for all $i$ from $1$ to $n$
- This means the probability of actual outcome $y_i$ given their personal $x_i$ and overall $\beta$

The **Likelihood Function $L$** is:
$$L(\bm{y}\mid\bm{x};\bm{\beta}) = \prod_{i=1}^{n} P(y_i \mid \bm{x_i}; \bm{\beta})$$
This is the likelihood of observing the entire dataset given the model and parameters $\beta$. We multiple probabilities cuz they are probabilities of [[Independence|independent]] events

Practically, we use the **Log-Likelihood Function**
$$\ell(\bm{y}\mid\bm{x};\bm{\beta}) = \log L(\bm{y}\mid\bm{x};\bm{\beta}) = \sum_{i=1}^{n} \log P(y_i \mid \bm{x_i}; \bm{\beta})$$
> [!info] Why Log?
> Three reasons:
> 1. Addition is simpler (costs less compute) than multiplication
> 2. No floating point precision loss
> 3. We only care about *maximizing* the likelihood, and not the actual likelihood value anyway

Finally, we need to find the betas that gets the maximum of the log likelihood function
$$\hat{\beta} = \arg\max_{\beta} \sum_{i=1}^{n} \log P(y_i \mid \bm{x_i}; \bm{\beta})$$
Basically take [[Calculus (ML)#Derivative|derivatives]]
$$\frac{d\ell}{d\bm{\beta}} = \frac{d\log L}{d\bm{\beta}}$$

# Latex Commands
$\newcommand{\bm}{\boldsymbol}$