Used in ImageNet, AlexNet
Introduced earlier by Yann LeCun

A type of [[Artificial Neural Network]]
## Convolution

In a CNN, **convolution** is the process of sliding a small matrix (called a **filter** or **kernel**) over the input (e.g., an image) and computing a **dot product** at each location. This produces a new matrix called a **feature map**.

### 1D Example

Kernel Filter: moving average (basically $<1, 1>$)

![[convolution in CNN 1D.png]]

### 2D Example

Essentially doing matrix multiplication between the input (image values) with the kernel
- the kernel is moved across the image

![[kernel_filter.gif]]

## Kernel Filter

Symmetric and evenly weighed kernel --> used for blurring

With different kernel shapes, convolution can detect patterns in the input

The kernels are **also learned**.

> [!info] Interesting Similarity to Receptive Fields
> Surprisingly, the kernels learned for image recognition looks really similar to receptive fields in your neurons. What we find in your brain is likely the optimized kernel

## Example: CNN to distinguish 0s and 1s

In [[Artificial Neural Network#Results]], we mentioned a few problems with neural network. Specifically
- hidden layer activations are hard to interpret
- does not take advantage of neighboring affects

CNN solves this by taking advantage of local correlations in neighboring pixels

**A Minimally Viable ConvNet**
![[minimally viable ConvNet.png]]

### CNN Layer
CNN layers take advantage of local correlations in neighboring pixels. **Allows to detect patterns that look like the kernel** -- the hidden layer activation becomes meaningful

**Convolved image**: image after convolving a filter through
- Observe that the convolved image looks a lot more like the kernel!

**Feature map**: the convolved image after applying the filter/kernel [[Bias]]

We can then put the feature maps through reLU (activation function)
### Pooling Layer

**Pooling layer** reduces the size of the input **feature map** (reduce spatial dimension but retain most important information)

The result then could also become clearly linearly separable

![[pooling layer example.png]]

(note: this step is optional)
