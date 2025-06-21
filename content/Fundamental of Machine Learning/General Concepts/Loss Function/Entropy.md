Entropy is a measure of surprise
$$H(X) = -\sum_xp(x)\log p(x)$$
where
- $p(x)$ = probability of some outcome
- $\log p(x)$ = log sums

Since events are [[Independence|independent]], we can multiply to combine them and quantify how information is accumulating
- We use logs so that we can add them instead of multiplying them (multiply is costly and loses floating point precision)

Also see [[Probability (ML)#Shannon Entropy|Shannon Entropy]]