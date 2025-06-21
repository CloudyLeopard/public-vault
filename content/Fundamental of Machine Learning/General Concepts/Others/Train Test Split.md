---
aliases:
  - training set
  - test set
  - cross validation
---
Split data into **training set** and **test set**.

If we use the same (training, or all) data to estimate coefficients/parameters and determine model performance, we are likely to [[Overfitting|overfit]] to the data's sample and noise.

> [!info] Data = Noise + True Value
> *Fundamentally*, data contains its true value and noise.
> We don't want our model to fit to the training data's noise, but fit to the "true value".
> Overfitting happens when we fit to the data's noise.

**Cross validation** to avoid this problem:
1. Use training set to build model
2. Determine model's performance on test set (or validation set, split from the training set)
3. Determine best model parameter

Cross validation is good for dealing with [[Overfitting]]
- Example: try out different degrees in [[Polynomial Regression]], calculate [[Root Mean Squared Error|RMSE]] on validation set and pick the degree that minimizes error

Always be careful of [[Leakage]]

**Validation Set:** 
- Allows for hyperparameter tuning
- in general fine-tuning of models in all kinds of ways (e.g. feature selection, setting decision thresholds, model diagnostics, calibration, etc.) before final evaluation of performance with test set


## Ways to Split Dataset