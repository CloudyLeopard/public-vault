---
aliases:
  - Boosting
  - AdaBoost
---
An ensemble trees strategy: 
1. Start with a [[Decision Tree]] that is deliberately as simple as possible (e.g. stump)
	- This single tree *will be wrong due to [[Bias]]*
2. We correct the *errors* (refers to [[Train Test Split|validation or test set]]) that this tree makes by adding another simple ([[Underfitting|underfit]]) tree *sequentially*, until model error drops to an acceptable level
	- essentially train new tree on the error

Boosting progressively reduces bias, while keeping variance low
- Because every single tree is still simple, we keep error low

Unlike [[Tree Bagging]], here not all trees are created equally (have equal weights)

## AdaBoost

> [!info] Analogy: Studying Flash Cards
> AdaBoosting building process is like studying flash cards: only studying the words you got wrong on. Here, you only upweigh the data/cases you got wrong on.

At first, every datapoint has the same weight

**Creating the first stump**
Step 1: Create the first stump by picking the variable that minimizes [[Gini Index|Gini]]
Step 2: Classify using only this stump (with modal voting)
Step 3: Calculate this stump's **error** and **voting power**
- **error** = sum of weights of incorrect classified cases
- Use error to determine **voting power** (importance) of the stump:
$$\text{Voting Power} = \alpha = \frac{1}{2}\ln\left(\frac{1-error}{error}\right)$$
Step 4: Update data weights for next stump
$$\text{New Weight for incorrect cases} = \text{weight} \times e^\alpha$$
$$\text{New Weight for correct cases} = \text{weight} \times e^{-\alpha}$$
> [!Example]- AdaBoost First Stump Example
> ![[adaboost first step example.png]]


**Creating the next stump(s)**
Step 1: create a new, [[Bootstrapping|bootstrapped]] dataset
- same number of rows as original dataset, but drawing with replacement from a [[Discrete Uniform Distribution|uniform distribution]] (i.e. randomly w the normalized weights)
- Probability of drawing a given row is given by the *normalized weight* --> previous misclassified cases have a higher chance of being drawn
Step 2: Determine [[Gini Index|Gini indices]] for remaining possible variables using the new bootstrapped dataset
Step 3: Pick variable associated with lowest Gini index
- This split will have the best classification on a sample that has way more data that was previously misclassified
- Result: this new tree/stump is literally learning on previous stump's mistake
Step 4: repeat process until all cases classified or a reach a pre-determined number of stumps (to avoid [[Overfitting]]; number of stumps is a hyperparameter)
Step 5: Classify test cases with entire ensemble of stumps, where each stump vote is scaled by its **voting power** (majority wins)

## Gradient Boosting

High Level Overview:
- make simple initial guess with learner that is definitely weak and underfits (predicting something like the mean/modal outcome)
- will have lots of error (residuals) at first: difference between predictions and actual outcomes from loss function
- take gradient of loss function and add an (appropriately scaled, $LR$) step in the negative direction of the gradient to the prediction
- repeat process by sequentially adding new trees (weak learners) until convergence (residuals drop below some acceptable threshold)

In gradient boosting, each tree starts with the simplest possible model: a single leaf (not a stump)

Leaf represents the predicted classification for every individual
- Example: natural log of [[Odds]]
- $F(x) = \ln(\text{Odds}) = \ln\left(\frac{p(x)}{1-p(x)}\right)$

Then, need to convert this value into a probability. We can use the [[Logistic Function]]
$$\hat{p}(x) = \frac{e^{F(x)}}{1 + e^{F(x)}}$$

We use this model to do an *initial guess*. Most likely, model will predict everyone is $y=0$ or something (basically very [[Underfitting|underfit]])

We then build a regular [[Decision Tree]] using *all features* to predict **residuals**

![[ensemble slide 21.png|500]]
- Decision tree split based on features
- Leaf nodes contain **residuals**, or differences between actual label and predicted probability (i.e. $y_i - \hat p_i$)
- Blue numbers are the aggregated residual-based values
$$\text{Leaf value} = \frac{\sum_i \text{residual}_i}{\sum_i \hat{p}_i (1 - \hat{p}_i)}$$
Where $\hat p_i$ is the last guess probability of case $i$.

Updating the tree:
For each case in the training data,
1. First we need original log-odds from previous round, new prediction from the tree, and a learning rate (something small)
2. Update guessed probability of a case being some class by:
$$\log(\text{odds})_{\text{new}} = \log(\text{odds})_{\text{old}}+LR\times\text{Tree prediction}$$
3. Convert log odds into probability (like in above) with (for example) logistic function

Example after first update
![[gradient boost example table.png|500]]
- in our second pass, notice how model now changed its guess for one case

Now, build a new tree, predicting the new residuals (mutatis mutandis) 
- (basically do what we just did above all over again
- *find new residuals, compute new probability guess, repeat*
- keep going until residuals fall below some threshold

