#!/bin/bash

# Install dependencies
apt install \ 
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

# Add Docker's GPG key to apt's keychain
# This allows our system to trust it as a software source
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

# Add the correct repo for our version of Ubuntu
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# Refresh our catalogs of available packages
apt update

# Install the required packages
apt install docker-ce docker-ce-cli containerd.io
