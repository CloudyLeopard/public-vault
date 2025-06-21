---
aliases:
  - R^2
  - r^2
---
$R^2$ is the **Coefficient of Determination**, can be interpreted as how much of the outcomes' variance is **explained** or **accounted for** by the model.

It is given by the squared [[Pearson Correlation Coefficient|correlation]] between predictions and actual outcomes
$$COD = r(\hat y, y)^2$$

$R^2$ ranges from (0, 1)
- 0 = model's features are not predictive
- 1 = model's features predict outcomes perfectly

**Negative COD** is possible, meaning that the model is systematically guessing worse than the mean outcomes (i.e. its worse then just predicting the mean all the time)

> [!info] Difference between [[Pearson Correlation Coefficient]] and R-Squared
> R-Squared measures proportion of variance in $Y$ explained by $X$
> r measures strength and direction of linear relationship
