# DDIM sampler

Denoising diffusion probabilistic sampler is a type of sampler that can be used to sample from a distribution. It is based on the denoising diffusion probabilistic model (DDPM) introduced in [DDPM](https://arxiv.org/abs/2006.11239). The DDIM sampler is a generalization of the DDPM sampler that can be used to sample from any distribution that can be represented as a neural network. The DDIM sampler is based on the DDIM model introduced in [DDIM](https://arxiv.org/abs/2102.09688). The DDIM sampler is a generalization of the DDIM model that can be used to sample from any distribution that can be represented as a neural network.

# Getting started

## Installation

To install the latest version of the DDIM sampler, run the following command:

`bash pip install ddimsampler `

this code in conda environment looks like this:

`bash conda install -c conda-forge ddimsampler `

To run the DDIM sampler, you need to install the following dependencies:

```yaml
name: my_env
channels:
  - pytorch
  - conda-forge
dependencies:
  - python=3.8
  - pytorch>=1.7.0
  - pytorch-lightning>=1.2.0
  - pytorch-metrics>=0.3.0
  - pytorch-distributions>=0.4.0
  - pytorch-geometric>=1.6.3
  - pytorch-geometric-temporal>=1.2.0
  - pytorch-lightning-bolts>=0.3.2
  - pytorch-lightning-flash>=0.3.2
  - pytorch-lightning-loggers>=0.3.2
  - pytorch-lightning-profiler>=0.3.2
  - pytorch-lightning-trainer>=0.3.2
  - pytorch-lightning-utilities>=0.3.2
  - pytorch-lightning-transformers>=0.3.2
  - pytorch-lightning-vision>=0.3.2
  - pytorch-lightning-audio>=0.3.2
```

## Usage

To run ddim sampler from python you should write the next main.py file

    ```python
    import torch
    from ddimsampler import DDIMSampler
    ```

    ```python
    # Define the sampler
    sampler = DDIMSampler(
        dim=2,
        num_layers=4,
        num_channels=64,
        num_timesteps=1000,
        lr=1e-3,
        batch_size=32,
        num_workers=4,
        device="cuda",
    )
    ```

    ```python
    # Sample from the sampler
    samples = sampler.sample(1000)
    ```

    ```python
    # Save the samples
    torch.save(samples, "samples.pt")
    ```

    ```python
    # Load the samples
    samples = torch.load("samples.pt")
    ```

    ```python
    # Plot the samples
    sampler.plot(samples)
    ```

    ```python
    # Plot the samples
    sampler.plot(samples, show=False)
    ```

# DDim sampler use cases
