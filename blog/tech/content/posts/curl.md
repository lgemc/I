---
title: Curl (comando), ¿Qué es y para qué sirve?
date: 2023-04-02T19:06:01
draft: false
---

# Curl, en pocas palabras 😶

Curl es una herramienta que permite transferir datos desde y hacia un servidor, si bien soporta multiples formatos (DICT, FILE, FTPS, IMAP) es principalmente usado para HTTP/HTTPS

# Ejemplos de uso

## Obtener el contenido html de la página de google

```bash
curl www.google.com
# imprimirá todo el html de el index de google
```

## Obtener mi ip desde un servidor que te devuelve la ip con la que fue consultado

```bash
curl 'https://api.ipify.org?format=json'
# {"ip":"181.xxx.xxx.xx"}
```

## Revisar los headers retornados por google y el http status

```bash
curl -I www.google.com
#HTTP/1.1 200 OK
#Content-Type: text/html; charset=ISO-8859-1
#...
```

## Realizar una petición distinta a get

Petición options

```bash
curl -X OPTIONS www.google.com
```

## Agregando headers a la petición

```bash
curl -X GET www.google.com -H "Authorization: Bearer 123"
# Hace una petición GET google con el header 'Authorization' configurado con el valor 'Bearer 123'
```

## Agregando datos a la petición tipo json

```bash
curl -X POST -H "Authorization: Bearer 123" -H "Content-Type: application/json" -d '{"clave": "valor"}' atelir.requestcatcher.com/test
# Multiples headers son permitidos
```
