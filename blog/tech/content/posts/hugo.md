---
title: Hugo, una herramienta para crear contenido a partir de formato "human readable"
date: 2023:04:02T22:27:23-05:00
draft: false
---

# hugo en pocas palabras 😶

Es una herramienta para gestionar contenido en formato "human readable" (como
mark down) y transformarlo en formato desplegable via web (como una página
estática)

# Bueno, tengo mi blog, ¿Adónde puedo desplegarlo?

Puedes visitar el siguiente [link](https://gohugo.io/hosting-and-deployment/),
hay variadas opciones tanto de alojamiento como de configurar la construcción
continua y el despliegue continuo.

Personalmente recomiendo la opción con [github pages + github actions](https://gohugo.io/hosting-and-deployment/hosting-on-github/)

# Añadiendo imágenes a tu blog

Lás imagenes puedes almacenarlas en el folder `static/images`, una vez allí puedes referenciarlas desde tu blog con la siguiente sintaxis:

```md
![Cluster architecture ](/images/diagrams/arch-example.png)
```

# Errores comunes

# ---

_Estoy construyendo el proyecto desde un folder distinto, y el folder de salida
no es el que debería_

Si estas ejecutando un comando similar al siguiente:

```bash
hugo --source blog/tech --destination "dist/blog/tech/"
```

````

Es muy probable que al darle `ls ./dist/blog/tech` en realidad no halla nada 🥹

Hay un problema extraño con el parámetro de el folder de destino, para resolver
este problema usa rutas absolutas, y listo

```bash
hugo --source blog/tech --destination "$(pwd)/dist/blog/tech/"
```

Con esto se soluciona el problema 🤗
````
