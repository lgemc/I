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
