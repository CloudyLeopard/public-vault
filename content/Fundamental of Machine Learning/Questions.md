# Final Review

Ofc review everything but the below are stuff i *definitely* need to revie won

[[Regularized Regression]]

In [[Support Vector Machine#Finding The Optimal Hyperplane|SVM]], $w$ is the *normal vector to the hyperplane*. how does that work again mathematically?

[[Linear Discriminant Analysis|LDA]]
[[UMAP]]

# Office Hours
## 04/10/2025

**General Questions**
Q: When is normalization needed? (i.e. I assume for different algorithms, the need for normalization is different, like Decision Tree its not needed?)

zodiac sign: multiple regression --> dummy variable
multiclass, dt, natively handle label

age: ordinal value (ordered category). dont normalize those

every number has three properties: nominality, ordinality, cardinality. onnly if the number has cardinality does normalization make sense

Q: How to perform feature selection (not extraction) for classification problem? How big of a problem is multicollinearity for neural network?
- Follow up: how does L1 and L2 work for things like neural network? For instance, i noticed that in the optimizer there is a `weight_decay` parameter which we fed in `lambda_l2`

there is regularization in NN, and that comes from dropout. but honestly if he didnt explain yet, dw abt it
unsupervised learning - with NN too.

classification or clustering: need to dimension reduction (PCA or LDA)


Q: Perceptron is good at linear classification (i think back to the basic logical function thing - it can basically draw lines). But then, what does a fully connected feedforward network add to a Perceptron? Since both cannot do nonlinear stuff (suppose no activation function)

brings nothing. without activation function it doesnt help.

**HW 4 Questions**
For myself:
- What are the different parameters that `sklean.linear_model.Perceptron` take?

NN: what is the output dimension for binary classification? Is it "two" classes? or is it 1 output neuron, and we use like sigmoid or relu or something to make it 0 and 1

Q: Is multicollinearity an important factor to consider for neural network?

for NN, it just deals with it anyway because its big. but you do not know how it handles it.

Q: is normalization necessary for a dataset like Diabetes, where almost all of the data is either binary (0, 1) or categorical?
- My observation is that normalization is needed for Perceptron (why?)
- What about for NN?
- but then for things like decision tree its not necessary right?

**Other Random Q**
How often do people come to office hours?
whats the normal process lol

he doesnt use NN that often because hes doinfg science - he has to understand the result

## 04/11/2025

**HW 4 Questions**

Q: CNN how does the dimension work or play into each other?
- How to determine how to flatten? (i.e. the `x.view` step)