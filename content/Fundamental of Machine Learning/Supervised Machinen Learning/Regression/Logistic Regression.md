Logistic regression predicts probability that a certain event will happen given a set of predictors (features)

> [!info]- Logistic Regression Model Graph
> ![[logistic regression img.png]]

> [!note]- Nice Logistic Regression Gif I Found
> ![[logistic_regression.gif]]

General [[Supervised Machine Learning]] framework is:
$$\beta^* = \text{argmin}_\beta\sum^n_{i=1}(Y_i-f(X_i; \theta, \lambda))^2$$
Where
- $\theta = \beta$
- $\mathcal{L} =$ [[Cross-Entropy Loss]]
- $f: \hat p = \frac{1}{1 + e^{\beta x}}$

## Logistic Regression Use Cases

Extremely common

Maps continuous predictors to probabilities of discrete outcome. Examples:
- Risk of hospitalization or death given some risk factor
- Probability a message is spam given how many suspicious keywords it contains
- Probability of winning a game, given how many points were scored
- Probability that a transaction is fraudulent given number of unusual features

### Classification

We can turn use logistic regression for **[[Classification]] problem**  by introducing a **threshold**
(see below)

## Linking Function

TL;DR: Logistic Function
$$p = \frac{e^{\beta_0 + \beta_1 x_1}}{1 + e^{\beta_0 + \beta_1 x_1}}$$

Need a different linking function than [[Linear Regression]]'s. 

With logistic regression task, we have continuous predictors, discrete outcomes (often binary, 0/1) as data

We want: "a function that maps predictors to probabilities of discrete outcomes in a continuous, bounded, and nonlinear fashion"
- "map predictors to probabilities": function takes in any combination of predictor (feature) values, and output a probability between 0 and 1
- "of discrete outcomes": outcome is discrete, usually binary (0/1)
- "continuous": want a smooth and continuous curve so that small changes in input predictors lead to small changes in output probability
- "bounded": function min and max must be between 0 and 1 (probabilities' between 0 and 1)
- "nonlinear": allow for unequal impact of unit-change in x

The linking function that matches all of the above characteristic is the **logit function** (we are not done yet)
$$\text{logit}(p)=\ln\left(\frac{p(x)}{1-p(x)}\right)$$

> [!note] Arriving at the logit function
> 1. we start with linear regression's linking function ==> not continuous, not nonlinear, not bounded
> $$y = \beta_0 + \beta_1x$$
> 2. Trick 1: make regression result *not the outcome*, but *probability of an outcome* ==> is continuous, not nonlinear, not bounded
> $$p(y) = \beta_0+\beta_1x$$
> 3. Make output the natural log of **odds** ==> is continuous, is nonlinear, not bounded
> $$\ln\left(\frac{p(x)}{1-p(x)}\right) = \beta_0+\beta_1x$$

> [!info]- Logit Function Graph
> notice its the logistic function graph but flipped
> ![[logit function graph.png]]

But, we need to **flip** the logit function to arrive at the **[[Logistic Function]]**

**[[Logistic Function]]** (logit inverse) with 1 predictor

$$p = P(Y = 1 \mid X) = \frac{e^{\beta_0 + \beta_1 x_1}}{1 + e^{\beta_0 + \beta_1 x_1}} = \frac{1}{1 + e^{-(\beta_0 + \beta_1 x_1)}}$$

> [!info]- Logistic Function Graph
> ![[logistic function graph.png]]

### Affect of Changing Betas

![[logistic regression changing betas.png]]

|          | $\beta_0$ (intercept)            | $\beta_1$ (slope coefficient)                                           |
| -------- | -------------------------------- | ----------------------------------------------------------------------- |
| Increase | Entire curve shifts to the left  | S-curve becomes steeper; model is more confident                        |
| Decrease | Entire curve shifts to the right | S-curve becomes flatter; prediction stays closer to 0.5, less confident |
| Negative |                                  | Curve is flipped, inverse relationship                                  |

## Loss Function

We cannot use [[Residual Sum of Squares|RSS]] used in [[Linear Regression]]
- RSS assumes residuals are normally distributed. This is impossible with binary outcomes
- Instead, logistic regression outcomes follow a [[Bernoulli Trial|Bernoulli Distribution]]

Given we are trying to model Bernoulli Distribution, we use [[Cross-Entropy Loss]]
## Finding Optimal Betas

We use [[Maximum Likelihood]] to minimize loss and find betas (as a reminder, some other common methods to find betas is gradient descent)

> [!important] See [[Maximum Likelihood]] note for how MLE works
> The following notes just points out the specifics on applying MLE to Logistic Regression

For Logistic Regression, the likelihood of an outcome is:
$$P(y \mid \bm{x};\bm{\beta}) = \frac{e^{y_i\bm{\beta^T}\bm{x_i}}}{1+e^{y_i\bm{\beta^T}\bm{x_i}}}$$
The derivative of the log-likelihood function is:
$$\frac{d\log L}{d\bm{\beta}} = \bm{x^T}(\bm{y}-S(\bm{x}, \bm{\beta}))$$
Where $S$ is the Sigmoid function

## Classification and Threshold

Once we have built the Logistic Regression model (found the optimal $\beta$'s), we can use the model to yield probability of some binary outcome for some (new) predictor value $x$

Meaning: Logistic Regression can be used for [[Classification]]

**Threshold**: The predictor value above which the model predicts one of the categorical outcomes (e.g. 0) vs predicting the other one (e.g. 1)
- Ex. threshold of p = 0.5; if $\hat p \geq 0.5$, predict $y=1$, if $\hat p < 0.5$, predict $y=0$
- We can set threshold to any number between 0 and 1, not just 0.5

Setting classification threshold distinguishes 4 cases
- True Positives
- False Positives
- True Negatives
- False Negatives

![[logistic regression threshold.png]]

For more, see [[Classification]]


## Comparison with Other Machine Learning Models

Overall, logistic regression is good. Kind of like a sweet spot:
- It does not require any terrible assumptions unlike linear regression
- It is also very easy to build unlike advanced machine learning models

| Method/Feature                      | [[Linear Regression]] | Logistic Regression | Advanced Machine Learning Methods |
| ----------------------------------- | --------------------- | ------------------- | --------------------------------- |
| Assumes normality of residuals      | Yes                   | **No**              | **No**                            |
| Assumes equal impact of unit change | Yes                   | **No**              | **No**                            |
| Bounded predictions?                | No                    | **Yes**             | **Yes**                           |
| Readily interpretable?              | **Yes**               | **Yes**             | No                                |
| Easy to build?                      | **Yes**               | **Yes**             | Sometimes                         |
| Risk of overfitting                 | **Low**               | **Low**             | High                              |

# Latex Commands
$\newcommand{\bm}{\boldsymbol}$