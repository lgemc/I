# Resolución de problemas

#

## Ruby devel no instalado

```txt
Vagrant failed to install the requested plugin because the Ruby header
files could not be found. Install the ruby development package for your
system and then run this command again.
```

Solución

```bash
sudo zypper install ruby-devel
```

## Plugins faltantes

```
Vagrant failed to install the requested plugin because it depends
on a library which is not currently installed on this system. The
following library is required by the 'vagrant-libvirt' plugin:

  libvirt

Please install the library and then run the command again
```

Solución

Instala las dependencias para libvirt y qemu kvm

```bash
sudo zypper install libvirt-daemon-qemu qemu-kvm
sudo systemctl restart libvirtd.service

vagrant plugin install vagrant-libvirt
```

## No es posible conectarse al libvirt

```txt
Error while connecting to Libvirt: Error making a connection to libvirt URI qemu:///system:
Call to virConnectOpen failed: Failed to connect socket to '/var/run/libvirt/virtqemud-sock': No such file or directory
```

Solución

```bash
sudo systemctl start libvirtd
sudo systemctl activate libvirtd
```

```bash
Error while connecting to Libvirt: Error making a connection to libvirt URI qemu:///system:
Call to virConnectOpen failed: authentication unavailable: no polkit agent available to authenticate action 'org.libvirt.unix.manage'
```

Solución

```bash
sudo usermod -a -G libvirt {user}
```

## Problemas en la construcción de imágenes debido al montaje de NFS

```bash
mount.nfs: mount to NFS server '192.168.121.1:/home/{user}/{project}' failed: RPC Error: Unable to receive
```

## Problemas al conectarse con kubectl

Solución

```bash
sudo firewall-cmd --zone=libvirt --add-service=nfs
```

```text
kubectl handshake errors
sudo firewall-cmd --zone=public --add-port=6443/tcp --permanent
sudo firewall-cmd --zone=public --add-port=10250/tcp --permanent
sudo firewall-cmd --zone=public --add-port=10251/tcp --permanent
sudo firewall-cmd --zone=public --add-port=10252/tcp --permanent
sudo firewall-cmd --zone=public --add-port=8472/udp --permanent
```
