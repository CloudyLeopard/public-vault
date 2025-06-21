Early attempt at [[Artificial Neural Network]]

| **Biological Neuron**  | **Perceptron (Artificial Neuron)**              | **Description**                                             |
| ---------------------- | ----------------------------------------------- | ----------------------------------------------------------- |
| Dendrites              | Input Features $x_1, x_2, …, x_n$               | Receive input signals from other neurons                    |
| Synapse (connection)   | Weights $w_1, w_2, …, w_n$                      | Strength of connection to each input — learnable parameters |
| Cell Body (Soma)       | Weighted Sum $z = \sum w_i x_i + b$             | Integrates incoming signals                                 |
| Threshold / Activation | Activation Function (e.g., step, sigmoid, ReLU) | Decides if the neuron “fires” (produces an output)          |
| Axon                   | Output of the neuron $\hat{y}$                  | Transmits signal to other neurons or final output           |
| Bias term              | [[Bias]] $b$                                    | Like a resting potential — shifts the activation threshold  |

![[perceptron function.png]]

Perceptron can implement basic logical function, like
- AND
- OR
But it cannot do XOR (exclusive OR)
- big problem because XOR is used often
- This problem took 10 years for people to get over

Expect Perceptron to perform well on linear classification; but terrible at nonlinear ones