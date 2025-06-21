The **Pearson correlation coefficient** measures how strongly two variables are linearly related (strength and direction of linear relationships). It is defined as:

Otherwise known as $r$

$$r =\frac{\sum\left(x_{i}-\bar{x}\right)\left(y_{i}-\bar{y}\right)}{\sqrt{\sum\left(x_{i}-\bar{x}\right)^{2} \sum\left(y_{i}-\bar{y}\right)^{2}}} = \frac{Cov(X, Y)}{\sigma_X, \sigma_Y}$$
- $x_i, y_i$ are the individual sample points
- $\bar{x}, \bar{y}$ are the sample means

| **Value of r** | **Interpretation**                  |
| -------------- | ----------------------------------- |
| 1.0            | Perfect positive linear correlation |
| 0              | No linear correlation               |
| -1.0           | Perfect negative linear correlation |
Notes:
- Only captures linear relationships
- Sensitive to outliers
- Pearson correlation is scale (multiply by constant) and shift (adding a constant) invariant
- Independent of distance metric
