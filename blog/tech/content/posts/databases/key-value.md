---
title: Bases de datos clave valor
date: "2023-04-02T11:47:57.600Z"
draft: false
---

# Bases de datos en pocas palabras 😶

Una base de datos clave valor almacena información relacionada con un id, y
además esta es la única relación soportada.

Por ejemplo en sql puedes consultar users join messages, en bases de datos clave
valor solo puedes consultar el user con id x, y el mensaje con id x.

# ¿Por qué?

La simplicidad en el core de una base de datos trae muchas ventajas

- Menor cantidad de lineas de código en el motor de la base de datos
- Capacidad para distribuir la base de datos
- Bajo tamaño de las librerías y los ejecutables
- Naturalmente idiomáticas

Gran parte de el software de uso real ha necesitado almacenamiento de datos
externo a lo que sus propias primitivas de lenguaje ofrecen, ya sea para
persistir datos, para ofrecer una interfaz genérica de acceso a los diferentes
componentes de el sistema, o para desacoplar el proceso de ejecución vs el
proceso de almacenamiento de datos (un proceso distinto para el sistema que se
encarga de gestionar los datos).
