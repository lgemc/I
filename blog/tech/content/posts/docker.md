---
title: "Docker"
date: 2023-03-31T05:31:24-05:00
draft: false
---

# Docker, por qué?

Te va a sonar extraño, pero el por que de docker es como idea de growth de `Docker Inc` (previamente `dotcloud.com`, una empresa que ofrecía plataforma como servicio, PaaS)

_Más información sobre `dot cloud` [aquí](https://jpetazzo.github.io/2017/02/24/from-dotcloud-to-docker/)_

Te adelanto que `Docker Inc` fue adquirido por `Mirantis` (empresa que se dedica a servicios en la nube) en 2019.

# Toolset

## Docker cli, casos de uso

## Construir y empaquetar imágenes

### Docker file

# Componentes

- Imágenes
- Contenedores

# Predecesores

## El origen de todo: BSD jails 🔳

## CGroups es mergido en master en el kernel linux

## Namespaces es mergido en master en el kernel linux

# LXCD

# Por que debería usarlo? 🧐

# Cuando no usarlo 😶

# Container registry

# Builder

Docker usa el formato `DockerFile` para construir nuevas imágenes, pero que significa realmente construir una imagen 🧐?

Supongamos que tienes el siguiente archivo `DockerFile``

```docker
FROM alpine
echo "holi" >> miarchivo.txt
```

# Runtime

# Dockerd
