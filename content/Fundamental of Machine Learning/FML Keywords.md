[[Essential Mathematics]]
==
[[Linear Algebra (ML)]]
A **vector** is something that can be added to itself and multiplied with a scalar, and yields the same object.
Vector spaces are structured spaces where vectors live
A **subspace** is the region of the vector space that can be reached by any **linear combination** of a set of vectors
**Linear combination**, or vector achieved by scalar multiplication and vector addition
$$\boldsymbol{v} = \lambda_1 \boldsymbol{x}_1 + \cdots + \lambda_k \boldsymbol{x}_k = \sum_{i=1}^k\lambda_i\boldsymbol{x}_i$$
A set of **basis vectors** $\{\boldsymbol{v_1}, \boldsymbol{v_2}, \ldots, \boldsymbol{v_n}\}$ forms a **basis** for some subspace of $V$ i.f.f. it spans that subspace *and* is an independent set of vectors
A **matrix** is a rectangular array of real numbers with $m$ rows and $n$ columns
- The **dimensionality** of matrix $\boldsymbol{A}$ is $m$ by $n$, or number of its rows $M$ and columns $n$.
**Linear Mappings**
**Kernel**

[[Analytic Geometry (ML)]]
**Dot product** (also known as **scalar product**) of $\boldsymbol{x}, \boldsymbol{y}\in {R}^n$ is defined as:
$$\boldsymbol{x}\cdot \boldsymbol{y} = \boldsymbol{x^T}\boldsymbol{y} = \sum_{i=1}^{n}x_iy_i = \alpha$$
$\Vert \boldsymbol{a} \Vert^2$ is called the **magnitude** of the vector, the **vector length**, and the **Euclidean norm**.
**Norms** are functions that determine/assign a length to a vector
$$\Vert\boldsymbol{x}\Vert_p = \left(\sum \vert x\vert^p\right)^{1/p}$$
the **dot product** is the cosine of the angle between two vectors, times their length:
$$\boldsymbol{a^T}\boldsymbol{b} = \Vert\boldsymbol{a}\Vert\Vert\boldsymbol{b}\Vert\cos\theta_{ab}$$$$\text{cosine similarity} = \cos\theta_{ab} = \frac{\boldsymbol{a^T}\boldsymbol{b}}{\Vert\boldsymbol{a}\Vert\Vert\boldsymbol{b}\Vert}$$
The projection of vector $\boldsymbol{b}$ onto $\boldsymbol{a}$ is the part of $\boldsymbol{b}$ that points in the direction of $\boldsymbol{a}$.
$$\text{proj}_{\bm{a}} \bm{b} =\beta\bm{a}= \frac{\bm{a^T}\bm{b}}{\bm{a^T}\bm{a}} \bm{a}$$
**Matrix Multiplication**
**Determinants**
**Tensors**


[[Calculus (ML)]]
[[Vector Calculus (ML)]]
**Gradient**: Collects all [[Calculus (ML)#Partial Derivative|partial derivatives]] of a function $f$ in a [[Linear Algebra (ML)#Vectors|vector]]
$$grad\ f = \nabla_xf = \frac{df}{d\bm{x}}$$
$$\nabla_xf = \left[
\frac{\partial{f(\bm{x})}}{\partial{x_1}}\
\frac{\partial{f(\bm{x})}}{\partial{x_2}}\
\dots\
\frac{\partial{f(\bm{x})}}{\partial{x_n}}
\right]$$
**Jacobian**: The Jacobian ([[Linear Algebra (ML)#Matrices|matrix]]) collects all first order derivatives of such a function and arranges them in a matrix $\bm{J}$.
**Chain Rule**: $\frac{df}{dx} = \frac{df}{dg}\frac{dg}{dx}$

[[Probability (ML)]]
**Sample Space**: $\Omega$, the **set** of all possible **outcomes** of an **experiment**
**Event**: One particular **outcome**, a **subset** of the sample space
A **random variable** is a function that maps outcomes from the sample space to real numbers. They can be discrete or continuous, depending on the real numbers it maps to and are characterized by [[Moment Generating Function|moments]].
**Probability Distributions**: They are fully characterized by a few parameters with a clear interpretation, called **moments**.
**Odds**, **Log Odds**: measure how likely something is to happen compared to it not happening.

$$\text{Odds}:\ \frac{p}{1-p}, \text{Likelihood}:\ L(\theta|x) = p(x|\theta)$$
$$\text{Log-odds}:\ \log\left(\frac{p}{1-p}\right), \text{Likelihood}:\ \log L(\theta|x)$$
**Shannon Entropy**
$$H(X) = -\sum p(x)\log p(x)$$
- High entropy = more average uncertainty
- Low entropy = less average uncertainty
- It is the expected value of *surprise*: $H(X) = \mathbb{E}[-\log p(x)]$
---
[[Supervised Machine Learning]]
==
**Supervised Learning**: Dataset** consists of **labeled** data (input/output pairs) that are characterized by **feature** vectors
- The ultimate goal is to **learn** the *function that maps predictor features to outcomes* from data (in the presence of noise)
**
Bias/Variance Tradeoff**: 
- **"Variance"**: High error due to [[Overfitting]] (Model may simply memorize the training set)
- **"Bias"**: High error due to [[Underfitting]] (Model is too simple to learn the function)

General SL framework
$$\theta^* = \text{argmin} \sum^n_{i=i}\mathcal{L}[Y_i=f(X_i; \theta, \lambda)]$$
- Loss function $\mathcal{L}$
- Training with $n$ sample size
- Data, where $(X_i, Y_i)$ is the $i$th X/Y pair
- Linking function $f$
- Parameters $\theta$ (of $f$)
- Hyperparameters $\lambda$

[[Regression]]
--
[[Linear Regression]]
$$\beta^* = \text{argmin}_\beta\sum^n_{i=1}(Y_i-f(X_i; \theta, \lambda))^2$$
Where
- $\theta$ (or the linking function's parameters) is $\beta$
- $f: y=ax+b$, the linking function is linear
- $\mathcal{L}$ is Squared Loss ([[Residual Sum of Squares|RSS]])
- $\lambda$ : hyperparameter for [[Regularized Regression|regularization]] (when $\lambda > 0$)

Why Linear Regression
1. find linear equation that maps input variables to an output variable ([[Linear Algebra (ML)#Linear Combination|linear combination of parameters]])
2. Input variables are called **features** or **predictors
3. The output variable is called **response** or **label**
4. Linear Regression is a **parametric** method, meaning there is a fixed [[Linear Algebra (ML)#Linear Mappings|mapping]] between inputs and outputs: $y=f(X)+\epsilon$
5. In linear regression, the function is of the form $f(X) = \beta_0+\beta_1X$. The method *estimates* the **regression coefficients** $\beta_0$ and $\beta_1$ that maps $X$ to $f(X)$

**Ordinary Least Square** Loss Function: **[[Residual Sum of Squares|RSS]]**
$$RSS(a, b) = \sum_{i=1}^n e_i^2 = \sum^n_{i=1}(y_i-(a+bx_i))^2$$
The linear regression problem in matrix form:
$$\bm{y}=\bm{X\beta}+\bm{e}$$
Close form solution:
$$\bm{\beta} = (\bm{X^TX})^{-1}\bm{X^T}\bm{y}$$
Advantages
- Simple: easy to understand and explain. This is especially true considering other models have hundreds of weights, and you do not know what they mean
- Interpretable coefficients: betas are usually meaningful*
- Fast (computationally efficient) - closed form solution
- Scales well - solutions are found fast even with large amounts of data
- Risk of overfitting is relatively low

Disadvantages
- Tendency to underfit
- Models with many predictors need lots of data to fit them well
- Many situations are not inherently linear, so using it is misleading
- Has no concepts of bounds or casuality
- Lots of assumptions:
	- Linearity
	- Independence of errors
	- Homoscedasticity
	- Normality of errors
	- No perfect multicollinearity

[[Multiple Regression]]
[[Linear Regression]], except the model looks at multiple predictors. For every new predictor/feature, 
1. add a [[Linear Algebra (ML)#Vectors|column vector]] to the predictor matrix $X$
2. add a coefficient $\beta_i$  to the weight vector $\bf{\beta}$

Adding predictors increase the **variance of the outcomes explained** by the regression model (often measured by $R^2$ (see [[R-Squared]])).
Regression coefficient $\beta_i$ tell us how much a predictor affects the outcome, assuming other predictors are kept constant (*coefficients are directly explainable*)
Linking Function:
$$y = \beta_0 + \beta_1x_1+\beta_2x_2+\ldots$$
Measure performance with [[Root Mean Squared Error|RMSE]], [[R-Squared]]
Problem: [[Collinearity]]

[[Polynomial Regression]]
Special case of [[Multiple Regression]]
The relationship between predictors and outcomes is modeled as a $n^{th}$ degree polynomial, thus **nonlinear with respect to** $\bm{x}$
$$y=\beta_0 + \beta_1x_1+\beta_2x_2^2+\beta_3x_3^3+\ldots+\beta_nx_n^n+\epsilon$$
Still considered [[Linear Regression]]: is still linear **with respect to its parameters**. It is strictly a [[Linear Algebra (ML)#Linear Combination|linear combination]] of its parameters (i.e. the $\beta$'s are still linear/no powers)
Problem: [[Overfitting]]. Model will reduce [[Root Mean Squared Error|RMSE]] by increasing number of degrees, but model is actually not generalizing new information, but instead [[Overfitting]] on noise in the data.


[[Regularized Regression]]
Addresses issue of [[Collinearity]] and [[Overfitting]]
- The estimated $\beta$'s is highly dependent on the training set
- Even small changes in the training set (i.e. a different sampling, removing a few rows) can result in **very different $\beta$ estimates**
- [[Variance]] of the unbiased estimators is high

Regularization adds a constraint (**regularization term**) that biases the estimator a little, but reduces variance a lot. Intuitively, we introduce [[Bias]] on purpose to reduce variance.
- Intuitively, regularization cuts down betas that stick out
$$\beta^* = \underset{\beta}{\text{argmin}} \left[ \sum_{i=1}^n (Y_i - f(X_i; \beta))^2 + \lambda \cdot \Omega(\beta) \right]$$

**L2 regularization**
$$\min ||\bm{y}-X\bm{\beta}||^2 \text{, subject to } (||\bm{\beta}||_2)^2\leq c^2$$
Essentially, we penalize large coefficients by adding a term to the loss function
$$
\begin{align*}
\beta^* &= \underset{\beta}{\text{argmin}} \left[ ||\bm{y}-X\bm{\beta}||^2 + \lambda \cdot ||\beta||^2 \right]\\
&= (X^TX+\lambda I)^{-1}X^T\bm{y}
\end{align*}$$
"The length of $\bm{\beta}$ is shorter than a constraint from the $L_2$ norm, making all $\beta_i$ smaller (but never zero)"
- "length of $\beta$": the [[Analytic Geometry (ML)#General Vector Norms|L2 Norm]] of the coefficient vector, $\bm{\beta}$
	- $||\bm{\beta}||_2^2 = \beta_1^2+\beta_2^2+\ldots$ = (squared) [[Analytic Geometry (ML)#General Vector Norms|L2 norm]] of the vector $\bm{\beta}$
- "is shorter than a constraint from $L_2$ norm": $||\beta||_2^2 \leq c^2$
- "making all $\beta_i$ smaller": **L2 penalty shrinks all coefficients toward zero**
- "but never zero": Unlike [[Regularized Regression#L1 Regularization (LASSO Regression)|L1 Regression]], coefficients are never set to zero (i.e. removed); only their magnitudes are reduced

**L1 Regularization**
**LASSO**: Least Absolute Shrinkage and Selection Operator
$$\min ||\bm{y}-X\bm{\beta}||^2 \text{, subject to } (||\bm{\beta}||_1)\leq c^2$$
$$\beta^* = \underset{\beta}{\text{argmin}} \left[ ||\bm{y}-X\bm{\beta}||^2 + \lambda \cdot ||\beta||_1 \right]$$
"Length of $\bm{\beta}$ is shorter than some constraint according to $L_1$ norm, by setting individual $\beta_i$ to zero"
- L1 Penalty Term $\lambda||\bm{\beta}||_1$ constraints length of $\bm{\beta}$ to be less than some number: $||\bm{\beta}||_1 \leq c$ 
- LASSO **sets collinear $\beta$ to 0, and only keep the useful $\beta$**. In other words, it's a **feature selection method**.

**Lambda Term** $\lambda$ is a hyperparameter that affects the betas
- The optimal $\lambda$ comes from hyperparameter tuning by user
- Hyperparameter tuning is done by [[Train Test Split|validation set]]
- Is a non-negative number between $(0, \infty)$
- tuning range of $\lambda$ constrained by **domain knowledge**, or what you know about what you are trying to research

[[Logistic Regression]]
Logistic regression predicts probability that a certain event will happen given a set of predictors (features)
$$\beta^* = \text{argmin}_\beta\sum^n_{i=1}(Y_i-f(X_i; \theta, \lambda))^2$$
Where
- $\theta = \beta$
- $\mathcal{L} =$ [[Cross-Entropy Loss]]
- $f: \hat p = \frac{1}{1 + e^{\beta x}}$

**Logistic Function** - the inverse of the logit function
$$\text{logit}(p)=\ln\left(\frac{p(x)}{1-p(x)}\right)$$
$$p = P(Y = 1 \mid X) = \frac{e^{\beta_0 + \beta_1 x_1}}{1 + e^{\beta_0 + \beta_1 x_1}} = \frac{1}{1 + e^{-(\beta_0 + \beta_1 x_1)}}$$
We want: "a function that maps predictors to probabilities of discrete outcomes in a continuous, bounded, and nonlinear fashion"
- "map predictors to probabilities": function takes in any combination of predictor (feature) values, and output a probability between 0 and 1
- "of discrete outcomes": outcome is discrete, usually binary (0/1)
- "continuous": want a smooth and continuous curve so that small changes in input predictors lead to small changes in output probability
- "bounded": function min and max must be between 0 and 1 (probabilities' between 0 and 1)
- "nonlinear": allow for unequal impact of unit-change in x

**Affects of changing beta**

|          | $\beta_0$ (intercept)            | $\beta_1$ (slope coefficient)                                           |
| -------- | -------------------------------- | ----------------------------------------------------------------------- |
| Increase | Entire curve shifts to the left  | S-curve becomes steeper; model is more confident                        |
| Decrease | Entire curve shifts to the right | S-curve becomes flatter; prediction stays closer to 0.5, less confident |
| Negative |                                  | Curve is flipped, inverse relationship                                  |

Loss function: uses **[[Cross-Entropy Loss]]**
- [[Residual Sum of Squares|RSS]] assumes residuals are normally distributed. This is impossible with binary outcomes

Estimator: **[[Maximum Likelihood]]** to minimize loss and find betas
**Threshold**: The predictor value above which the model predicts one of the categorical outcomes (e.g. 0) vs predicting the other one (e.g. 1) (makes logistic regression classification)

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

[[Classification]]
--

**Blessing of Dimensionality**: The more features the better usually --> more dimensions to be able to accurately split the data

**[[Confusion Matrix]]**

|                                 | **Actually Positive (AP) (1)**                                   | **Actually Negative (AN) (0)**                           |
| ------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------- |
| **Predicted Positive (PP) (1)** | True Positives (TP)<br>*Correct*                                 | False Positives (FP)<br>*Miss, Type II or $\beta$ Error* |
| **Predicted Negative (PN) (0)** | False Negatives (FN)<br>*False Alarm, Type II or $\alpha$ error* | True Negatives (TP)<br>*Correct*                         |
**Prevalence**: proportion of *all* positive cases; When prevalence is high or low ==> class imbalance
$$\text{Prevalence} = \frac{AP}{AP + AN}$$
**Sensitivity** or **Recall** or **True Positive Rate**: how well model identifies positive cases out of all *actual positive cases* (AP). Ability of model to detect that a signal is really prsent
$$\text{Recall} = \frac{TP}{AP} = \frac{TP}{TP + FN}$$
**Specificity** or **Selectivity** or **True Negative Rate**: how well model identifies negative cases out of all *actual negative cases*. Ability of model to not hallucinate that a signal is present, when it is not
$$\text{Specificity} = \frac{TN}{AN} = \frac{TN}{TN+FP}$$
**Precision**: how many of the *predicted positive cases* were actually positive. Fraction of prediction that came true
$$\text{Precision} = \frac{TP}{PP} = \frac{TP}{TP+FP}$$
**Negative Predicted Value**: how many of the *predicted negative cases* were actually negative (not used frequently because if you have the others, this is implied)
$$\text{NPV} = \frac{TN}{PN} = \frac{TN}{TN+FN}$$**F1 score**: Harmonic mean of precision and recall
$$\text{F1 score} = 2 * \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$$
**Matthews Correlation Coefficient** or **MCC**
$$\text{MCC} = \frac{(TP \times TN) - (FP \times FN)}{\sqrt{(TP + FP)(TP + FN)(TN + FP)(TN + FN)}}$$
**ROC**: Plots the **sensitivity** (true positive rate) as a function of the **false positive rate**
- x-axis = false positive rate = 1 - specificity; false alarms
- y-axis = true positive rate or sensitivity (recall); correct positives

**Area Under ROC (AUROC)**: the area under the ROC. Ranges from 0 to 1
- AUC score *does not change* w.r.t. the threshold

**PR Curve**: Plots the **fraction of positive predictions that are true**
- x-axis = recall; y-axis = precision

**AUPRC**: Area under the PRC.
MCC, PR Curve is more robust for **imbalanced dataset** (prevalence is high or low)

[[Support Vector Machine]]
**Margin**: distance between **decision boundary (hyperplane)** and the *closest data points from each class*.
Margin classifiers pass a **linearly separable hyperplane** through data to classify into 2 groups such that *the margin is maximized*
**Support Vectors**: the edge observations/points that create the hyperplane
**Hard Margin Classifiers**
Hard margin classifier assumes
- Assumes perfectly separable data
- Has no tolerance for misclassification or margin violations

$$\text{Hyperplane: } \bm{w^T}\bm{x} - b = y$$
$\bm{w}$ represents the weight vector; [[Analytic Geometry (ML)|Geometrically]], it is also the **normal** (perpendicular) vector to the hyperplane (i.e. defines the hyperplane's orientation)
$b$ is the bias; $\bm{x}$ is the inputs or predictors; $y$ is the class membership, $\in \{-1, 1\}$
$$\text{Margin Size} = \frac{2}{||\bm{w}||}$$
To maximize the margin, we have to minimize $||\bm{w}||$, such that $y_i(\bm{w^T}\bm{x}-b) \geq 1$
$$\min_{\mathbf{w}, b} \quad \frac{1}{2} \|\mathbf{w}\|^2 \quad \text{subject to } y_i(\mathbf{w}^T \mathbf{x}_i + b) \geq 1$$
$y_i(\bm{w^Tx}-b) \geq 1$: constraint that *all training examples are classified* (i.e. they lie outside or on the margin)
Problems:
1. IRL data is not always perfectly separable (i.e. sometimes the model *has to misclassify*)
2. **Sensitive to outliers**: Maximal margin classifiers are too reliant on specifics of [[Train Test Split|training data]]

**Soft Margin Classifiers**: allow for misclassifications in the margins. we misclassify some data in the margin to make the model more robust. sometimes, the model *has* to misclassify
Loss Function: **[[Hinge Loss]]**
$$L = \max(0, 1 - y_i(\bm{w}^T\bm{x}_i+b))$$
Hinge loss is great because it can add penalty (loss) for both:
1. incorrect classification (and it is unbounded, so the more wrong the classifier is, the more loss you incur)
2. correct classification but in the margin (i.e. not that confident in prediction)

Data no longer needs to be linearly separable. We allow and try to minimize some **slack** $\xi$
$$\min\sum_{i=1}^n\xi_i\ \text{ s.t. }  y_i(\bm{w}^T\bm{x}_i+b) \geq 1-\xi_i$$
Then, we use hinge loss as a loss function, the loss becomes:
$$\min_{\bm{w}, b} \quad \lambda \|\bm{w}\|^2 + \frac{1}{n}\sum_{i=1}^n\max(0, 1-y_i(\bm{w}^T\bm{x}_i+b))$$
**[[Kernel Trick]]** to mimic transformation of space into higher dimensional to make linearly inseparable data hopefully linearly separable
Assessment
- Intuitive: the idea is just maximizing the margin
- Versatile (via the kernel trick) so it is commonly used
- Divides space into clearly defined regions (so it is simple and very interpretable)
- Robust classification that is generally not prone to overfitting (cuz soft classifier)
- Fast and Efficient (scales particularly well for highly dimensional data)

[[Decision Tree]]
Tree allow for accurate classification of *highly complex, linearly non-separable datasets*.
**Stump**: a simple tree with just a root and leaves (no intermediate nodes)
**Leaf Impurity**: measures how "mixed" the data is in a leaf node; if all the data in a leaf belongs to the same class, it is **pure** (this is good); if the leaf contains a mix of classes (e.g. some yes, some no), it is **impure** (this is bad)
**[[Gini Index]]**: quantifies leaf impurity. Tells you how “impure” or mixed a *node* is in terms of class distribution. Higher gini index = more impure, or the node is less useful for making prediction
$$GI = 1 - \sum_{i=1}^n p_i^2$$
Tree **splits** are determined by maximizing leaf purity (or minimizing leaf impurity) --> choose the split with the lowest gini index
- If features are numerical, sort numeric data in increasing order, then try different splits by thresholds (e.g., $x \leq 5$, $x \leq 10$, etc.).
- If it’s categorical, try splitting based on category values.

Also can use **[[Entropy]]** to grow the tree; The idea is to *maximize information gain* from split
Compared to Gini Index, Entropy tends to penalize mixed nodes more strongly due to its logarithmic scale. Generally speaking, there's *no difference between using Gini Index and Entropy* to grow a Decision Tree
- Entropy is typically twice that of Gini Index

**Tree Pruning**: Only consider leaves if they have a minimum number of cases. Deals with overfitting
**Tree Regression**: Basically just use range of numbers

Pro
- Intuitive: basically just a bunch of if-else statements
- Highly interpretable: again, just a bunch of if-else statement (and we can see the splits)
- Handles complex, non-linearly separable categorical data natively (no need for encoding)

Con
- Strong tendency to [[Overfitting|overfit]]
- Individual trees tend to be **weak learners**

**Strong learners** get the model error below some threshold $\epsilon$ with a probability higher than $1-\delta$. If a model *physically* cannot do that, it is a **weak learner**

**Ensemble**: If every individual tree is fundamentally flawed in known ways (weak learner), what if we aggregated them into ensembles, to minimize errors

[[Tree Bagging]]
We create $n$ trees (~20-200)
1. Create a [[Bootstrapping|bootstrapped]] dataset (creates an **in-bag** and **out-of-bag** set).
2. Train on **in-bag** set. When each tree makes a [[Decision Tree#Growing The Tree|split]], algorithm *selects a random subset of features* to increase the column (instead of bootstrapping rows, we bootstrap the columns)
	- Selecting subsets of training data at random --> helps with [[Overfitting]]
	- Selecting subsets of features at random --> helps decorrelate the trees (we force each tree to make splits differently (with different features), rather than end up with very similar trees)

Testing
1. After all the trees are created, run points from **out-of-bag** set through all of the classification trees for which it is out-of-bag
2. Forest's classification is the **modal** classification made by the individual trees
	- modal classification: equal voting power of each tree

Out of bag classification error decreases with the number of trees bagged due to [[Central Limit Theorem]]
- Integrating independent information to cancel random error
- Also why we don't need a *huge* number of trees (after a certain point CLT's blessing stops)

Random forest tends to yield "patchwork" solution

[[Tree Boosting]]
1. Start with a [[Decision Tree]] that is deliberately as simple as possible (e.g. stump). This single tree *will be wrong due to [[Bias]]*
2. We correct the *errors* (refers to [[Train Test Split|validation or test set]]) that this tree makes by adding another simple ([[Underfitting|underfit]]) tree *sequentially*, until model error drops to an acceptable level. essentially train new tree on the error

**AdaBoosting**
*Creating the first stump*
- Step 1: Create the first stump by picking the variable that minimizes [[Gini Index|Gini]]
- Step 2: Classify using only this stump (with modal voting)
- Step 3: Calculate this stump's **error** and **voting power**
	- **error** = sum of weights of incorrect classified cases
	- Use error to determine **voting power** (importance) of the stump:
- Step 4: Update data weights for next stump

*Creating the next stump(s)*
- Step 1: create a new, [[Bootstrapping|bootstrapped]] dataset
	- same number of rows as original dataset, but drawing with replacement from a [[Discrete Uniform Distribution|uniform distribution]] (i.e. randomly w the normalized weights)
	- Probability of drawing a given row is given by the *normalized weight* --> previous misclassified cases have a higher chance of being drawn
- Step 2: Determine [[Gini Index|Gini indices]] for remaining possible variables using the new bootstrapped dataset
- Step 3: Pick variable associated with lowest Gini index
	- This split will have the best classification on a sample that has way more data that was previously misclassified
	- Result: this new tree/stump is literally learning on previous stump's mistake
- Step 4: repeat process until all cases classified or a reach a pre-determined number of stumps (to avoid [[Overfitting]]; number of stumps is a hyperparameter)
- Step 5: Classify test cases with entire ensemble of stumps, where each stump vote is scaled by its **voting power** (majority wins)

**Gradient Boosting**
Each tree starts with the simplest possible model: a single leaf (not a stump)
Leaf represents the predicted classification for every individual. Need to convert this value into a probability. We can use the [[Logistic Function]] $\hat{p}(x) = \frac{e^{F(x)}}{1 + e^{F(x)}}$
We use this model to do an *initial guess*. Most likely, model will predict everyone is $y=0$ or something (basically very [[Underfitting|underfit]])
We then build a regular [[Decision Tree]] using *all features* to predict **residuals**
$$\text{Leaf value} = \frac{\sum_i \text{residual}_i}{\sum_i \hat{p}_i (1 - \hat{p}_i)}$$
Updating the tree:
For each case in the training data,
1. First we need original log-odds from previous round, new prediction from the tree, and a learning rate (something small)
2. Update guessed probability of a case being some class by: $\log(\text{odds})_{\text{new}} = \log(\text{odds})_{\text{old}}+LR\times\text{Tree prediction}$
3. Convert log odds into probability (like in above) with (for example) logistic function

Then repeat all of the above until residuals fall below some threshold

[[Artificial Neural Network]]
A **sufficiently large network can learn arbitrarily complex functions** by adjusting weights and biases - its a really good function approximator
Is **Turing Complete**: Anything that is *computable* can be computed by NN, but with all these unrealistic assumptions that makes it impossible to do in real life.
**[[Perceptron]]**:  can implement basic logical function, like AND, OR. But it cannot do XOR (exclusive OR)
**Neuron**: basically a computational unit that just does dot product. 1 computes [[Analytic Geometry (ML)#Dot Product|dot product]] between inputs and weights; 2 adds a [[Bias|bias]]; 3 optionally passes results in activation function 
$$z = \sigma(\mathbf{w}\cdot\mathbf{x}+b)$$
Commonly used **activation functions**:
- **Sigmoid**: maps to $(0, 1)$: $f(x) = \frac{e^x}{e^x+1}$
- **Softplus**: maps to $(0, \infty)$: $f(x) = \ln(1+e^x)$
- **ReLU**: $f(x) = \max(0, x)$

**Bias**: To avoid activation from noise, we only want meaningful activation if the inputs exceed a certain threshold -- which we call [[Bias]] $b$; Often a negative number
**Training**
$$\underbrace{
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
}_{\text{15$\times$1}}$$
Where
- $\mathbf{a}$ is the activations from previous layer
- $\mathbf{W}$ is the connections/weights between previous layer's neurons and next layer's neurons; each row represents the weights for one (next layer) neuron
- $\mathbf{b}$ is bias lol, one for each (next layer) neuron

Connection between input and hidden layer: $25 \times 15 = 375$ weights 
Connection between hidden and output layer: $15 \times 10 = 150$ weights
Number of biases: $15+10=25$
Total number parameters: 550

Cost Functions: **Mean Squared Error**, [[Cross-Entropy Loss]], [[Residual Sum of Squares]]
We use [[Backpropagation]] to find this direction, or the gradient $\nabla$
[[Gradient Descent]] then adjusts the weight accordingly ($-\nabla$) to lower the cost

General step by step idea:
1. [[Artificial Neural Network#Fully Connected Feedforward Networks|Forward Pass]] (compute outputs layer by layer)
2. Compute loss (compare prediction $\hat y$ with true label $y$) using [[Artificial Neural Network#Cost Function|some cost function]]

Then [[Backpropagation]] via [[Vector Calculus (ML)#The Chain Rule|chain rule]] to compute gradient of loss
3. Compute gradient at output layer (compute derive of loss at last layer)
4. Propagate error back, compute derivative of loss at previous layers

Finally [[Gradient Descent]]
5. Update weights using all the gradients

Potential problems in backpropagation
- [[Vanishing Gradient]]: component derivatives are < 1; When gradients becomes **very small**, eventually shrinking so much that earlier layers basically stops updating
- [[Exploding Gradient]]: component derivatives are > 1; when gradients become **very large** during 

Problems with ANN:
Problems with this approach:
- does not scale well beyond simple examples (image is *huge*...)
- shift invariance is poor: small shift in input (e.g. small change in img) does not lead same output (e.g. if cat position moves in an img, not able to recognize cat)
- does not take advantage of correlations between pixels in image
- extracted features in hidden layer are usually meaningless

[[Convolutional Neural Network]]
In a CNN, **convolution** is the process of sliding a small matrix (called a **filter** or **kernel**) over the input (e.g., an image) and computing a **dot product** at each location. This produces a new matrix called a **feature map**.
**Kernels**: With different kernel shapes, convolution can detect patterns in the input; The kernels are **also learned**.
**CNN Layer**: CNN layers take advantage of local correlations in neighboring pixels. **Allows to detect patterns that look like the kernel** -- the hidden layer activation becomes meaningful
**Convolved image**: image after convolving a filter through
- Observe that the convolved image looks a lot more like the kernel!

**Feature map**: the convolved image after applying the filter/kernel [[bias]]. We can then put the feature maps through reLU (activation function)
**Pooling layer** reduces the size of the input **feature map** (reduce spatial dimension but retain most important information). This step is optional

Unsupervised Machine Learning
--
**Dimensionality Reduction**: In a dataset, what matters is the amount of [[Independence|independent]] information in the dataset
**Feature extraction**: reveal (independent) **latent factors** underlying the data

[[Singular Value Decomposition (ML)]]
SVD is a more general factorization than [[Eigendecomposition]] that works on *any* $M \in \mathbb{R}^{m\times n}$  uniquely (up to sign ambiguities) into **readily interpretable component matrices**
$$\underbrace{M}_{m \times n} = 
\underbrace{U}_{m \times m} 
\underbrace{S}_{m \times n} 
\underbrace{V^T}_{n \times n}$$
[[Linear Algebra (ML)#Vectors|Column vectors]] of $V$ are directions in feature space, tells you how to **rotate and align** original features to uncorrelated axis
Singular values $S$ indicate how important each direction in $V$ is (larger singular value = more variance captured in that direction)

[[Principal Component Analysis (ML)]]
**Data** --> **Covariance Matrix** --> **Factor Extraction** (on [[Covariance Matrix]])
PCA performs dimensionality reduction by finding principal components (new axes) that points in the direction of *maximum variance* in the data

Hence we are finding eigenvectors of **covariance matrix**!
- eigenvectors -> direction in feature space where variance is maximized
- eigenvalue -> how much variance in that direction

If data is **not normalized**, the variables with the larger scale will DOMINATE. PCA maximizes [[variance]]; without standardization, eigenvalue is not interpretable
In essence, PCA finds *coefficients of a [[Linear Algebra (ML)#Linear Combination|linear combination]]* of original variables ($X_1, X_2, \ldots$) that *maximizes captured variance*
$$P = a_1X_1 + a_2X_2+a_3X_3+\ldots+a_nX_n$$
Where $\mathbf{a} = [a_1, a_2, \ldots, a_n]$ is an eigenvector of the covariance matrix; it *points in the direction of maximum variance*
PCA is blind to class labels; This could have bad consequences for [[Classification]] tasks

[[Linear Discriminant Analysis]]
LDA projects onto a dimension that maximizes distance between projected class means while minimizes variance within projected class
Requirements: 1) needs class labels; 2) assumes [[Normal Distribution|Gaussian Distribution]] of data within class
basically finds new axes to project data along to that tries to make classes as linearly separable as possible (and minimize within-class variance)

[[Multi-Dimensional Scaling]]
A nonparametric method, i.e. no fixed [[Linear Algebra (ML)#Linear Mappings|mapping]] between inputs and outputs
MDS does two things: 1. Determine what dimensions matters in a person's mind; 2. Map the datapoint onto that dimension
Transform data into distance (similarity / affinity) matrix by:
1. computing all distances between all data points
2. place same data points in lower dimensional space (# dimensions = hyperparameter)
3. compute **stress**
4. iterative move points in lower dimensional in a way that reduces stress
5. keep doing this until stress drops under some threshold (ideally 0)

$$\text{Stress} = \sqrt{ \frac{ \sum_\limits{i<j} \left( d_{ij} - \hat{d}_{ij} \right)^2 }{ \sum_\limits{i<j} d_{ij}^2 } }$$
Downsides
MDS work best if dataset is small; complexity is $O(n^2)$
MDS preserve pairwise high-dimensional distances in lower-dimensional space
There might be *no configuration of points in a lower dimensional space that preserves the distances in the higher dimensional space sufficiently*; Stress cannot be reduced past a certain point

[[Stochastic Neighbor Embeddings]]
Designed to address both [[Multi-Dimensional Scaling#Downsides|Downsides of MDS]]
SNE preserves the nearest **neighbors** in lower dimensional space, not *distances* (MDS)
- solves computational complexity problem
- solves problem of not being able to preserve distances in lower dimensional space

Loss Function: **[[Kullback-Leibler Divergence|KL Divergence]]** - $L = \sum_{i, j}p_{ij}\log\frac{p_{ij}}{q_{ij}}$
$p_{ij}$: High dimensional **affinity** (i.e. similarity between datapoints; kinda like distance)
$q_{ij}$: Low dimensional affinity; "distance" between $y_i$ and $y_j$ in low dimension, or **image** of x
SNE minimizes loss by iteratively moving the points in low dimensional embedding
But, SNE is unlikely to preserve global structure of data (especially if initialized with a random low-dimensional configuration) --> recommend initialize starting positions with [[Principal Component Analysis (ML)|PCA]]
**Perplexity**: hyperparameter of SNE, or the effective width of the neighborhood
- Above 30: gaps between clusters tends to get larger; Below 30: gaps tends to get narrower
**Crowding Problem**: in high dimensional space, there really are no neighbors (everything's far away)
Use t-SNE; We use [[T-Distribution]] instead of [[Normal Distribution]]
1. t-distribution approaches normal distribution with high degree of freedom
2. when small, t-distribution has *heavier tails* (extreme values more likely)

T-SNE Assessment
Faster than [[Multi-Dimensional Scaling|MDS]]; but still a bit slow $O(n^2)$
Often yields cleaner category separations than [[Principal Component Analysis (ML)|PCA]], especially when visualized (and t-SNE with high perplexity)
Preserves local structure well (but not global structure)

[[UMAP]]
- compute topological representation of high-dimensional data as a fuzzy simplicial set
- identify k nearest neighbors of each data point
- create low-dimensional representation of the data
- optimize representation (by moving points around) so that it preserves simplicial topological structure of the high dimensional data as much as possible, reducing [[Cross-Entropy Loss]]

Assessment
- Makes use of topological concepts to represent data, **preserves overall structure of data better** and yields more **consistent result** when ran repeatedly (compare [[Stochastic Neighbor Embeddings|t-SNE]])
- faster than t-SNE $O(n\log n)$
- makes nice "archipelago-like" pictures
- downside
	- relatively large number of hyperparameters: number of neighbors, repulsion strength, sensitivity to noise and extreme values
	- lack of metric to assess quality of low-dimensional embedding
	- need to validate meaning of distances and dimensions of low D solution

[[Autoencoder]]
Force bottleneck so that model can pick up on the important stuff in the hidden layer; the hidden layer finds an embedding space that represents the data
basically try to reconstruct the data but go through a hidden layer that has much less neurons
Common use cases: image compression, feature extraction, noise reduction, low dimensional embeddings/latent spaces, generative AI

**Clustering**: members of cluster (or natural group in data) are similar to each other, but dissimilar from members of other groups/clusters. Once you have applied dimension reduction, the data likely "cluster" now in the low-dimensional space (for t-SNE and UMAP in particular)

[[K-Means]] (distance-based)
1. place $K$ **centroids** (or cluster centers) at some initial location
2. Determine the nearest centroid for each data point in the dataset.
3. Calculate distance of all data points from their nearest centroid
4. Sum all these distances
5. Adjust location of centroids such that total distance of all points from centroids decrease
6. Iteratively do this until total distance / centroid location no longer move

Loss function: [[Distortion]]

**Lloyd's Algorithm**: fast K-means
1. Initialize centroids: Randomly choose k data points as initial centroids.
2. Greedy assignment step: For each data point, assign it to the nearest centroid (locally minimizing the squared distance for that point).
3. Greedy update step: For each cluster, recompute the centroid as the mean of all points assigned to it (locally minimizing within-cluster distortion).
4. Repeat until convergence: Continue reassigning points and updating centroids until the assignments stop changing or the change in distortion is very small.

Hyperparameters:
- $k$: number of clusters you want
- Initial centroid location (default is random)
	- changing this helps with getting stuck in local minima
	- though the impact isn't *thaaaaat* big
- Distance metric (default is Euclidean Distance)

Centroids could get stuck in local minima:  no way to move such that distortion would go down
Solutions
1. run 100 times and pick the one with the lowest distortion
2. **KMeans++**: Initialize centroids at [[Continuous Uniform Distribution|uniform density]]; By putting uniform distribution over cluster centroids --> spreads initial placement of centroids out, reducing chance of poor clustering

Finding optimal number of clusters:
**Elbow Method**: find cluster number thats at the "elbow"
**Silhouette Method**: Find $K$ that creates the highest silhouette coefficients sum
Problem with KMeans: assumes one-dimensional gaussian distribution; but is problematic if data is non-spherical multivariate Gaussians

[[Gaussian Mixture Models]]
**Gaussian Mixture Models**: a GMM represents the entire dataset as a weighted sum of Gaussian distributions
**Covariance Matrix**: can be represented by an ellipse, so we can do an Eigendecomposition to find the eigen vectors (orientation of ellipse axes) and eigenvalues (lengths of elliipse axes)
**Expectation maximization algorithm**:
- E-step: compute computation probability that point i belongs to cluster k (**responsibility**) for each point
- M-step: update parameters with these probabilities (basically best estimates; specifically, - Move the cluster centers closer to the data points that are likely to belong to them, and Recalculate spreads and proportions of each cluster.

Repeat until end parameteres congerge
Gives soft value

[[DBScan]] (density-based)
**Density**: number of data points per area
Expects two hyperparameters: **Epsilon** (radius around a data point that forms a region/neighborhood within the perimeter), and **minPoints** (minimum number of data points including starting point that must be in region (within parameter) for a cluster to be formed)

Growing a cluster once its formed:
- data points that are cluster members "broadcast" their own perimeter to look for new cluster members
- based on the density concept, DB scan distinguishes 3 kinds of data points
	- "core point": has N >= M within E
	- "border point": N < M; but reachable from core point
	- "Outlier point": not a core point, nor reachable

[[Hierarchical Clustering]]
Determine number of clusters and identity of cluster and cluster membership -> on basis of distance cutoff (a choice) or the number of clusters (also a choice), as we ll as choice of **linnkage** function
- single linkage: distance between closest points in cluster
- complete linkage: distance between furthest points in cluster
- centroid linkage: unweighted center of mass

[[Kohonen Networks]]
Goal: adjacent neurons should end up (after training) with similar weights; if that is the case, adjacent neurons will respond to similar input patterns, effectively implementing similarity based clustering
**Competition**: identify neurons with weight vector that is most similar to input data: $\max(\mathbf{w}_i^T\mathbf{x})$, this is called the BMU (best matching unit)
**Collaboration**: identify neurons that are in the neighborhood of the BMU, usually by some adaptative gaussian "neighborhood" function that uses distance and time to determine neighborhood radius
**Learning**: update weights of neurons in neighborhood such that they become more similar to the input data
Repeat until some number of iteratinos is reached or weights dont change anymore
Can be used for clsutering; idea is to label data by neuron that is closest to them. Functionally, the solution of Kohonen network is really similar to kMeans

Reinforcement Learning
==
[[Reinforcement Learning]]
**Bellman Equation**, **Q Score**
$$Q(s, a) = r + \gamma\max Q(s', a')$$
where $\gamma$ is the immediate reward, $\gamma$ is the discount factor (rewards in future is less valuable ig), and $Q(s', a')$ is future (neighboring) reward
Agent can proveably learn actino-value function with Q-learning, by exploring the environment and updating the **Q-table**
**Markov Decision Process**: all states of environment are fully observable (no hidden states), and current state contains all information about process. Not path dependent (future not dependent on past, only knowing present is enough).
**Policy**: mapping a current state to an (optimal) action
Problems of Q-Learning
1. reward validity: what is actually learned by the reward?
2. explore/exploit tradeoff: need to let model randomly make some decisions to try new things, otherwise it may always do things it has already tried and get stuck in local minima
3. Rewards is sparse such that random actions are essentially never rewarded; if agent is only punished, it will never learn
	- solution 1: insight learning (like humans we have insights), but erm not rlly applicable
	- solution 2: reward exploration itself (trying new things), but could create problem because the model just ends up memorizing a play style rather than learning
4. memorization vs learnign: is the model actually learning or just memorizing?
5. score: games are good because there scores are available, updated often, valid, and rules don't change. that is not the case in real life.
	- we CAN use human judgement, but then we can never get super human performance
6. Large state spaces - cant fill out the entire table...
7. Delayed feedback: how do we know which action in teh past was helped the winning/losing move?
	- one solution: **reward shaping** - give partial credit. but this has to be specific to each environment, and canot generalize. also makes memorization problem worse

[[Deep Reinforcement Learning]]
Basic idea: we need to **approximate the Q Function**, which Neural Network does a great job at - they are good general purpose nonlinear function approximators
**Sequence of states** are often highly correlated
- training directly on experience is not efficient (like i mean moving one step forward the states rlly still  the same but model will see it as different); could create feedback loop
Solution: **replay buffer** or **memory**, such that the experience (state/action/reward) of the agent at each time step plus what happened next is stored. network is trained by sampling randomly and uniformly from content of replay memory (to break correlation)
**Recurrent Neural Network**: considers concept of time and sequence by introducing a hidden state (memory) that evolves over time
- vanishing gradient/short term memory problem is very serious
**Long Short-Term Memory**: enable long term dependencies by adding memory cell, and control information flow by gates. still sequential, so training is slow, there is bottleneck, and still struggle with long sequences
**Attention**: model *all* pairwise relationships between *all* tokens in parallel (very expensive!) bottleneck is now computational; each token has simultaneous and direct access (fully connected0 to all others) weighed by the learned attention score to allow even very long range dependencies; when processing a token, weighted average of all other tokens is computed
**Transformer**: input sequence of tokens is transformed by repeatedly applying attention in feedforward fashion; each token's vector representation gets progressively refined by seeing how it related to all other tokens, and that changing relationship reshapes its meaning. removes recurrence entirely

Others
--

Loss Function
==
List of Loss Functions
[[Residual Sum of Squares]]
- Critical assumption: Residuals are [[Normal Distribution|normally distributed]]

$$RSS = \sum_{i=1}^n e_i^2 = \sum_{i=1}^n (y-\hat y)^2$$

[[Cross-Entropy Loss]]
Consider two distributions: $p(x)$, the distribution of outcomes (ground truths), $q(x)$, the distribution of predictions produced by model. We define **cross-entropy** between $p(x)$ and $q(x)$ as:
$$H(p, q) = -\sum_xp(x)\log q(x)$$
A **higher** cross-entropy means the model’s predicted probability distribution q(x) is **further from the true distribution** p(x).
Cross entropy *LOSS*
$$L(y, \hat p) = -[y\log \hat p + (1 - y)\log(1-\hat p)]$$
In SL: $p(x)$ always evaluates to 0 or 1; $q(x)$ predicted probability $\hat p$ that $y = 1$; as such, one of the two expressions above will always evaluate to 0

[[Hinge Loss]]
Main idea of hinge loss: model incurs penalty if its prediction is wrong, *and* if the prediction is not confident enough (even if it is technically correct)
$$L(\bm{x}, y_i) = \max(0, 1 - y_i\hat y)$$
$y\hat y$ is the *hinge*; When correctly classified, loss = 0 (no extra credit for being right, mathematically it's because of the $\max(0, \ldots)$); When correctly classified but not confident (e.g. in [[Support Vector Machine|SVM]], the prediction is "in the margin"), there is *some hinge loss*; When incorrect classified, there is *hinge loss*. it is not bounded because you can be extremely wrong

[[Gini Index]]: tells you how impure or mixed a node is in terms of class distribution; higher gini index = more inpure (node is less useful for making prediction)
$$GI = 1 - \sum_{i=1}^n p_i^2$$

[[Entropy]]: measure of surprise
$$H(X) = -\sum_xp(x)\log p(x)$$
where $p(x)$ = probability of some outcome, $\log p(x)$ = log sums

[[Kullback-Leibler Divergence]] (KL Divergence) measures how one probability distribution $Q$ is **different** from a reference probability distribution $P$.

$$ L = \sum_{i, j}p_{ij}\log\frac{p_{ij}}{q_{ij}}$$
$p_{ij}$: probability from true distribution (real data)
$q_{ij}$: probability from approximate or model distribution
(used in t-SNE in our class)

[[Distortion]]: loss function of kmeans

$$L = \sum_{i=1}^{k} \sum_{x \in C_i} \|x - \mu_i\|^2$$
- $x$ = a data point
- $k$ = number of clusters
- $C_i$: $i$th cluster (set of data points assigned to cluster $i$)
- $\mu_i$: centroid of cluster $i$

Issues: no analytical solution; not convex (prone to local minima)

Performance Metric
==

[[Root Mean Squared Error]]
$$RMSE = \sqrt{\frac{\sum(\hat y - y)^2}{n}}$$
Where
$$\hat y - y = e$$
$\hat y$ = predictions; $y$ = outcome; $e$ = residuals
RMSE is the standard deviation of the residuals
RMSE and [[R-Squared|R^2]] is inversely related

[[R-Squared]]
$R^2$ is the **Coefficient of Determination**, can be interpreted as how much of the outcomes' variance is **explained** or **accounted for** by the model.
It is given by the squared correlation between predictions and actual outcomes
$$COD = r(\hat y, y)^2$$

$R^2$ ranges from (0, 1)
- 0 = model's features are not predictive
- 1 = model's features predict outcomes perfectly

**Negative COD** is possible, meaning that the model is systematically guessing worse than the mean outcomes (i.e. its worse then just predicting the mean all the time)

[[Pearson Correlation Coefficient]]
The **Pearson correlation coefficient** measures how strongly two variables are linearly related (r measures strength and direction of linear relationship). It is defined as:

$$r =\frac{\sum\left(x_{i}-\bar{x}\right)\left(y_{i}-\bar{y}\right)}{\sqrt{\sum\left(x_{i}-\bar{x}\right)^{2} \sum\left(y_{i}-\bar{y}\right)^{2}}} = \frac{Cov(X, Y)}{\sigma_X, \sigma_Y}$$
- $x_i, y_i$ are the individual sample points
- $\bar{x}, \bar{y}$ are the sample means

| **Value of r** | **Interpretation**                  |
| -------------- | ----------------------------------- |
| 1.0            | Perfect positive linear correlation |
| 0              | No linear correlation               |
| -1.0           | Perfect negative linear correlation |
Notes: Only captures linear relationships; Sensitive to outliers

[[Confusion Matrix]] (see above in classification section)

Estimation Methods
==

[[Gradient Descent]]
1. Determine loss function (which yields format of gradient)
2. Initialize parameters with arbitrary (usually random) values
3. Compute gradient using these parameter values
4. Take a **step** in the direction of the gradient (add or subtract gradient value from/to the respective parameter), scaled by the **learning rate**
5. repeat from step 3, until step size is under some threshold, and terminate

[[Backpropagation]]
Apparently a type of backpropagation
First model gotta do forward pass and find erro. after that, its
1. Find [[Calculus (ML)#Partial Derivative|partial derivative]] in each dimension (with the chain rule)
	- "dimension"/parameter refers to each "weight" and "bias" for every neuron in the NN
2. Assemble all partial derivatives in gradient $\nabla$

Basically, you just keep doing [[Vector Calculus (ML)#The Chain Rule|chain rule]] and chain rule and chain rule to go back and see how much all the previous layer's node affects the cost that's all the way at the end.

[[Maximum Likelihood]]
Method to estimate parameters $\theta$ (like $\beta$'s in [[Logistic Regression]]) of a model by finding the values that make the observed data most likely.
> “Given the actual data I observed, what parameter values make it most probable this data would occur?”

We are given:
- A dataset: $\{(x_1, y_1), (x_2, y_2), \dots, (x_n, y_n)\}$
- A probabilistic model: $P(y \mid x;\beta)$, where $\beta$ are the parameters (e.g., weights)

Compute likelihood of each datapoint. 
- In other words, calculate $P(y_i|\bm{x_i}; \bm{\beta})$ for all $i$ from $1$ to $n$
- This means the probability of actual outcome $y_i$ given their personal $x_i$ and overall $\beta$
$$\ell(\bm{y}\mid\bm{x};\bm{\beta}) = \log L(\bm{y}\mid\bm{x};\bm{\beta}) = \sum_{i=1}^{n} \log P(y_i \mid \bm{x_i}; \bm{\beta})$$
$$\hat{\beta} = \arg\max_{\beta} \sum_{i=1}^{n} \log P(y_i \mid \bm{x_i}; \bm{\beta})$$


Problems faced by ML algorithm
==
[[Collinearity]]
**Collinearity** is when two independent variables are highly correlated with each other. **Multi-collinearity** is when multiple independent variables are highly correlated with each other.
Because predictors are correlated, adding a predictor *does not give the model any new information*. Instead, you are just padding information the model already knows. In fact, collinearity may even **introduce more variance**.
When predictors are highly correlated, it's hard to [[Multiple Regression|isolate the effect of each one]].
Unstable $\beta$'s: small change in training set can result in very different beta estimates (high variance)

[[Underfitting]]
Model fails to learn the function, weak learner. Opposite of [[Overfitting]]
**bias**: error due to overly simplistic assumptions in learning algorithm

[[Overfitting]]
Model overfits on data noise. Usually on the [[Train Test Split|training set]], resulting in the model simply memorizing on the training data but not actually generalizing, so will perform poorly on unseen data.
We can prevent this with [[Train Test Split|cross validation]].

[[Leakage]]: model uses information during training that wouldn't be available at the time of prediction. In other words, [[Train Test Split|testing data information]] is leaked into the model.

[[Exploding Gradient]]: The **exploding gradient problem** occurs when gradients become **very large** during [[Backpropagation]], causing the model’s weights to grow uncontrollably and the training to become unstable; happens due to chain rule in backpropagation

[[Vanishing Gradient]]: When gradients (used to update weights during training in [[Backpropagation]]) becomes **very small**, eventually shrinking so much that earlier layers basically stops updating

Others
==
[[Train Test Split]]
*Fundamentally*, data contains its true value and noise. We don't want our model to fit to the training data's noise, but fit to the "true value".
**Cross validation** to avoid this problem:
1. Use training set to build model
2. Determine model's performance on test set (or validation set, split from the training set)
3. Determine best model parameter

**Validation Set:** 
- Allows for hyperparameter tuning
- in general fine-tuning of models in all kinds of ways (e.g. feature selection, setting decision thresholds, model diagnostics, calibration, etc.) before final evaluation of performance with test set

[[Bootstrapping]]
Create a [[Bootstrapping|bootstrapped]] dataset by drawing *with replacement* from the original dataset
In this bootstrapped dataset, some rows from the original will show up multiple times, others not at all (the latter are the **out of bag** set)
Essentially resampling from the original data as many times as i want

[[Kernel Trick]]
Mathematically, we look for mapping $\phi$ 
$$\bm{x} \rightarrow \phi(\bm{x})$$
Where $\phi(\bm{x})$ is of a higher dimensionality than $\bm{x}$, which we can (hopefully) apply a linear classifier on
**Problem**: we do not know what mapping $\phi$ would work, and it is too expensive to try and compute every mapping function (if not impossible when the dimension is huge)
**Kernel Trick**: we use **kernel functions** (aka **kernels**) that allow us to work in higher dimensional space *without* doing the transformation 
- i.e. instead of transforming the data, we just apply a kernel function on the data that mimics the transformation

Common Kernel Functions:
$$\begin{align*}
\text{linear}&: K(\bm{x}_i, \bm{x}_j) = \bm{x^T}_i\bm{x^T}_j\\
\text{polynomial}&: K(\bm{x}_i, \bm{x}_j) = (1+\bm{x^T}_i\bm{x^T}_j)^\gamma\\
\text{gaussian}&: K(\bm{x}_i, \bm{x}_j) = e^{-i\gamma(\bm{x}_i-\bm{x}_j)^T(\bm{x}_i-\bm{x}_j)}
\end{align*}$$

**[[Synthetic Data]]** 

| Typical SATA                   | Typical DATA                                            |
| ------------------------------ | ------------------------------------------------------- |
| Easy and quick to make         | Hard and often tedious to obtain                        |
| Normally distributed / IID     | Asymmetric and heavy-tailed distributions, dependencies |
| Outliers are easily identified | Extreme values are part of the distribution             |
| Complete                       | (Systematically!) missing values are common             |
| All entries are valid          | At least some values are corrupted or flawed            |
| Additive gaussian noise        | True variability, often multiplicative                  |
| Big, high statistical power    | Often not big enough, low power                         |
| Clean & Beautiful              | “Hairy” & “Ugly”                                        |
| Just sampling error            | Sampling error and sampling bias                        |
| Comes out of a RNG             | Linked to the real world                                |
