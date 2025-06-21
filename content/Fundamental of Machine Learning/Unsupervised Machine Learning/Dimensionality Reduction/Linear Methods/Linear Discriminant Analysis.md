---
aliases:
  - LDA
---
A [[Unsupervised Machine Learning#Dimensionality Reduction|Dimensionality Reduction method]]

LDA projects onto a dimension that
- maximizes distance between projected class means
- minimizes variance within projected class

> “Two samples belonging to different classes should have a maximum distance between them, while two samples belonging to the same class should have a minimum distance between them.”

Requirements:
- needs class labels
- assumes [[Normal Distribution|Gaussian Distribution]] of data within class

basically finds new axes to project data along to that tries to make classes as linearly separable as possible (and minimize within-class variance)

> [!warning] incomplete
