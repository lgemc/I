# Example about create and mount swap

# Create file where swap will be

```bash
dd if=/dev/zero of=/swap bs=500M count=8 # 4GB file
```

# Add a line with swap mount logic to fstab

```bash
echo "/swap swap swap defaults 0 0" >> /etc/fstab
```

# Make is swap format

```bash
mkswap /swap
```

# Start in current session this swap

```bash
swapon /swap
```
