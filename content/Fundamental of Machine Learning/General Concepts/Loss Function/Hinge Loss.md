Common loss function used for [[Classification]] algorithms

Main idea of hinge loss: model incurs penalty if its prediction is wrong, *and* if the prediction is not confident enough (even if it is technically correct)

$$L(\bm{x}, y_i) = \max(0, 1 - y_i\hat y)$$
Where
- $\bm{x}$ is the input feature vector
- $y\in\{-1, 1\}$ is the class (true) label
- $\hat y = f(\bm{x})$ is the output of the model/decision function

Note: Hinge Loss is *not discrete (0 or 1)*!

![[hinge loss pic.png|500]]

Notes
- $y\hat y$ is the *hinge*
- When correctly classified, loss = 0 (no extra credit for being right, mathematically it's because of the $\max(0, \ldots)$)
- When correctly classified but not confident (e.g. in [[Support Vector Machine|SVM]], the prediction is "in the margin"), there is *some hinge loss*
- When incorrect classified, there is *hinge loss*. it is not bounded because you can be extremely wrong



