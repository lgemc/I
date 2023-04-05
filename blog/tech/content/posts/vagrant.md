---
title: "Vagrant, una introducción"
date: 2023-03-31T05:31:24-05:00
draft: false
---

# Vagrant, en pocas palabras 😶

Es una herramienta que te ayudara a gestionar maquinas virtuales, desde su
creación, hasta su configuración y tiempo de ejecución, y si ya te aburriste de
ellas también te ayuda a borrarlas 🌚.

# ¿Por qué vagrant?

Si quieres organizar tus maquinas virtuales, y tienes más de una, o las
compartes con tus amigos, borras, inicias y editas con mucha frecuencia es muy
probable que te convenga escribir código para automatizar estas tareas.

Las tareas comunes sobre las maquinas virtuales son estas:

![Vagrant lifecycle](/images/diagrams/virtualmachine.lifecycle.png)

La forma en que se ejecutan las maquinas virtuales puede verse en el siguiente diagrama
![Virtual machine execution diagram](/images/diagrams/virtualmachine.hypervisor.png)

Un ejemplo simple de como es el proceso de manejo de maquinas virtuales con vagrant puede verse en el siguiente diagrama:

![Vagrant steps](/images/diagrams/vagrant.steps.png)

La alternativa quiza más conocida para virtualizar es usar virtualbox para crear e iniciar las maquinas virtuales,
sin embargo su caso de uso es más para permitir el ambiente de ejecución de las maquinas virtuales mas que para automatizar
procesos con ellas.

Allí es donde entra vagrant.

![Vagrant architecture](/images/diagrams/vagrant.png)

Como puedes ver vagrant no ejecuta directamente las maquinas virtuales, esta tarea es de `virtual box` o de `kvm` y vagrant se encarga de manejarlos.

> Aaa entiendo, un momento, virtualbox lo he escuchado, pero que carajos es kvm 🌞

No ahondare demaciado, pero puedes pensar que `kvm` te permite ejecutar maquinas virtuales igual que virtual box, la diferencia es que `kvm` ejecuta directamente en el hardware de tu maquina sin intervención ninguna (ni siquiera por el sistema operativo host), mientras que virtual box se ejecuta encima de el sistema operativo **por lo cual en terminos de performance es muy, muy superior**

Lo anterior dicho en otros términos mas estándar, `kvm` es un hypervisor de tipo 1 mientras que `virtualbox` es un hypervisor de tipo 2.

Sin embargo, como ejecuta directamente en el hardware de tu maquina, si quieres ejecutar un sistema que no lo soporta (por ejemplo una distribución android que soporta `arm64`), entonces `kvm` no será la solución, mientras que virtualbox si podrá hacer el trabajo (u otra alternativa como qemu).

# El vagrant file: ruby al rescate

Dejemonos de teoria y saltemos directamente a como se vería tu primera maquina virtual en el archivo que lo gestiona todo: el `Vagrant file`

Queremos una maquina virtual de tipo debian, asi que vamos a eso:

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "debian/stretch64"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "512"
  end
end
```

El archivo anterior indica que con `Vagrant` version 2, tu quieres una maquina virtual tipo `debian` configurada con `512` megabytes de ram.

Si no tienes `virtualbox` o `kvm`, te saldrá un mensaje como el siguiente:

```text
No usable default provider could be found for your system.

Vagrant relies on interactions with 3rd party systems, known as
"providers", to provide Vagrant with resources to run development
environments. Examples are VirtualBox, VMware, Hyper-V.
```

Como lo deciamos anteriormente, vagrant no puede ejecutar maquinas virtuales, así que necesitamos un `hypervisor` instalado en nuestro sistema

# Instalando kvm

Suponiendo que estas en un sistema operativo basado en opensuse
igue los siguientes pasos

```bash
sudo zypper install -t pattern kvm_server
```

Sistemas basados en debian (ubuntu, mint etc)

```bash
sudo apt-get install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils
```

Para automatizar las tareas de gestión de
