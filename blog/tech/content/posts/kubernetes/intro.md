---
title: "Una intro a kubernetes, que, cuando, por que? 🧐"
date: 2023-03-31T20:00:24-05:00
draft: false
---

# Descrito en pocas palabras... 😶

Kubernetes es un a forma integral de manejar tu infraestructura containerizada

# Por?

Con la aparición y masificación de los containers y de la cloud, surgió la
necesidad de tener un lugar donde desplegar infraestructura containerizada de
forma fiable y a gran escala.

_Disclaimer_: No soy experto en docker swarm

Si bien los principales impulsores de los contenedores para el gran publico,
**Docker Inc**, proveía una forma de desplegar arquitecturas containerizadas, lo
cierto es que no ofrecía las garantías suficientes para aplicaciones a gran
escala, con cientos de microservicios o nodos físicos.

## Google entra en el juego

Con la creación de GCP (google cloud platform), google se puso manos a la obra
para llevar a la realidad una plataforma que permitiera dos cosas principales:

- Atraer mercado
- Permitir a clientes externos manipular arquitectura cloud de forma segura y
  configurable.

Como big tech que son, ya habían tenido problemas con manejar muchos servidores
y miles de servicios, problema que por supuesto ya habían resuelto internamente
con Borg (y más recientemente con Omega), sistemas que de manera absolutamente
superficial, les permitía abstraer la capa física (maquinas, modelo, drivers y
sistema operativo) para centrarse en el despliegue y desarrollo de servicios,
ofreciendo buenos standares de reliability.

Borg y Omega ya había experimentado ampliamente con aplicaciones
containerizadas, en palabras de Brendan Burns (lead engineering en google,
referencias en este [blog](https://queue.acm.org/detail.cfm?id=2898444)) "Google
contribuyo mucho de el código para soportar containers en el kernel Linux"

Si quieres entender un poco más sobre Borg, Omega y como se relaciona con
Kubernetes puedes visitar el siguiente
[blog](https://queue.acm.org/detail.cfm?id=2898444), donde se explica como
kubernetes esta relacionado con sus predecesores.

Si bien Borg y Omega resolvían el problema, lo cierto es que software licenciado
echo a la medida no seria un buen gancho para atraer a el gran público en el
mercado de la cloud, asi que se pusieron manos a la obra para crear un sistema
que tuviera las siguientes características:

- Open source
- Fiable
- Soporte nativo para aplicaciones containerizadas
- Abstracción de el entorno de ejecución (máquina, sistema operativo, etc)
- Escalable a miles de nodos y servicios.

Y así en septiembre de 2014, nace Kubernetes.

# Cuando deberías usarlo, y cuando no

Si tu aplicación tiene a lo más 4 servicios (base de datos, ui desplegada, un
servidor web, un redis), seguramente kubernetes es un overkill para tu
infraestructura.

Si pasas de los 4 servicios, (tres o más bases de datos donde algunas necesitan
multiples nodos para escalar), dos o más servicios web, multiples cronjobs
(tareas que se ejecutan cada cierto tiempo), infraestructura de monitoreo (bases
de datos para albergar metricas, dashboards para visualizarlos, alarmas, log
rotation, log collector), entonces kubernetes puede ayudarte inmensamente.

# Componentes principales

- Nodos
- Kubeletes
- Container runtime
- Etcd
- Control plane
- Scheduler

# Tipos de recursos soportados

- Pod
- Service
- Persistent volume claims
- Ingress
- Load balancer
- Secrets

# Las distintas "distribuciones" de kubernetes

- minikube
- Open shift
- EKS
- k3s
- minikube

# Plugins claves

- Storage classes
- Sealed secrets

# Ventajas y desventajas

## Ventajas

- Escalable
- Multicloud
- Buenas practicas
- Abstracción de la capa física

## Desventajas

- Curva de aprendizaje

# Comparativa con otros sistemas

_Disclaimer_: las comparaciones 1-1 tienden a ser imprecisas dado que no existen
dos sistemas que resuelvan exactamente el mismo problema en la misma medida, la
información comparativa deberá tomarse solo con fines ilustrativos.

## Tu computador Linux

Suena un poco descabellado comparar un sistema de despliegue de infraestructura
en la nube con tu computadora, pero créeme, te hará sentido 🌞

- Ejecutables: containers
- Servicios en ejecución (drivers de red, instancias de postgres, etc): pods
- Systemd: control plane
- Consola de comandos: kubernetes api
- Gestor de paquetes (apt, yum, etc): helm
- Discos duros: `PersistentVolume` y `PersistentVolumeClaims`
- Tu archivo /etc/hosts: `CoreDNS`
- Usuarios y permisos: `users` y `ServiceAccounts`

## Docker

- Containers: pods (si bien los pods son un conjunto de containers, un
  contenedor es la unidad minima de ejecución de docker y pod es la unidad
  minima de ejecución en kubernetes)
- Image: en ambos sistemas el concepto es el mismo
- docker-compose: la sintaxis declarativa en `yaml`de kubernetes es bastante
  similar.
- Docker cli: kubectl

## Vagrant

Si bien el uso principal de vagrant es construir y distribuir maquinas virtuales
de forma portable, este también provee primitivas para ejecutar un conjunto de
maquinas virtuales relacionadas, asi como kubernetes provee un entorno para
ejecutar contenedores relacionados.

## Maquinas virtuales planas

- En maquinas virtuales planas debes preocuparte por la version de el sistema
  operativo, kernel, drivers etc, kubernetes por estar orientado a contenedores
  no tienes este problema.
- En maquinas virtuales planas el uso eficiente de recursos es tu trabajo, por
  ejemplo si creas una maquina virtual con 8 Gigas para tu servidor web, pero
  resulta que no tiene un flujo frecuente de usuarios, estos recursos se
  desperdiciaran, si por ejemplo tu maquina virtual de analítica de datos
  necesita mas espacio y se configuro inicialmente con 1 giga de ram, sera tu
  trabajo moverla de maquina y ampliar o reducir los tamaños de los recursos, en
  kubernetes esto se hace de forma automática por el scheduler.

# Docker compose

# ECS

# Firecracker

# AWS Lambda

## Terraform

- Ambos poseen la capacidad de representar infraestructura como código,
  terraform con su propio lenguaje hdl (creado por hashicorp), kubernetes haciendo
  uso de estándares abiertos como yaml (es el principalmente usado en documentación
  oficial), o json.

## Ansible

Ambos te permiten describir de forma declarativa características de tu sistema

- Archivos presentes en tus servicios
- Programas instalados en tus servicios
