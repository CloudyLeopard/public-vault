Seeing that this is an example that we keep coming back to, I thought it fitting to create a note that refers to all the different types of matrix multiplication I have.

## Matrix in C

The method of storing 2D array (or nd-array) in memory is **language dependent**.

C stores it as follow:
$$
\begin{pmatrix}
0 & 1 & 2 & 3 \\
4 & 5 & 6 & 7 \\
8 & 9 & 10 & 11
\end{pmatrix}
$$
becomes
$$0\ 1\ 2\ 3\ 4\ 5\ 6\ 7\ 8\ 9\ 10\ 11$$

So, we can access the element at row $i$ and column $j$ by doing:
$$A[i*n+j]$$
where $n$ is the number of elements in a row
## Matrix Vector Multiplication
### The Task

$A=(a_{ij}) \text{ is an } m\times n \text{ matrix}$
$\rightarrow \mathbf{x} \text{ is a vector with } n \text{ components}$
$\rightarrow \mathbf{y} = A\mathbf{x} \text{ is a vector with } m \text{ components}$
$\rightarrow y_i = a_{i0}x_0+a_{i1}x_1+a_{i2}x_2+\dots + a_{i,n-1}x_{n-1}$
where $y_i$$ is the $i$-th component of $\mathbf{y}$, and $a_{i, n-1}x_{n-1}$ is the dot product of the $i$-th row of $A$ with $\textbf{x}$

![[matrix vector mult 2.png]]

### Sequential Code

```C
/* For each row of A */
for (i = 0; i < m; i++) {
    /* Form dot product of ith row with x */
    y[i] = 0.0;
    for (j = 0; j < n; j++)
        y[i] += A[i][j] * x[j];
}
/* Pseudo-code Serial Version */
```

### MPI Version

![[MPI Example Programs#Example 5 Matrix Vector Multiplication|MPI Matrix Vector Multiplication]]

### OpenMP Version

The sequential code is *very* parallelizable (literally for loop)

See [[Causes of Poor Performance (OpenMP)#Example Matrix vector multiplication]]


## Matrix Multiplication

GPU/CUDA Version: [[Matrix Multiplication (CUDA)]]