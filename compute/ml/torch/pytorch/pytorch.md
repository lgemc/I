# Que es?

Es un conjunto de librerias para manipular artefactos de machine learning, desde el entrenamiento hasta la evaluacion y el despliegue

## Ckpt

Formato de checkpoints donde son usados los pesos

## Troubleshooting

## Rank zero only not found

ImportError: cannot import name 'rank_zero_only' from 'pytorch_lightning.utilities.distributed' (/Users/lmanrique/.local/miniconda3/envs/corporate_memphis/lib/python3.10/site-packages/pytorch_lightning/utilities/distributed.py)

Mira
https://stackoverflow.com/questions/74289972/cannot-import-name-rank-zero-only-from-pytorch-lightning-utilities-distribute

Aca instalar la version 1.7.7 funciono 😊, no sin antes enredar
la instalacion de protobuff, obligando a instalar la version 3.20.2

## Vector quantitizer2

ImportError: cannot import name 'VectorQuantizer2' from 'taming.modules.vqvae.quantize'

Hay que parchear el file de quantitize, mira esto https://github.com/CompVis/stable-diffusion/issues/72
