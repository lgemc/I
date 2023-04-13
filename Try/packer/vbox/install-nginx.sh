#!/bin/bash

# Update the package list and install NGINX
apt-get update
apt-get install -y nginx

# Configure NGINX to serve a simple "Hello, World!" page
echo "Hello, World!" > /var/www/html/index.html

