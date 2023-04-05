---
title: "k3s, la introducción"
date: 2023-03-31T05:31:24-05:00
draft: false
---

# k3s, en pocas palabras 😶

k3s es una distribución de kubernetes

> Espera espera, como es eso de distribución? 🤔

Software que contiene varios paquetes relacionados y ofrece una funcionalidad
completa. En este caso, k3s es una distribución de kubernetes, que es un sistema
de orquestación de contenedores.

# Cuando usarlo

Cuando tu proyecto es personal, local, en una sola maquina o en un cluster
pequeño.

# Cuando no usarlo

Para proyectos de producción o gran escala no lo recomendaría.

# Alternativas

- EKS (Amazon Elastic Kubernetes Service): la distribución oficial de kubernetes
  de AWS.
- GKE (Google Kubernetes Engine): la distribución oficial de kubernetes de
  Google.
- AKS (Azure Kubernetes Service): la distribución oficial de kubernetes de
  Azure.
- RKE (Rancher kubernetes engine): la distribución oficial de kubernetes de
  OpenSUSE.
- MicroK8s: una distribución de kubernetes liviana soportada por Canonical. `
  [Aquí](https://nubenetes.com/matrix-table/) podrás encontrar la lista de todas
  las distribuciones oficiales de kubernetes

De las anteriores, para proyectos personales, ejecución local o con pocos nodos
(1 o más), tanto k3s como microk8s son buenas opciones

Para proyectos de producción, EKS, GKE y AKS son las mejores opciones.

# Instalación

La instalación es muy sencilla, ejecutas el siguiente comando en tu maquina y ya
esta.

(Aviso: necesitaras estar en un entorno Linux con systemd o con openrc)

```bash
curl -sfL https://get.k3s.io | sh -
```

> Ajá, y esa cosa que hizo? en mi maquina

Como ya es un clásico en este blog, no nos quedaremos solamente en path fácil de
instalación, vamos a entender que ocurrió en el sistema con este comando 🤗.

El comando de instalación, ha echo tres pasos importantes:

- Descargar el ejecutable de `k3s` (es un ejecutable compilado de forma estática,
  así que no tiene ninguna dependencia)
- Configurar tu gestor de servicios, registrando a `k3s` y activándose por
  defecto en tu máquina.
- Iniciar el servicio `k3s`

> A entiendo, chevere, espera que es eso de configurar mi gestor de servicios?

jeeeej bueeeno, eso es una larga historia

# El gestor de servicios standard en linux: systemd

systemd tiene la siguiente arquitectura:

![Systemd architecture](/images/diagrams/systemd.png)

Se que es un poco enredado pero, vamos a eso

# Demonios en linux, que son (el sufijo `d`)

systemd como su nombre lo indica es un demonio, en Linux todos los ejecutables
terminados en `d` (demonios) están pensados para ejecutarse indefinidamente en
el sistema, distinto a `cp` y `ls` por ejemplo.

Así que si, `systemd` se ejecuta siempre en tu maquina.

> Bueno y a que se dedica el tal systemd 🧐

sistemd es un demonio, sin embargo no es cualquier demonio, es el demonio con
PID 1, esto es, el primero el levantarse y el ultimo en irse a dormir.

Y de echo su trabajo es gestionar otros demonios, si bien el mismo es uno de
ellos

## /etc/systemd/system

Para `systemd` manejar otros procesos, este debe conocer cuales son esos
procesos que el sistema tiene, y tener configuraciones para iniciarlos

- Donde está el ejecutable
- Cuales variables de entorno deberá tener
- Si el servicio falla, lo reintento?
- Cuales argumentos se le deben pasar al demonio para que inicie?

Todas estas configuraciones estan en `/etc/systemd/system`

> Bueno, muy interesante pero, y `k3s`?

## el archivo `/etc/systemd/system/k3s.service`

Si revisas este folder, te encontraras con un archivo muy similar a este:

```toml
[Unit]
Description=Lightweight Kubernetes
Documentation=https://k3s.io
Wants=network-online.target
After=network-online.target

[Install]
WantedBy=multi-user.target

[Service]
Type=notify
EnvironmentFile=-/etc/default/%N
EnvironmentFile=-/etc/sysconfig/%N
EnvironmentFile=-/etc/systemd/system/k3s.service.env
KillMode=process
Delegate=yes
# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNOFILE=1048576
LimitNPROC=infinity
LimitCORE=infinity
TasksMax=infinity
TimeoutStartSec=0
Restart=always
RestartSec=5s
ExecStartPre=/bin/sh -xc '! /usr/bin/systemctl is-enabled --quiet nm-cloud-setup.service'
ExecStartPre=-/sbin/modprobe br_netfilter
ExecStartPre=-/sbin/modprobe overlay
ExecStart=/usr/local/bin/k3s server
```

Groso modo esta es la configuración de `k3s`, de el cual quiero remarcar algunos
datos importantes:

- `EnvironmentFile`: es el archivo donde buscara las variables de entorno que
  tendrá disponible `k3s`, estas estan en formato `VARIABLE=VALOR`
- `ExecStartPre`: ejecuta comandos antes de iniciar el servicio, si estos fallan
  el servicio no será iniciado.
  > - De esto podemos ver que `k3s` necesita los modulos `br_netffilter` y
  >   `overlay` disponibles, los veremos más adelante

Por ahora no daré más detalles sobre `k3s.service`, sin embargo volveremos a
estas configuraciones más adelante 😈

## Iniciando sesión con kubectl

Con k3s instalado, puedes ver tu cluster con `k3s kubectl get nodes`

En efecto, k3s incluye también `kubectl`.

## Arquitectura de el ejecutable `k3s`

![Systemd architecture](/images/diagrams/k3s.executable.architecture.png)

> Khe, qujeso, ¿no es un solo ejecutable y ya?

En efecto es un solo ejecutable, pero también es cierto que es todas esas cosas
al tiempo, todo esta compilado de forma estática para reducir dependencias y
tamaño de el ejecutable.

### kubectl

Como he dicho anteriormente, k3s ya viene integrado con el `cli` preferido para
acceder a los clusters.

```bash
k3s kubectl get pods -n kube-system
```

## sqlite3

Kubernetes usa un sistema de almacenamiento para conocer que recursos están
instalados en el cluster, y estos datos son clave ya que es de allí que se
orquesta todo el estado de el cluster

`Podría decirse que kubernetes es un sistema de computación distribuida donde su
principal meta es hacer que se cumpla el archivo de estado`

Si quieres inspeccionar o copiar este archivo esta en el archivo
`/var/lib/rancher/k3s/server/db/state.db`

En condiciones comunes, kubernetes almacena este archivo de estado en una base
de datos externa en modo cluster para tener capacidad de recuperación en caso de
fallos, esta base de datos es `etcd` (una base de datos clave valor distribuida
basada en un algoritmo de consenso), `k3s` escribio un wraper de los accesos a
esta para convertirla en `sql like`.

Si quieres cambiar la base de datos por defecto de `sqlite` a alguna versión mas
potente sea `sql` o `etcd` puedes hacerlo, más información en el [siguiente
link](https://docs.k3s.io/datastore)

**Uno de los grandes diferenciales de `k3s` es que viene con soporte por defecto
para almacenar los datos en bases de datos `sql`.**

## Arquitectura de el cluster `k3s`

![Cluster architecture](/images/diagrams/k3s.cluster.architecture.png) Para ver
los servicios oficiales que despliega `k3s` puedes ejecutar

```bash
k3s kubectl get pods -n kube-system # ejemplo de como usar kubectl con k3s
```

## Load balancer

Si bien lo más común cuando configuras un servicio de tipo `LoadBalancer` en
alguna distribución conocida de kubernetes como EKS o GKE es que uses un load
balancer de la cloud en la que estas, `k3s` esta echo para correr en cualquier
lugar, incluso en una sola computadora, asi que ya tiene un `LoadBalancer`
integrado y el mismo se encarga de escuchar por los puertos de la maquina host.

El `LoadBalancer` por defecto de `k3s` es `traefik`

Si te da curiosidad como despliega `k3s` este load balancer dentro de el
cluster, el manifiesto esta en la ruta
`/var/lib/rancher/k3s/server/manifests/traefik.yaml`

**Es gracias a este load balancer que puedes configurar los recursos `Ingress`
de tu cluster**

## Opcional: cambiando de traefik a nginx como load balancer principal

Para hacer esto tendrás que hacer varias cosas:

1. Borrar el `manifest` de traefik

```bash
rm /var/lib/rancher/k3s/server/manifests/traefik.yaml
```

2. Desinstalar el helm chart de traefik de tu cluster

`k3s` does not come with `helm` cli, you should install it and next

```bash
helm uninstall traefik -n kube-system
helm uninstall traefik-crd -n kube-system
```

3. Configurar el demonio `k3s` para que deshabilite traefik

{{< highlight go "linenos=table,hl_lines=11" >}}
[Unit]
Description=Lightweight
After=network-online.target
Kubernetes Documentation=https://k3s.io Wants=network-online.target

[Install]
WantedBy=multi-user.target

[Service]
...
ExecStart=/usr/local/bin/k3s --disable=traefik
{{< / highlight >}}

3. Instalar el load balancer nginx

Crea el archivo `ingress-nginx.yaml`

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ingress-nginx
---
apiVersion: helm.cattle.io/v1
kind: HelmChart
metadata:
  name: ingress-nginx
  namespace: kube-system
spec:
  chart: ingress-nginx
  repo: https://kubernetes.github.io/ingress-nginx
  targetNamespace: ingress-nginx
  version: v3.29.0
  set:
  valuesContent: |-
    fullnameOverride: ingress-nginx
    controller:
      kind: DaemonSet
      hostNetwork: true
      hostPort:
        enabled: true
      service:
        enabled: false
      publishService:
        enabled: false
      metrics:
        enabled: true
        serviceMonitor:
          enabled: true
      config:
        use-forwarded-headers: "true"
```

y a continuación

```bash
k3s kubectl apply -f ingress-nginx.yaml
```

## Opcional: arquitecturas adicionales para el cluster `k3s` con nodos de base de datos dedicada

Si no quieres depender de un archivo `sqlite` en el nodo principal de tu cluster
para manejar el estado kubernetes (`sqlite` es aconsejado solamente para
ambientes de prueba y personales) tienes dos opciones principales, albergarlo en
un nodo externo con una base de datos `sql`, o albergarlo en un cluster mono o
multinode con `etcd`

### Servidor sql

![](/images/diagrams/k3s.cluster.architecture.sql.png)

Esta arquitectura es posible de configurar modificando el archivo
`/etc/systemd/system/k3s.service`, modificando la linea de exec

{{< highlight go "linenos=table,hl_lines=12" >}} [Unit] Description=Lightweight
Kubernetes Documentation=https://k3s.io Wants=network-online.target
After=network-online.target

[Install] WantedBy=multi-user.target

[Service] ... ExecStart=/usr/local/bin/k3s server \
--datastore-endpoint=\
'mysql://username:password@tcp(hostname:3306)/database-name' {{< / highlight >}}

O bien modificando el archivo donde estan guardadas las variables de entorno de
el servicio `k3s`, tal como se detalla en `/etc/systemd/system/k3s.service` este
archivo es `/etc/systemd/system/k3s.service.env`

```env
K3S_DATASTORE_ENDPOINT=mysql://username:password@tcp(hostname:3306)/database-name
```

### Servidor etcd

Sigue los pasos anteriores, pero esta vez el endpoint sera simplemente
`http://<<serverip>>:2379`, `k3s` reconocerá que es un cluster `etcd` por el
puerto.

# Datos curiosos

- k3s esta escrito principalmente en Go.
