---
aliases:
  - SVM
  - Margin Classifier
---
A [[Classification]] algorithm

## Basic Idea: Margin Classifiers

**Margin**: distance between **decision boundary (hyperplane)** and the *closest data points from each class*.

Margin classifiers pass a **linearly separable hyperplane** through data to classify into 2 groups such that *the margin is maximized*

### 1D Case

Suppose we have the following dataset, and we arbitrarily set a threshold between the two labels
![[margin classifier 1 (arbitrary).png|500]]

The threshold allows us to easily label new data, but clearly it's not the best (see above example)

Instead, we *maximize the margin* (i.e. the distance between the **edge observations**)
- Edge observation: datapoints at closest to the decision boundaries

![[margin classifier 2.png|500]]

Notice how we *maximize the margin* of the threshold's edge observations 
### 2D Case

![[SVM 1.png|600]]

Goal: look for a line (called the **hyperplane**, or the purple line in this 2D graph) that *cleanly separates the two classes*

Comparing line #1 (flatter line) and line #2:
- line #2 does a better job separating the two groups --> *margin is maximized*
- the distance between the points closest to the boundary is *larger* (wider gap between the dashed line and the solid line)

The orange circled points are the **Support Vectors** (I called them edge observations earlier)
- The support vectors create the hyperplanes

> [!important] Only Support Vectors Matter
> Only the support vectors' location will affect the line/hyperplane's orientation. All the other points, as long as they stay in their half, will not affect the hyperplane no matter how they move
> 
> This is in sharp contrast to [[Regression]], where the positions of *all the points* contributes to the final regression line.

## Hard Margin Classifier

TL;DR
$$\min_{\mathbf{w}, b} \quad \frac{1}{2} \|\mathbf{w}\|^2 \quad \text{subject to } y_i(\mathbf{w}^T \mathbf{x}_i + b) \geq 1$$
Hard margin classifier assumes
- Assumes perfectly separable data
- Has no tolerance for misclassification or margin violations
(which is why we don't need a loss function like hinge loss; there is no room for error)
### Finding The Optimal Hyperplane

$$\text{Hyperplane: } \bm{w^T}\bm{x} - b = y$$
$\bm{w}$ represents the weight vector.
- [[Analytic Geometry (ML)|Geometrically]], it is also the **normal** (perpendicular) vector to the hyperplane (i.e. defines the hyperplane's orientation)
- (also $\bm{w^T}\bm{x}$ is [[Linear Algebra (ML)|dot product]], obviously)

$b$ is the bias

$\bm{x}$ is the inputs or predictors

$y$ is the class membership, $\in \{-1, 1\}$

![[svm - w.png|300]]

Our goal is to **find $\bm{w}, b$ that maximizes the margin**. 

TL;DR: margin size = $\frac{2}{||\bm{w}||}$, meaning we have to try to minimize $||\bm{w}||$

Finding the formula for the margin size:
1. $y=0$ is an outcome on the hyperplane/decision boundary. We start with $\bm{x}$ on the boundary:
$$\bm{w^T}\bm{x}-b=0$$
2. find $c$, the number of [[Analytic Geometry (ML)#The Unit Vector|unit vector]] steps that it takes in the direction of $\bm{w}$ until we hit the support vector boundary (the dashed purple line in the graph above) 
$$\begin{align*}
\bm{w^T}\left(\bm{x}+c\frac{\bm{w}}{||\bm{w}||}\right) - b &= 1\\
\bm{wx}+c\frac{\bm{w}^T\bm{w}}{||\bm{w}||}-b&=1\\
\end{align*}$$
We know that $\bm{w^T}\bm{x}-b=0$ (from step 1) and $\bm{w^T}\bm{w}=||\bm{w}||^2$ (since [[Linear Algebra (ML)|linear algebra]])
$$\begin{align*}
c \cdot \frac{||\bm{w}||^2}{||\bm{w}||} &= 1\\
c\cdot ||\bm{w}||^2 &= ||\bm{w}||\\
c &= \frac{1}{||\bm{w}||}
\end{align*}$$
Since it takes $c$ steps to go from $\bm{wx}-b=0$ to $\bm{wx}-b=1$ (in the direction of $\bm{w}$), that means it takes another $c$ steps to go from $=0$ to $=-1$. Hence, the margin size is $2c$
$$\text{Margin Size} = \frac{2}{||\bm{w}||}$$
Conclusion: to maximize the margin, we have to minimize $||\bm{w}||$, such that $y_i(\bm{w^T}\bm{x}-b) \geq 1$

$$\min_{\mathbf{w}, b} \quad \frac{1}{2} \|\mathbf{w}\|^2 \quad \text{subject to } y_i(\mathbf{w}^T \mathbf{x}_i + b) \geq 1$$

> [!note] $y_i\bm{w^T}\bm{x}-b) \geq 1$, the "hard" constraint
> $y_i(\bm{w^Tx}-b) \geq 1$: constraint that *all training examples are classified* (i.e. they lie outside or on the margin)
> - $y_i$ is the class labels, so $y\in\{-1, 1\}$
> - $\bm{w^T}\bm{x}-b$ is the SVM's decision function
> 
> So if $y=1$, the SVM must also output something $\geq 1$; if $y=-1$, SVM must also output something $\leq -1$ (otherwise constraint will fail)
>
> This is a "hard" margin classifier (see soft classifier below), meaning that *every point must lie on the correct side of the margin*
## Soft Margin Classifier

### Problems with Hard Margin Classifier

Up to this, all the classifiers are considered "hard"; in other word, it will try to find a boundary that separates *all datapoints* into its *label* cleanly

Problems:
1. IRL data is not always perfectly separable (i.e. sometimes the model *has to misclassify*)
2. **Sensitive to outliers**: Maximal margin classifiers are too reliant on specifics of [[Train Test Split|training data]]

![[hard margin problem.png]]

In the example above, it predicted the new point as "green" because data had an **outlier**
- the edge observation is a point that is very close to the blue group, but is labeled as green
- as a result, the threshold is set much closer to the blue group

### Soft Margin Idea

**Soft Margin** Classifiers: allow for misclassifications in the margins
- we misclassify some data in the margin to make the model more robust
- sometimes, the model *has* to misclassify

![[margin classifier - correct.png]]

2D example:
![[soft classifier 2d.png|400]]

### Loss Function

Common classification (and especially SVM) loss function: [[Hinge Loss]]

$$L = \max(0, 1 - y_i(\bm{w}^T\bm{x}_i+b))$$
where
- $y_i$ is the true class label (-1 or 1)
- $\bm{w}^T\bm{x}_i+b$ is the predicted class score, $\hat y_i$

Hinge loss is great because it can add penalty (loss) for both:
1. incorrect classification (and it is unbounded, so the more wrong the classifier is, the more loss you incur)
2. correct classification but in the margin (i.e. not that confident in prediction)

> [!note] Intuition
> Hinge loss allows for margin classifier to be *soft* instead of *hard*. It  replaces the hard constraint $y_i(\dots) \geq 1$ with a penalty if violated.

Example:

| $y$  | $\hat{y}$ | $y\hat{y}$ | $1 - y\hat{y}$ | HL  |
|------|-----------|------------|----------------|-----|
| 1    | 1.5       | 1.5        | -0.5           | 0   |
| -1   | -1.5      | 1.5        | -0.5           | 0   |
| 1    | 0.5       | 0.5        | 0.5            | 0.5 |
| 1    | -0.5      | -0.5       | 1.5            | 1.5 |
| -1   | -0.7      | 0.7        | 0.3            | 0.3 |
Notice how when $\hat y$ is 0.5 and $y=1$, the prediction is correct but there still is some hinge loss
### Implementation

Data no longer needs to be linearly separable. We allow and try to minimize some **slack** $\xi$
$$\min\sum_{i=1}^n\xi_i\ \text{ s.t. }  y_i(\bm{w}^T\bm{x}_i+b) \geq 1-\xi_i$$
Constraint: $y_i(\bm{w}^T\bm{x}_i+b) \geq 1-\xi_i$
- left half is the same as $y\hat y$ (see [[Hinge Loss]])
- right half $1-\xi_i$ is 1 - slack

The loss function via [[Hinge Loss]] is:
$$\xi_i = \max(0, 1-y_i(\bm{w}^T\bm{x}_i+b))$$
Soft Margin SVM amounts to minimizing the loss function below:
$$\min_{\bm{w}, b} \quad \lambda \|\bm{w}\|^2 + \frac{1}{n}\sum_{i=1}^n\max(0, 1-y_i(\bm{w}^T\bm{x}_i+b))$$

## SVM Kernel

If a dataset is not linearly separable, we can transform this space into a higher dimensional space by creating synthetic features, and hope that in the higher dimensional space the data is linearly separable.

See [[Kernel Trick]]

SVM Kernel intuition:
![[svm kernel trick intuition.png]]

### SVM Kernalized Version

To apply the kernel trick, we switch to the dual form of the SVM problem. In the dual, everything is expressed in terms of dot products between data points, like $\mathbf{x}_i^T \mathbf{x}_j$

Dual problem (linear SVM):

$$\max_{\alpha} \sum_{i=1}^{n} \alpha_i - \frac{1}{2} \sum_{i,j=1}^{n} \alpha_i \alpha_j y_i y_j \mathbf{x}_i^T \mathbf{x}j \quad
\text{subject to } \quad\sum{i=1}^{n} \alpha_i y_i = 0, \quad \alpha_i \geq 0$$
Apply kernel trick/kernalized version:
We replace all dot products $\mathbf{x}_i^T \mathbf{x}_j$ with a **kernel function** $K(\mathbf{x}_i, \mathbf{x}_j)$:
$$\max_{\alpha} \sum_{i=1}^{n} \alpha_i - \frac{1}{2} \sum_{i,j=1}^{n} \alpha_i \alpha_j y_i y_j K(\mathbf{x}_i, \mathbf{x}_j)$$

## High Level View of SVM

![[svm slide deck 15.png]]

## SVM Assessment

- Intuitive: the idea is just maximizing the margin
- Versatile (via the kernel trick) so it is commonly used
- Divides space into clearly defined regions (so it is simple and very interpretable)
- Robust classification that is generally not prone to overfitting (cuz soft classifier)
- Fast and Efficient (scales particularly well for highly dimensional data)
# Latex Commands
$\newcommand{\bm}{\mathbf}$
