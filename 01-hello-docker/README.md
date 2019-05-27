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

