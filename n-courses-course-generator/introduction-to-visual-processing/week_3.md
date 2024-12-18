# Week 3: Week 3: Introduction to Neural Networks

## Week 3: Introduction to Neural Networks

### Introduction

This week we delve into the fascinating world of Neural Networks, a fundamental concept in Deep Learning. We've already seen the basics of Image Processing and Python, and now we're going to apply those concepts to understand how Neural Networks work. This knowledge will be crucial in the upcoming topics where we will explore more advanced types of Neural Networks such as Convolutional Neural Networks and Generative Adversarial Networks. 

### Key Concepts

#### Neural Network Architecture

A Neural Network is a computing system inspired by the human brain. It comprises interconnected nodes or "neurons" that process information. The architecture of a Neural Network consists of three types of layers: the input layer, hidden layers, and the output layer. Each layer contains a set of neurons where each neuron in a layer is connected to all neurons of the next layer. 

#### Neurons

A neuron takes multiple inputs, applies a weighted sum to them, adds a bias, and then passes the result through an activation function. The output is then forwarded to the next layer. 

#### Activation Functions

Activation functions introduce non-linearity into the output of a neuron. This non-linearity helps the network to learn from the error, and hence the network can make better predictions. Common activation functions include Sigmoid, ReLU (Rectified Linear Unit), and Tanh.

#### Forward Propagation 

Forward Propagation is the process by which the Neural Network makes its predictions. It involves passing the input data through each layer of the network, starting from the input layer to the output layer.

#### Backpropagation 

Backpropagation is an algorithm used to train Neural Networks. It calculates the gradient of the loss function with respect to the weights of the network for a single input-output example, and does so efficiently, unlike a naive direct computation.

### Examples

Let's consider a simple example to understand Neural Networks better. Suppose we want to build a Neural Network to predict whether an email is spam or not. The input layer will take the count of specific words in an email, the hidden layers will process this information, and the output layer will give the probability of the email being spam.

### Exercises

To cement your understanding of Neural Networks, here are a few exercises:

1. Build a simple Neural Network with one hidden layer to solve a binary classification problem. Use different activation functions in the hidden layer and observe the effect on the model's performance.
2. Implement the forward propagation and backpropagation processes manually for a small Neural Network.
3. Use a Neural Network to predict the price of a house based on features like the number of rooms, location, size, etc.

Remember, the key to understanding Neural Networks lies in practical implementation. We'll be using Python and libraries like TensorFlow and Keras for the same. 

In the following weeks, we will delve into image-specific applications of Neural Networks and explore more sophisticated architectures. But for now, a solid grasp of the basics will set you up for success. Let's dive in!