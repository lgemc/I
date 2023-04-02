# Por que?

Es un repo de machine learning donde publicar, versionar y alojar modelos
Tiene por debajo un servidor git y git lfs para albergar sus repos

# Throubleshooting

## En colab no funciona ❌

En colab va a joder por que no puede descargar el ckpt

```bash
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash # de otra forma lfs no quedara bien instalado, para mas informacion ver https://github.com/git-lfs/git-lfs/issues/3964
sudo apt-get install git-lfs
git lfs install
```

Va a necesitar los paquetes de python:

```bash
pip install diffusers accelerate transformers
```
