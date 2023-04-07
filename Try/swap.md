# Create file

```bash
sudo fallocate -l 4G /swapfile
```

# Change permissions

```bash
sudo chmod 600 /swapfile
```

# Format

```bash
sudo mkswap /swapfile
```

# Enable

```bash
sudo swapon /swapfile
```

# Make it permanent

```bash
sudo echo '/swapfile swap swap defaults 0 0' >> /etc/fstab
```

# See changes 🌞

```bash
sudo swapon --show
```
