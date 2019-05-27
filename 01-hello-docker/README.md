# Session 1: Welcome to Docker

Okay, we're going to get started exploring Docker. Today is going to be a great deal of setup and learning our way around our ecosystem. First thing's first: Let's make sure you have all the requisite accounts set up. Do you have your...

* GitHub account (probably, if you're reading this)
* AWS Free Tier Account
* Docker Hub Account

And, do you have a terminal emulator? On Windows, I recommend [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/). On Mac, `Terminal.app` is just fine.

With that out of the way, let's look at our objectives.

## Action Objectives

1. Create 2 AWS Ubuntu 18.04 EC2 instances
2. Connect to our instances over SSH
3. Install Docker CE on each
4. Run the `hello-world` image to verify our installation
5. Run the `busybox` image and execute commands inside it.

## Learning Objectives

1. Understand basic command line interaction
2. Explore the `docker image` and `docker container` subcommands
3. Log in to our Docker Hub account
4. Execute a command in a container, from outside the container
5. Understand the difference between `docker container exec` and `docker container attach`

## Installing Docker CE

This directory has a script, `install-docker.sh`, which contains all the commands necessary to get Docker going on your nodes. You _could_ take the quick way and run:

```bash
sudo ./install-docker.sh
```

But we won't be doing that. Instead, we'll be going through each line to understand _what_ we're doing. So instead, enter:

```bash
cat ./install-docker.sh
```

To print out the file's contents.

Let's go through each command.


```bash
#!/bin/bash
```

If you're new to shell scripts, this line is called the shebang. It tells the shell what interpreter to use to process the code in the script. `#!` is the shebang itself, followed by the path to the correct interpreter. You'll see `/bin/bash`, `/bin/sh`, and `/usr/bin/python` frequently in this line.

```bash
apt install \ 
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

`apt` is the package manager for our Ubuntu Linux distribution. We're using it to install all the packages Docker will need to run correctly.

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
```

`curl` is a handly command-line tool to interact with the web. You'll see it a few more times in this course. Here, we're using it to download Docker's public encryption key and add it to our package manager's keychain. This allows `apt` to verify that packages we try to download actually come from where they claim to.

```bash
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

`apt` relies on a list of repositories that hold catalogs of packages available for download. We're adding Docker's own repo to that list (which we can do now, since we have the public key for trust verification).

```bash
apt update
```

This tells `apt` to go update its available packages. We have to do this now that we've added a new repository to the list, but not yet downloaded its catalog of packages.

```bash
apt install docker-ce docker-ce-cli containerd.io
```

Finally, we install the newly-available packages from Docker's repo.
