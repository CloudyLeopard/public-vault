
We keep coming back to this email, so might as well keep a centralized notes here

## The Trapezoidal Rule
Riemann integration
![[trapezoidal rule.png]]

The more trapezoids you have under the curve, the more process the solution will be. 

Area of one trapezoid: $\frac{h}{2}(f(x_i) + f(x_{i+1}))$
As the difference between $x_i$ and $x_{i+1}$ gets smaller it gets more precise (this basic calc lol just a quick review)

We can get `h` by doing `b-a` divide by the number of trapzoids

![[trapezoidal rule equations.png]]

## Serial Program Pseudo Code

Pseudo code for a serial program
```
Input: a, b, n
h = (b-a)/n
approx = (f(a) + f(b)) / 2.0
for (i = 1; i <= n-1; i++) {
	x_i = ...
	...
}
```

## Parallel Version

MPI Version: [[MPI Example Programs#Example 2 Trapezoidal Rule Program]]

OpenMP Version: [[OpenMP#Part 2 Following The Trapezoidal Rule Example]]


