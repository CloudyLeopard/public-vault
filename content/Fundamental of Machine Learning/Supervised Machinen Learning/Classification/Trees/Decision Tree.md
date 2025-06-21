A [[Classification]] algorithm

## Using Trees for Classification

1. Blessing of Dimensionality
While [[Support Vector Machine|SVM]] separates space into 2 continuous regions, trees allows you to invoke [[Classification#Blessing of Dimensionality|the blessing of dimensionality]] much easier (with much more flexibility)

Tree allow for accurate classification of *highly complex, linearly non-separable datasets*.
- Example: your health may be determined by hundreds of features, and trees allow you to do that by invoking the blessing of dimensionality

2. Intuitive
Basically if statements over and over again

## Terminology

![[decision tree terms.png|500]]

Components of a tree
- **Root**
- **Leaves**: final outcome/prediction
- **Nodes**: intermediate questions for making decision

Types of tree
- **Stump**: a simple tree with just a root and leaves (no intermediate nodes)
	- used frequently in ada-boosting

## Growing The Tree

Obviously, using a single feature (or a few) to split the data will not work --> the tree will be "impure"

**Leaf Impurity**: measures how "mixed" the data is in a leaf node
- if all the data in a leaf belongs to the same class, it is **pure** (this is good)
- if the leaf contains a mix of classes (e.g. some yes, some no), it is **impure** (this is bad)

There are a couple ways to grow a tree:
- Gini Index
- Entropy
### Gini Index

We use [[Gini Index]] to determine the node that makes the best split (i.e. the node that, once the data goes through, splits the data into leaves with the lowest leaf impurity)

General idea: Tree **splits** are determined by maximizing leaf purity (or minimizing leaf impurity)
- we want to put the *best classifier* at the root. In other words, *put the node with the lowest gini index at the root*

> [!info]- Decision Tree w/ Gini Index Example
> Notice that nodes higher up has a higher gini index. In other words, earlier nodes do a better job at splitting (as it should).
> ![[gini index example.png]]


Step by Step method to grow the tree:

1. Start with the full dataset (root node).
2. For each feature, evaluate all possible splits:
	- If it’s numerical, sort numeric data in increasing order, then try different splits by thresholds (e.g., $x \leq 5$, $x \leq 10$, etc.).
	- If it’s categorical, try splitting based on category values.
3. For each possible split:
	- Split the data into two child nodes (left and right).
	- Calculate the Gini index for each child node:
$$GI_{\text{node}} = 1 - \sum p_i^2$$
	- Calculate the weighted Gini for the split (called Gini impurity of the split):
	
$$GI_{\text{split}} = \frac{n_{\text{left}}}{n_{\text{total}}} \cdot GI_{\text{left}} + \frac{n_{\text{right}}}{n_{\text{total}}} \cdot GI_{\text{right}}$$
4. Choose the split with the lowest Gini impurity.
5. Make the split on the feature and threshold that gave the best Gini index.
6. Repeat steps 2–5 recursively on each child node until:
	- Nodes are pure (Gini = 0), or
	- A stopping condition is met (e.g., max depth, min samples, or Gini reduction below a threshold)
		- Apply **modal** voting to resolve remaining impure leaves

### Entropy

We can also use [[Entropy]] to grow the tree

The idea is to *maximize information gain* from split
- maximally reducing disorder by splitting the data

### Gini Index vs Entropy

Compared to Gini Index, Entropy tends to penalize mixed nodes more strongly due to its logarithmic scale

> [!info]- Gini Index vs Entropy Calculation
> ![[gini index and entropy - calculating node impurity.png]]

Generally speaking, there's *no difference between using Gini Index and Entropy* to grow a Decision Tree
- Entropy is typically twice that of Gini Index
- Since we're just trying to find which splits reduces disorder the most, doesn't really matter of entropy is scaled twice. just need to find max info gain
![[Gini vs Entropy.png|500]]

## Tree Pruning

In real datasets, decision trees often [[Overfitting|overfit]] to the training set.
- Tree "memorizes" [[Train Test Split|training set]], and does not actually *learn* from it
- especially problematic if each leaf only has a few data in them (or even just 1)

Solution: **pruning**
- essentially setting a threshold (a hyperparameter)
- Only consider leaves if they have a minimum number of cases
- This simplifies trees and makes them more robust at the same time

## Tree Assessment

Same as any [[Classification#Measuring Classification Quality|classification algorithm evaluation method]], use ROC or PR

## Tree Regression

Decision trees can also be used to make numerical predictions ([[Regression]])!

Basically just use range of numbers

## Decision Tree Assessment

Pro
- Intuitive: basically just a bunch of if-else statements
- Highly interpretable: again, just a bunch of if-else statement (and we can see the splits)
- Handles complex, non-linearly separable categorical data well

> [!info] Tree handles categorical data natively
> Usually if you have categorical data (like education: high school, college, graduate, PhD...), you have to **one-hot encode** them into dummy variables for any other model
>
> With trees, you don't have to do anything -> tree handles categorical data natively.

Con
- Strong tendency to [[Overfitting|overfit]]
- Individual trees tend to be **weak learners**

> [!info] Weak Learner
> A weak learner cannot reduce error on test set. No matter how you grow the tree it will either always under fit or overfit, because it will always just memorize and never learn

**Strong learners** get the model error below some threshold $\epsilon$ with a probability higher than $1-\delta$
- If a model *physically* cannot do that, it is a weak learner
- Solution: **ensembles** or collection of weak learners

## Ensemble

If every individual tree is fundamentally flawed in known ways (weak learner), what if we aggregated them into ensembles, to minimize errors

Two methods to create ensembles:
- [[Tree Bagging|Bagging]]
- [[Tree Boosting|Boosting]]