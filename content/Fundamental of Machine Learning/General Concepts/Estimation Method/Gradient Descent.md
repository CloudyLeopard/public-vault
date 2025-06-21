Iterative optimization.
1. Determine loss function (which yields format of gradient)
2. Initialize parameters with arbitrary (usually random) values
3. Compute gradient using these parameter values
4. Take a **step** in the direction of the gradient (add or subtract gradient value from/to the respective parameter), scaled by the **learning rate**
5. repeat from step 3, until step size is under some threshold, and terminate

Note: gradient descent works from an arbitrary starting point and a range of learning rates.

> [!info] Tuning Learning Rate
> If learning rate is too low, it may take too long to reach optimal point. However, if learning rate is too high, we might just jump around wildly and not converge on the optimal point.
> ![[learning rate comparisons.png]]

Examples:
- [[Linear Regression#Deriving the Optimal Solution with Gradient Descent|Gradient Descent in Linear Regression]]
- [[Artificial Neural Network#Learning|Neural Network Learning]]

