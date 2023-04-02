---
title: "Conda, ¿qué es y para qué?"
date: 2023-04-02T17:50:51-05:00
draft: false
---

# Conda, en pocas palabras 😶

Conda es un gestor de _paquetes_ de python, al tiempo que un gestor de
_ambientes_

## Ambientes

Son una forma de aislar los paquetes y las dependencias python, de tal forma que no afecten los paquetes de tu maquina principal, o las de otra aplicación (ahondaremos en este concepto más adelante)

## ¿Por qué Conda?

¿Como hago para que mi aplicación corra fácilmente en las máquinas de otros?

Teniendo en cuenta que cualquier aplicación tiene una o mas dependencias, y
cualquier persona tendrá seguramente en su maquina una o más aplicaciones de
python... 🤔, sin mencionar que la aplicación esta construida y completamente
testeada en una version de python especifica...

Esta es la pregunta que todo el mundo se hacia, todo el tiempo, e incluso aún
sigue siendo un tema candente de discusión.

## Algo de historia ⏳

Una buena respuesta desde el ecosistema python surgió con la herramienta `venv`, el
cual ofrece una manera simple de aislar multiples aplicaciones python en
multiples ambientes, de esta forma podías mantener las dependencias de cada una
de tus aplicaciones sin comprometer el funcionamiento de otras o de maquina
principal. También permite tener multiples versiones de python en distintos
ambientes virtuales.

### Anaconda entra en acción

#### Espera, ¿qué es anaconda?

En realidad, muchas cosas, pero quizá la principal es, _una empresa_.

Sipe, una empresa dedicada a ayudar a las personas a trabajar mejor en
tecnología relacionada con machine learning.

Dentro de su abanico de soluciones esta _la distribución anaconda_, el cual es
un conjunto de paquetes en diferentes lenguajes (python y R) principalmente (pero
no unicamente) relacionados con machine learning.

El gestor de paquetes de esta distribución es en efecto la herramienta llamada
`conda`, la protagonista de hoy.

Además de gestionar paquetes, `conda` permite tener ambientes aislados, tal como
`venv`, y de echo podríamos decir que `conda` reemplaza por completo a `venv`.

# Principales casos de uso

- Quiero tener un ambiente para cada una de mis aplicaciones python en mi
  computadora local, con sus propios paquetes isolados y su propia version de
  python.
- Quiero tener un manejador de paquetes que me permita instalar y ejecutar
  aplicaciones python de forma sencilla y repetible en las maquinas de otros.

# Como instalar conda?

Anaconda es una distribución completa con un amplio conjunto de paquetes python
principalmente relacionados con machine learning, esta distribución esta en
forma de aplicación y la puedes encontrar en el siguiente
[link](https://www.anaconda.com/products/distribution).

_Sin embargo recomiendo altamente instalar miniconda, que es una versión light
que te permite tener los beneficios de multiples ambientes y gestor de
paqutes con conda_

## Instalar miniconda

Puedes ver los pasos para instalar miniconda en el [siguiente
link](https://docs.conda.io/en/latest/miniconda.html)

Al terminar la instalación podrás ver la versión instalada con el siguiente comando:

```bash
conda --version
# conda 23.1.0
```

## Creación básica de ambientes con conda

Tienes una aplicación que ejecutar, esta depende de un paquete llamado `Flask` y de `numpy` y quieres crear un ambiente donde instalar los paquetes que este requiere, quieres que este este aislado de los paquetes de tu maquina y paquetes instalados por otras aplicaciones.

Así que, decides crear un ambiente

```bash
conda create -y -n mi-app python=3.10
```

Con esto tendremos el ambiente `mi-app`, para activarlo bastara con ejecutar

```bash
conda activate mi-app
```

## Desactivando el ambiente actual

Si quieres desactivar el ambiente actual puedes hacerlo ejecutando

```bash
conda deactivate
```

## Listando los ambientes creados previamente

```bash
conda env list
# conda environments:
#
#base                     ~/miniconda3
#mi-app                     ~/.local/miniconda3/#envs/mi-app
```

## Y que hay de pip?

Conda instala una versión aislada de pip también, y sigue siendo completamente compatible con este, asi que puedes instalar paquetes con pip y estos estarán aislados por el ambiente creado por conda.

## El archivo environment.yaml

Siguiendo con el ejemplo de `mi-app`, el ambiente requerido en conda puede ser representado en un archivo `yaml`:

```yaml
name: mi-app
channels:
  - defaults
dependencies:
  - python=3.8.5
  - pip=20.3
  - numpy=1.19.2
  - pip:
      - Flask
```

Si bien puedes instalar los paquetes directamente con `conda install numpy` o `pip install Flask` por ejemplo, esto hace que la instalación de paquetes pierda repetibilidad (en las maquinas de tus compañeros por ejemplo que no sabrán que dependencias tiene el paquete) así que recomiendo altamente usar el `environment.yaml`.

El anterior tiene dependencias a instalar directamente con conda, y otras tantas con el gestor `pip`, el cual es completamente compatible con conda como dijimos anteriormente.

## Aplicando un archivo .yaml al ambiente actual

Puedes ejecutar el siguiente comando:

```bash
conda env update --file environment.yaml --prune
```

El argumento `prune` hace que todos los paquetes que no están definidos en el archivo `environment.yaml` sean desinstalados.

Con esto ya tendremos un ambiente especifico para ejecutar nuestra aplicación, puedes intentar con este código:

```python
from flask import Flask, jsonify

import numpy as np

app = Flask(__name__)

@app.route("/")
def main():
    return jsonify({'random_number': np.random.rand(1)[0]})
```

Luego ejecuta la aplicación con el comando `flask run`, y visitar la url `http://127.0.0.1:5000`.

También puedes ver la respuesta usando el comando `curl` en consola

```bash
curl http://127.0.0.1:5000
# {"random_number":0.26242508047695456}
```

Con esto tenemos una aplicación con su propio ambiente lista para ejecutar usando `conda` 🤗.
