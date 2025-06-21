
**Leakage**: model uses information during training that wouldn't be available at the time of prediction. In other words, [[Train Test Split|testing data information]] is leaked into the model.

Need to make sure that training set and test set are **independent**.

Leakage overestimates the performance of the model - makes sense because you are literally using testing data information to predict on testing data.