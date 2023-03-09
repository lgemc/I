# Steps

Install it
On debian based systems

```bash
sudo apt install vagrant
```

Install libvirt and qemu kvm

```bash
sudo apt install qemu-kvm libvirt-daemon-system
```

Init it (it will start the initial vagrant)

```bash
vagrant init
```

Modify it to add your machine description

```bash
Vagrant.configure("2") do |config|
  config.vm.box = "alpine/alpine64"
end
```

Start vagrant machine

```bash
sudo vagrant up # sudo is required due to libvirt socket access needs root permissions
```
