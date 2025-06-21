---
aliases:
  - OLS
  - Ordinary Least Squares
---
The Machine Learning Framework for Linear Regression is as follow (based on the [[Supervised Machine Learning#General ML Framework|general framework]]):
$$\beta^* = \text{argmin}_\beta\sum^n_{i=1}(Y_i-f(X_i; \theta, \lambda))^2$$
Where
- $\theta$ (or the linking function's parameters) is $\beta$
- $f: y=ax+b$, the linking function is linear
- $\mathcal{L}$ is Squared Loss ([[Residual Sum of Squares|RSS]])
- $\lambda$ : hyperparameter for [[Regularized Regression|regularization]] (when $\lambda > 0$)

> [!important] OLS vs Linear Regression
> Linear Regression is also known as Ordinary Least Squares, or OLS. This is because Linear Regression usually minimizes [[Residual Sum of Squares|RSS]], and that's really *ordinary*

## Linking Function

$$y = ax+b =\beta_0 + \beta_1x$$


### Why Linear Regression?

Linear Regression doesn't need machine learning, but it is still very commonly used. A big reason behind this is that linear regression, unlike most other models, is *solvable*.

Additionally, there are many concepts in machine learning that can be introduced in linear regression, by recasting linear regression in an ML framework:
1. Goal of linear regression is find linear equation that maps input variables to an output variable ([[Linear Algebra (ML)#Linear Combination|linear combination of parameters]])
2. Input variables are called **features**. Some other terms are covariates or regressions (in Economics), independent variables (in Science), **predictors** (in Statistics)
3. The output variable is called **response** or **label**. Or, dependent variable (in Science), outcome (in statistics)
4. Linear Regression is a **parametric** method, meaning there is a fixed [[Linear Algebra (ML)#Linear Mappings|mapping]] between inputs and outputs: $y=f(X)+\epsilon$
5. In linear regression, the function is of the form $f(X) = \beta_0+\beta_1X$. The method *estimates* the **regression coefficients** $\beta_0$ and $\beta_1$ that maps $X$ to $f(X)$

Example: suppose we have a dataset that looks like:

![[lin reg example.png|200]]

For the first 3 cities, we can get the following system of linear equations:
$$
\begin{align*}
\beta_0+\beta_1350&=35000\\
\beta_0+\beta_1700&=70000\\
\beta_0+\beta_1700&=90000
\end{align*}
$$
We can put this into matrix form $\bm{A}\bm{x}=\bm{b}$:
$$\begin{bmatrix}
1&350\\
1&700\\
1&700\\
\end{bmatrix}
\begin{bmatrix}
\beta_0\\\beta_1
\end{bmatrix}
=\begin{bmatrix}
35000\\70000\\90000
\end{bmatrix}$$
This system clearly doesn't have a solution (the 3 points do not lie on a straight line), so we have to find a best fit line

### Finding the Parameters ($\beta$'s)

Linear regression **does not need machine learning**. We can find the best, optimal slope (parameters) mathematically - based on [[NYU/2024 Fall/Probability & Statistics/README|probability and statistics]].

These parameters come from our choice of **loss function** (or **error** function, **objective** function)

> [!info] What do the parameters $\beta$ mean?
> $\beta$ (Beta): Scale parameters (optimal scale factor of predictor values ($X$) to get as close to the known outcomes ($Y$) as possible)

The most common type of Linear Regression uses [[Residual Sum of Squares|RSS]]: it minimizes the residual sum of squared errors. This type of regression estimation method is called **Ordinary Least Squares (OLS)**

> [!info] Ordinary Least Squares, or OLS
> Sum of Squares is probably the simplest way to calculate difference, hence this type of linear regression estimation method is called **Ordinary Least Squares**. 
>
> There are other types of estimation method, and it depends on the loss function used:
> ![[RSS vs other loss functions.png]]

We have $n$ data points $\{(x_i, y_i)\}$ and we want to fit a line, $Y=a+bX$ such that we minimize the squared loss via the [[Residual Sum of Squares]] (RSS)
$$RSS(a, b) = \sum^n_{i=1}(y_i-(a+bx_i))^2$$
We can minimize this by finding when the partial derivatives are equal to 0
$$\frac{\partial{\text{RSS}}}{\partial{a}}=0, \frac{\partial{\text{RSS}}}{\partial{b}}=0$$
By solving for $a$ and $b$ simultaneously, we get that
$$b = \frac{n \sum x_iy_i - \sum x_i \sum y_i}{n \sum x_i^2 - (\sum x_i)^2} = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sum (x_i - \bar{x})^2} = \frac{\text{Cov}(x,y)}{\text{Var}(x,y)}$$
$$a = \frac{\sum y_i - b \sum x_i}{n} = \bar{y} - b\bar{x}$$

## Finding the Best Fit Line

To put it simply, the best fit line is the "best line that I can do", as the data we get are not going to perfectly match any line. Instead, we estimate the parameters $\beta_0$ and $\beta_1$ such that the best fit line $y=\beta_0+\beta_1x$ minimizes the **loss function** 
- again, the loss is usually [[Residual Sum of Squares|RSS]] (for OLS) but could be something else

*Note: the following is my interpretation of what's going on*

Our objective is to find $\bm{\beta}$ that minimizes the loss function (RSS, defined in the next section). We begin with the following system of equation:
$$\begin{align*}
y_1&=\beta_0+\beta_1x_1\\
y_2&=\beta_0+\beta_1x_2\\
&\ldots\\
y_n&=\beta_0+\beta_1x_n
\end{align*}$$
Which we can put into matrix form
$$\bm{y}=\bm{X\beta}$$
But, as seen above, this system (most likely) doesn't have a solution. Whatever $\bm{\beta}$ we find, there is always going to be some "residual" (described in the next section): 
$$\bm{y}=\bm{X\beta}+\bm{e}$$
$$
\begin{bmatrix}
y_1\\ y_2\\ \vdots\\ y_n
\end{bmatrix} = \begin{bmatrix}
1& x_1\\
1& x_2\\
\vdots& \vdots\\
1& x_n
\end{bmatrix}\begin{bmatrix}
\beta_0\\ \beta_1
\end{bmatrix} + \begin{bmatrix}
e_1\\ e_2\\ \vdots\\ e_n
\end{bmatrix}
$$
or, we define the prediction of the linear model as:
$$\bm{\hat y}=\bm{X\beta}$$
As we will see later, we can derive a closed form solution to $\beta$:
$$\bm{\beta} = (\bm{X^TX})^{-1}\bm{X^T}\bm{y}$$
> [!important] This is BIG
> If we have the $\bm{X}$ (or the predictors) and the $\bm{y}$ (the outputs), which *we always do in supervised learning*, this formula gets you the solution to a linear model in closed form **immediately**.
>
> Hence, remember these two expressions:
> $$\bm{y}=\bm{X\beta}+\bm{e}$$
> $$\bm{\beta} = (\bm{X^TX})^{-1}\bm{X^T}\bm{y}$$

### Loss Function

Also known as **error** function, **objective** function.

Linear regression yields the parameters that minimize the sum of the square difference ([[Residual Sum of Squares|RSS]]) between predicted and actual outcomes. Hence the name, **OLS**-regression (**Ordinary Least Squares**)

The distance between the actual outcomes $y$ and the predicted outcomes $\hat y$ are called the **residual error** $e$: $e = y - \hat y$.

$$e=y-\hat y=y-\bm{\beta}\bm{x}$$

Linear regression minimizes the [[Residual Sum of Squares]] errors (**RSS**):
$$RSS = \sum_{i=1}^n e_i^2$$

### Deriving the Optimal Solution with [[Vector Calculus (ML)|Vector Calculus]]

We know this:
$$\bm{y}=\bm{X\beta} + \bm{e}$$
And now we want to derive $\bm{\beta}$

Absolutely! Here's the math content rewritten in a format suitable for an **Obsidian** note. LaTeX is wrapped in `$$`, and section headers are plain text or Markdown style:
$$
RSS = \sum_{i=1}^n e_i^2 = \mathbf{e}^T \mathbf{e}
$$
Where:
$$
\mathbf{e} = \mathbf{y} - \hat{\mathbf{y}}, \quad \hat{\mathbf{y}} = \mathbf{X\beta}
$$

Expanding RSS:

$$
\begin{align*}
RSS &= (\mathbf{y} - \mathbf{X\beta})^T(\mathbf{y} - \mathbf{X\beta})\\
&= \mathbf{y}^T\mathbf{y} - \mathbf{y}^T\mathbf{X\beta} - \mathbf{\beta}^T\mathbf{X}^T\mathbf{y} + \mathbf{\beta}^T\mathbf{X}^T\mathbf{X}\mathbf{\beta}
\end{align*}
$$

To minimize RSS, take the derivative with respect to $\mathbf{\beta}$:

$$
\frac{d(RSS)}{d\mathbf{\beta}} = \frac{d}{d\mathbf{\beta}} \left( \mathbf{y}^T\mathbf{y} - \mathbf{y}^T\mathbf{X\beta} - \mathbf{\beta}^T\mathbf{X}^T\mathbf{y} + \mathbf{\beta}^T\mathbf{X}^T\mathbf{X}\mathbf{\beta} \right) = 0
$$

> [!info]- Useful [[Linear Algebra (ML)#Matrices|Matrix]] Identities
> 
> $$
> \frac{d}{d\mathbf{x}}(\mathbf{Ax}) = \mathbf{A}, \quad
> \frac{d}{d\mathbf{x}}(\mathbf{x}^T\mathbf{A}) = \mathbf{A}^T, \quad
> \frac{d}{d\mathbf{x}}(\mathbf{x}^T\mathbf{A}\mathbf{x}) = 2\mathbf{A}^T\mathbf{x}
> $$
> 
> If $\mathbf{A}$ is symmetric (i.e.,  $\mathbf{A} = \mathbf{A}^T$), then:
> $$
> \frac{d}{d\mathbf{x}}(\mathbf{x}^T\mathbf{A}\mathbf{x}) = 2\mathbf{A}\mathbf{x}
> $$
> Otherwise:
> $$
> \frac{d}{d\mathbf{x}}(\mathbf{x}^T\mathbf{A}\mathbf{x}) = \mathbf{x}^T\mathbf{A}^T + \mathbf{x}^T\mathbf{A}
> $$
> 
> We can create a symmetric matrix by:
> Given:
> 
> $$
> \mathbf{A} = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}
> $$
> 
> Clearly, $\mathbf{A} \neq \mathbf{A}^T$, so it's not symmetric.
> 
> But we can construct a symmetric matrix:
> 
> $$
> \mathbf{S} = \mathbf{A}^T\mathbf{A} = \begin{bmatrix} 10 & 14 \\ 14 & 20 \end{bmatrix}
> $$
> 
> Note: $\mathbf{A}^T\mathbf{A} \neq \mathbf{A}\mathbf{A}^T$

Apply derivatives (using the matrix identities defined above)
$$
0 - \mathbf{y}^T\mathbf{X} - (\mathbf{X}^T\mathbf{y})^T + 2\mathbf{\beta}^T\mathbf{X}^T\mathbf{X} = 0
$$
Transpose and simplify:
$$
-2\mathbf{y}^T\mathbf{X} + 2\mathbf{\beta}^T\mathbf{X}^T\mathbf{X} = 0
$$
Divide both sides by 2 and solve for $\mathbf{\beta}$:
$$
\mathbf{X}^T\mathbf{X}\mathbf{\beta} = \mathbf{X}^T\mathbf{y}
$$

Final result:
$$
\mathbf{\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}
$$
### Deriving the Optimal Solution with [[Linear Algebra (ML)|Linear Algebra]]

Recall what we know about [[Analytic Geometry (ML)#Vector Projection|vector projection]]

We know that $\bm{X} \perp \bm{e}$, so $\bm{X^Te}=0$
We also know that $\bm{e}=\bm{y}-\bm{X\beta}$

$$\begin{align*}
\bm{X^T}(\bm{y}-\bm{X\beta})&=0\\
\bm{X^Ty}-\bm{X^TX\beta}&=0\\
\bm{X^TX\beta}&=\bm{X^Ty}\\
\bm{\beta}&=(\bm{X^TX})^{-1}\bm{X^Ty}
\end{align*}$$
We can imagine $\bm{\beta}$ as the "scale factor" to shorten length of $\bm{x}$

![[lin reg vector proj.png|200]]

### Deriving the Optimal Solution with [[Gradient Descent]]

For terminological reasons, we call $\hat y$ as $a$ and $\beta$ as $w$ in this framework.
- We have our linear **linking function**: $a = wx$
- And our **cost function**: $C=(a-y)^2$
- Finally, learning rate (lR)

Suppose we have the following data, where $x$ = Cans, $y$ = price in $, and $\beta$ = Price per can

| $x$ | $y$ |
| --- | --- |
| 2   | 10  |
And we start with $\text{lR}=0.1$, and 

**Iteration 0**
Step 1: randomly initialize weight $w$
$$w_0=9$$
Step 2: predict output $a$
$$a_0=9*2=18$$
Step 3: calculate cost $C$
$$C_0=(18-10)^2=64$$
Step 4: Take [[Calculus (ML)#Partial Derivative|partial derivatives]] and use [[Vector Calculus (ML)#The Chain Rule|chain rule]] to find [[Vector Calculus (ML)#Gradient|gradient]]
$$\frac{\partial{C}}{\partial{w}}=\frac{\partial{a}}{\partial{w}}\frac{\partial{C}}{\partial{a}}$$
$$\frac{\partial{C}}{\partial{a}}=2(a-y)=2a-2(10)=2(xw)-20=4w-20$$
$$\frac{\partial{a}}{\partial{w}}=x=2$$
Putting them together, we get gradient
$$\frac{\partial{C}}{\partial{w}}=8w-40$$

**Iteration 1**
Step 1: Find new weight $w_1$ by taking direction **against** the gradient
$$w_1 = w_0-(\text{lR}\frac{\partial{C}}{\partial{w}})$$
So we have:
$$w_1=9-(0.1\times(8\times 9-40))=5.8$$
Step 2-4: repeat the process!
$$a_1=11.6, C_1=2.56$$
**Iteration 2**
$$w_2=5.8-(0.1\times(8\times 5.8-40))=5.16$$
$$a_2=10.32, C_2=0.1$$
**Iteration 3**
$$w_3=5.16-(0.1\times (8\times 5.16 - 40))=5.03$$
$$a_3=10.06, C_3=0.004$$

Now, since we have a cost $C$ that's low enough, we can finalize our $w$: $w\approx 5.03$

> [!note] We can start "anywhere"
> This process work with any arbitrary starting point $w$, and a range of learning rates.

> [!info] Tuning Learning Rate
> If learning rate is too low, it may take too long to reach optimal point. However, if learning rate is too high, we might just jump around wildly and not converge on the optimal point.
> ![[learning rate comparisons.png]]

## Advantages and Limitations

### Advantages of Linear Regression

- Simple: easy to understand and explain. This is especially true considering other models have hundreds of weights, and you do not know what they mean
- Interpretable coefficients: betas are usually meaningful*
- Fast (computationally efficient) - closed form solution
- Scales well - solutions are found fast even with large amounts of data
- Risk of overfitting is relatively low

\*Maintain caution when interpreting model coefficients and fit at face value
![[caution interpreting betas linear reg.png]]

### Limitations of Linear Regression

- Tendency to underfit
- Models with many predictors need lots of data to fit them well
- Many situations are not inherently linear, so using it is misleading
- Has no concepts of bounds or casuality
- There are quite a few assumptions that are sometimes violated (see below)

## Assumptions of Linear Regression

| **Assumption**                                 | **Mathematical reason for it**                                                                                                                          | **Issue if violated**                                                            | **Fix?**                                                                                                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Linearity                                      | $Y = X\beta + \varepsilon$                                                                                                                              | Model systematically wrong (curved residuals - residuals are systematically off) | **Common:** Transforms (e.g. log, square, etc.)<br>**Better:** Use a nonlinear model                                                                   |
| [[Independence]] of errors                     | $E[\varepsilon_i \varepsilon_j] = 0$ <br>(independent observations)<br><br>Example: errors are often dependent in financial data (time series analysis) | True variance is under-estimated (standard error and CI estimates are off)       | Use time-series models like ARIMA<br>Use clustered standard errors (appropriateness depends on use-case/situation)                                     |
| Homoscedasticity                               | $\text{Var}(\varepsilon_i) = \sigma^2$<br>Constant variance                                                                                             | Predictions less precise where variance is high                                  | Just inference: Heteroscedasticity-Robust Standard Errors<br>Model coefficients matter: Weighted least squares (WLS)                                   |
| Normality of errors                            | $\varepsilon \sim \mathcal{N}(0, \sigma^2)$                                                                                                             | Hypothesis tests and CIs can be misleading                                       | **Common:** [[Bootstrapping]]<br>*Bootstrapping isn't great because you are pretending you have more data*<br><br>**Better:** Robust regression models |
| No perfect [[Collinearity\|multicollinearity]] | $(X^TX)^{-1}$ must exist                                                                                                                                | Unstable $\beta$ coefficients                                                    | **Common:** Remove redundant variables<br>*Not great because how would you know which one to remove?*<br><br>**Better:** Regularized regression        |

# Latex Commands
$\newcommand{\bm}{\boldsymbol}$