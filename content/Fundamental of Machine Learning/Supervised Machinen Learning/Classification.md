In classification, we abstract from the variability within a class and treat all members of a class as equivalent (unlike [[Regression]])

Given the known outcomes (class labels), can we find a criterion that maximizes the separation between the classes, to maximize reliability?

Classification Algorithms:
- [[Logistic Regression]]
- [[Support Vector Machine]]
- [[Decision Tree]]
	- [[Tree Bagging]]
	- [[Tree Boosting]]

![[regression vs classification.png]]

## Blessing of Dimensionality

The more features the better usually --> more dimensions to be able to accurately split the data

Example: color vision (more photoreceptors = better)
## Measuring Classification Quality

> [!info]- Screenshot From Slides
> ![[Measuring Classification Models.png]]

The outcomes for a classification model can be summarized by the **[[Confusion Matrix]]**

|                                 | **Actually Positive (AP) (1)**                                  | **Actually Negative (AN) (0)**                           |
| ------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------- |
| **Predicted Positive (PP) (1)** | True Positives (TP)<br>*Correct*                                | False Positives (FP)<br>*Miss, Type II or $\beta$ Error* |
| **Predicted Negative (PN) (0)** | False Negatives (FN)<br>*False Alarm, Type I or $\alpha$ error* | True Negatives (TP)<br>*Correct*                         |

From this, we can calculate a whole bunch of metrics to quantify classification model quality

> [!important] **Accuracy** is not enough
> Accuracy = proportion of objects in the test set that is correctly classified
> 
> Example: suppose you work in TSA, and a vendor boasts a "threat detection" algorithm with a 99% accuracy at detecting hidden guns and bombs... if it just always predicts that *no one has a bomb*, it's bound to hit that 99% accuracy because in truth, most people don't have bombs
> That's a problem though: we are predicting for the 1% chance

**Prevalence**: proportion of *all* positive cases
- When prevalence is high or low ==> class imbalance
$$\text{Prevalence} = \frac{AP}{AP + AN}$$
**Sensitivity** or **Recall** or **True Positive Rate**: how well model identifies positive cases out of all *actual positive cases* (AP). 
- Ability of model to detect that a signal is really prsent
$$\text{Recall} = \frac{TP}{AP} = \frac{TP}{TP + FN}$$
**Specificity** or **Selectivity** or **True Negative Rate**: how well model identifies negative cases out of all *actual negative cases*
- Ability of model to not hallucinate that a signal is present, when it is not
$$\text{Specificity} = \frac{TN}{AN} = \frac{TN}{TN+FP}$$
**Precision**: how many of the *predicted positive cases* were actually positive
- Fraction of prediction that came true
$$\text{Precision} = \frac{TP}{PP} = \frac{TP}{TP+FP}$$
> [!info] Failure of Precision
> If you keep predicting that something is going to happen, you could probably get really high recall because there is not a lot of actual positive cases. Example: every year I predict that the WW3 is going to happen, then when it does *bam i told you so*
>
> But you'd have a really low precision, meaning really your prediction sucks because most of your predictions were wrong.

**Negative Predicted Value**: how many of the *predicted negative cases* were actually negative (not used frequently because if you have the others, this is implied)
$$\text{NPV} = \frac{TN}{PN} = \frac{TN}{TN+FN}$$
### Metrics that Combined The Above

**F1 score**: Harmonic mean of precision and recall
$$\text{F1 score} = 2 * \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$$
**Matthews Correlation Coefficient** or **MCC**
$$\text{MCC} = \frac{(TP \times TN) - (FP \times FN)}{\sqrt{(TP + FP)(TP + FN)(TN + FP)(TN + FN)}}$$
> [!notes] MCC Intuition
> Prof. Wallisch thinks MCC is underrated, because it uses ALL of the numbers in a confusion matrix (F1 score does not use TN)
>
> The numerator is like the "product of goodness" - "product of badness"
> The denominator is all the calls you've made, normalized

### ROC Curve

**Receiver Operating Characteristic (ROC) Curve**

> [!note] Name Origin
>  "Receiver Operating" came from Radar Receiving Operators

Plots the **sensitivity** (true positive rate) as a function of the **false positive rate**
- x-axis = false positive rate = 1 - specificity; false alarms
- y-axis = true positive rate or sensitivity (recall); correct positives

ROC curve captures classification accuracy of an algorithm for the entire range of different criteria (**threshold**)

> [!error] incomplete: graph animation

#### AUC-ROC
or AUC, AUROC

**Area Under ROC (AUROC)**: the area under the ROC. Ranges from 0 to 1
- 1 = perfect
- 0.5 = random
- <0.5 = worse than random

> [!important] AUC score *does not change* w.r.t. the threshold

The AUROC can be used to compare a wide range of ML algorithms

![[AUC compare.png|400]]

### PR Curve

Plots the **fraction of positive predictions that are true**
- x-axis = recall
- y-axis = precision

> [!info] PR Curve vs ROC curve: Class Imbalance
> AURPC and AUROC is highly correlated when class is balanced. The reason we want to use AUPRC is for when there is class imbalance:
> - ROC plots the two rows in the confusion matrix (TPR vs FPR)
> - PR Curve contrasts TPR (recall) with Positive Predictive Value, or the fraction of positive predictions that are true
>
> This makes PR curve better when **classes are imbalanced** (prevalence is high or low)
> - Low prevalence --> false positive is more likely

> [!error] incomplete: add in animation stuff
#### AUPRC

Similar to AUROC, **AUPRC** = Area under the PRC.
### When to Use What Metric?

**MCC**, **PR Curve** is more robust for imbalanced dataset (prevalence is high or low)