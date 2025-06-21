One of the [[Essential Mathematics]] in Machine Learning. For a more detailed review on probability, see my notes from [[NYU/2024 Fall/Probability & Statistics/README||Probability & Statistics]]

## Sample Space

**Sample Space**: $\Omega$, the **set** of all possible **outcomes** of an **experiment**
**Event**: One particular **outcome**, a **subset** of the sample space

## Probability Space

> [!danger] Incomplete

## Random Variables

See [[Random Variables]]

A random variable is a function that maps outcomes from the sample space to real numbers. They can be discrete or continuous, depending on the real numbers it maps to and are characterized by [[Moment Generating Function|moments]].

Random variables are often denoted by capital italic letters: $X$.
Random variables have a probability distribution (but they are not themselves the probability distribution)
The specific value of the random value depends on the outcome/state of the underlying random process at any given time (hence the name)

## Probability Distributions

They are fully characterized by a few parameters with a clear interpretation, called **moments**.

Note: there are lots of different distributions... here's a list of some I've encountered before: [[NYU/2024 Fall/Probability & Statistics/README||Probability & Statistics]]

### What is Moment

See [[Moment Generating Function]]

> [!danger] Incomplete

## Probability Derivatives

Probability conceptualizes and quantifies certainty about some (set of) outcome(s) of interest as a fraction of all possible outcomes.

Once established, many derivative measures can be defined
- Example: [[Odds]]
$$\text{Odds}:\ \frac{p}{1-p}, \text{Likelihood}:\ L(\theta|x) = p(x|\theta)$$
*Given the data, what are the parameters?*
$$\text{Log-odds}:\ \log\left(\frac{p}{1-p}\right), \text{Likelihood}:\ \log L(\theta|x)$$

> [!note] On "Log"
> We *always* use $\log$ in ML. It is easier to compute! This is because in probability, we have to multiply things together - which is an expensive function. It is much faster to add logs instead. Additionally, multiplying may also create rounding errors.

## Shannon Entropy

The discrete case of Shannon Entropy:
$$H(X) = -\sum p(x)\log p(x)$$
- $H$: Shannon entropy
- $X$: Random variable
- $p(x)$: Probability of some outcome
- $\sum$: Summing over all outcomes
- $-\log p(x)$: Surprise of one outcome

Notes on Shannon Entropy:
- It is always non-negative
- Base of the log determines unit (base 2 -> bits)
- High entropy = more average uncertainty
- Low entropy = less average uncertainty
- It is the expected value of *surprise*: $H(X) = \mathbb{E}[-\log p(x)]$
- The log directly comes from probability theory
	- Assuming [[Independence]], $p(AB) = p(A)p(B)$
	- Log allows us to instead do: $p(AB) = p(A)+p(B)$
	- This allows us to represent information accumulation


Example:
![[shannon entropy.png]]