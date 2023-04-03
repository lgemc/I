---
title: GraphEasy, que es y como instalarlo en Mac (MX)
date: 2023:04:02:T20:14:-05:00
draft: false
---

# Qué es GraphEasy, en pocas palabras 😶

Es una herramienta que permite transformar grafos en multiples formatos standard en otros

Puedes encontrar la referencia completa sobre este comando [aquí](https://linux.die.net/man/1/graph-easy)

## Ejemplo de el comando graph-easy

```bash
echo "[ Bonn ] -- car --> [ Berlin ], [ Ulm ]" | graph-easy
#+--------+  car   +-----+
#|  Bonn  | -----> | Ulm |
#+--------+        +-----+
#  |
#  | car
#  v
#+--------+
#| Berlin |
#+--------+
```

# Pasos para instalarlo en la Mac MX

Por alguna razón que desconozco `GraphEasy` no esta como paquete en `homebrew` así que la alternativa es instalarlo por medio de el repositorio oficial

```bash
git clone https://github.com/ironcamel/Graph-Easy

cd Graph-Easy
```

Debes tener instalado perl, si no lo tienes aún instálalo con el comando

```bash
brew install perl
```

_Los detalles de la instalación puedes verlos en el archivo `INSTALL`, los pasos siguientes están basados en este archivo, con varias adiciones de como instalar dependencias adicionales_

GraphEasy se instala usando make, sin embargo hay una parte adicional que hacer antes de ejecutar

```bash
perl Make.PL
```

Puedes ver el contenido de el archivo `Make.PL` con el comando

```bash
cat Make.PL
```

Sin embargo, es muy probable que falle por falta de la dependencia ìnc::Module::Install así que vamos a instalarla (si el comando anterior no te fallo entonces no hagas este paso 🌞)

```bash
cpan inc::Module::Install
```

Ahora si ejecutar el archivo `Make.PL`

```bash
perl Make.PL
```

Y por último el comando

```bash
sudo make install
```

Una vez terminado este genera un binario llamado `graph-easy` en el folder `opt/homebrew/Cellar/perl/5.36.0/bin`

Si aún no tienes este folder en tu `.zshrc` puedes agregarlo allí con el comando

```bash
echo export PATH="$PATH:/opt/homebrew/Cellar/perl/5.36.0/bin" >> ~/.zshrc
# el comando anterior varía dependiendo la version de perl, en este caso es 5.36.0, revisa tu versión
```

Ahora podrás ejecutar el comando `graph-easy`

```bash
echo "[ Bonn ] -- car --> [ Berlin ], [ Ulm ]" | graph-easy
#+--------+  car   +-----+
#|  Bonn  | -----> | Ulm |
#+--------+        +-----+
#  |
#  | car
#  v
#+--------+
#| Berlin |
#+--------+
```
