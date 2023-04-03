---
title: Balanceador de carga, ¿Qué es y para qué?
date: 2023:19:43:02T-05:00
draft: false
---

# Balanceador de carga, en pocas palabras 😶

Un balanceador de carga es un sistema computacional (puede ser un servidor, un programa o un contenedor) qué se encarga de recibir peticiones, ejecutar lógica sobre los inputs de dichas peticiones y con esta lógica delegar las peticiones a otros sistemas.

_A partir de aquí todos los ejemplos se darán con la sintaxis de NGINX, un balanceador de carga de los tantos de el mercado_

# Casos de uso principales

## Balanceo de carga

El siguiente código muestra balancear peticiones para un conjunto de servidores dado

```text
http {
  upstream backend {
    server 192.168.0.1;
    server 192.168.0.2;
    server 192.168.0.3;
  }

  server {
    listen 80;
    server_name example.com;

    location / {
      proxy_pass http://backend;
    }
  }
}
```

En el ejemplo anterior se hará un `round-robin`, es decir, las peticiones serán enrutadas de forma equilibrada en los tres servidores:

```bash
Peticion 1 -> server 1
Petición 2 -> server 2
Petición 3 -> server 3
Petición 4 -> server 1
...
```

NGINX tiene más estrategias de balanceo de carga, puedes darles un vistazo en [la documentación oficial](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/), aca hay un ejemplo de la estrategia `random`

```text
http {
  upstream backend {
    server 192.168.0.1;
    server 192.168.0.2;
    server 192.168.0.3;
  }

  server {
    listen 80;
    server_name example.com;

    location / {
      proxy_pass http://backend;
    }
  }
}
```

## Enrutamiento de peticiones basado en el path

Puedes hacer que las peticiones que vienen hacia la ruta HTTP `/auth` sea redirigido al puerto `8080` mientras que las rutas que vengan hacia la ruta HTTP `/users` vallan al puerto `8000`

```text
server {
  listen 80;
  server_name example.com;

  location /auth {
    proxy_pass http://localhost:8080
  }
  location /users {
    proxy_pass http://localhost:8000;
  }
}
```
