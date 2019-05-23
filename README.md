# Intro to Docker Curriculum

## Course Overview

In this course, we'll explore Docker, a software containerization technology that allows developers to deploy their code across platforms. Docker also provides an increased layer of security for applications, since they are "sandboxed" from the computer the containers run on.

In this course, we will take a basic web application, deploy it using Docker, expand its functionality by connecting it to other containerized services, and secure it using best practices and the extended features of the Docker ecosystem. By the end of the course, you'll understand how and why to use Docker to deliver your code.

## Course Prerequisites

### AWS

Docker can live most anywhere, even [on your desktop](https://www.docker.com/products/docker-desktop).
However, since most real-world applications of Docker will live in the cloud, that's how we're going to approach this course. Amazon Web Services (AWS) has a [free tier](https://aws.amazon.com/free/) of service that we're going to take advantage of for this course. If you already have an AWS account, great! If not, it is simple to sign up. Although they collect credit card information, you will not be billed as long as you stay below the free tier usage limits. In this course, we definitely will.

### Command Line

Most people control Docker using the CLI (command line interface), and we'll be doing so in this course. You should have at least a passing familiarity with entering commands like `cd`, `ls`, or `cp` into a UNIX-like command line. If you've ever used Terminal on a Mac, you should be fine.

### Basic (I mean it!) network concepts

Ever heard of an IP address? If so, you're good to go! Docker _does_ require some understanding of IP networks, but we'll make sure to cover those topics as we encounter them.

## Required Materials

* Computer 
    * If running Windows, consider setting up [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10). Otherwise, I recommend [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/) for connecting to our AWS instances.
* AWS Free Tier account
* [Docker Hub](https://hub.docker.com) account
* GitHub account

## How to Use this Repository

This repo contains session-specific folders that will include any starter files and scripts we'll need for each session. There's also a `README.md` with an overview of the session's content and activities. This file will also contain action and learning objectives for each section.

## Course Sections

### Session 1: Welcome to Docker

In which we'll begin our exploration of Docker concepts, create two AWS virtual instances, and install Docker.

### Session 2: Build a Containerized Website

In which we'll use the certified [Nginx](http://nginx.org/en/) Docker image to deploy a website faster than you ever thought possible. Then, we'll learn how Docker handles traffic to/from the web.

### Session 3: Creating Custom Images

We can't always rely on other people's images. Sometimes, we need to create our own. In this session, we'll use Dockerfiles to begin with a base image, add our code, and create our very own image, ready for deployment. We'll also explore volumes: creating predictable storage areas within our containers. Then, we'll upload our images to Docker Hub.

### Session 4: Docker Networking

When we start deploying multiple containers, we'll often want them to be able to talk to each other. Once that happens, we need to create our own networks for our containers. Here, we'll add a new container to our application and connect it to the web server using Docker networks.

### Session 5: Linking Containers

Docker networks are just the start. Docker has another tool, [Docker Compose](https://docs.docker.com/compose/overview/), that makes the creation of linked containers even easier. With Docker Compose, we'll create a new version of our web application using a single file to describe everything we need. 

### Session 6: Management Tools

This is all getting a bit much. Luckily, there are some tools to help us out. In this session, we'll explore how to use [Portainer](https://www.portainer.io/) and Watchtower to manage our Docker environment.

### Session 7: Beyond a Single Host

Scale, scale, scale. I bet you've heard the word bandied about all over the place in the tech world. In this session, we are going to learn how to use [Docker Swarm](https://docs.docker.com/engine/swarm/) to create applications that can easily grow and adapt to updates in your code. 

### Session 8: Let's Deploy!

Getting everything ready for production means we have to get serious about security and best practices. In this session, we'll go over all the things we need to make sure our little app, now all grown up, is safe out there on the interwebs.

## Course Topics

### A Brief History of Web Application Deployment

The story of deploying web applications has changed dramatically in the last few years. It used to be the case that to put a website online, you'd have to either pay a hosting company for space on their server (and use some truly awful interfaces), or spin up your own server, at your own location, with your own routing.

Then came virtualization. Being able to create virtual machines on your or other people's computers (now known as "the cloud") made deploying applications much easier. It also meant we could make better use of bare metal hardware—one physical computer could use its resources to host several virtual machines.

Still, managing these VMs could be cumbersome. If demand for resources outpaced your current scale, you would have to manually spin up new resources to handle the load. And if there were a security vulnerability anywhere in the stack—from OS to application—you would have to patch quickly, and perhaps risk downtime.

Enter containers. Containers, as we'll explore more in-depth later, are lighter-weight than virtual machines because they only contain the components necessary for the app to run, not an entire OS. They share the host machine's resources, accessed through the container runtime. They are also designed to be ephemeral: no persistent state should exist such that destroying a container results in a loss of important data. This distinction makes deploying and redeploying containers more flexible than entire virtual machines.

Because bringing containers up and down is so much faster than doing so with VMs, the scaling story changes. Orchestration tools like Docker Swarm and Kubernetes (Koo-ber-NET-ees) can now handle the orchestration of applications made of several linked containers. These tools can also scale resources up and down as needed, as well as deploy new versions of apps in a safe way.

So here were are in the container age. Let's dive in to some key concepts about containers.

### The Container Lifecycle

To understand how and why we use containers, it's easiest to follow the path of a containerized app.

<!-- Lifecycle Diagram -->

#### Step 1: Code is completed

Congratulations! Your app is finished and ready for deployment. Users will connect to it over the internet. You don't know yet where the app will be hosted, but you know it'll need some kind of host server. You also hope the app will be a big success, so you want to be able to easily scale the app to multiple replicas to meet user demand.

Your DevOps team decides to use Docker to deploy the app.

#### Step 2: Create the Image

Your app is designed to work on a Linux server, so you start with a base **Docker image** like `ubuntu:latest` from Docker Hub. Images are templates for containers, which are actively running instances of an image. To make your ow image, you write a **Dockerfile** that contains directives to take the base image and include not only the parts of the OS you need, but all your app's code. You also provide any ports that your app will need open to the internet. 

You build the image based on the Dockerfile you've written. After downloading the base image, Docker builds your custom image layer by layer. And then, _voilà_! Your Docker image exists.

#### Step 3: Push to Registry

Docker Registries are the Docker analog of code repositories: remote locations to which you can push your images, and likewise pull new versions of images. With your custom image built, you push it up to either Docker Hub, or your own private image registry.

#### Step 4: Run the Image

On your (test/production) server, you pull down the latest version of your custom image. You then run the image with the correct options. This starts a **container**: a running instance of the image you've defined. Congrats; your app is deployed in a container!

#### Step 5: New Version

Eventually, you'll make a change to your code. Instead of spinning up a whole new server, you simply rebuild the image as before, and pull the new image into your Docker server. Then, you stop the old container and start the new one. That's it!

### Containers vs. VMs

What _is_ the difference between containers and VMs, anyway? Put simply, the difference is scope. In a virtual machine, _everything_ is virtualized: the hard drive, the network interface, the display, and the entire operating system included in the bundle. That's true for _each_ VM, even if most of the parameters are the same. For example, if I have two VMs running the same version of Windows, each VM has a completely unique copy of all the stuff that makes up Windows. They can't share, by design. And even if the app running in that VM only needs a small subset of the Windows platform, too bad; the whole kit-n-kaboodle is coming along for the ride.

Sometimes that's what you want! For example, in a "thin client" scenario where you're virtualizing a desktop environment for users, the whole machine _should_ be available, unique to each user. But for an app where you know exactly which pieces of the OS you'll need? We can stand to trim down a bit.

This is where the **container runtime** comes in.

![container diagram](https://www.docker.com/sites/default/files/d8/styles/large/public/2018-11/container-what-is-container.png)

### Container Runtime

Docker is not the only containerization technology that exists (although it is the most popular right now). Others, like Red Hat's [rkt](https://github.com/rkt/rkt/) or Canonical's [LXD](https://linuxcontainers.org/lxd/introduction/) work similarly to Docker. That's because the industry has come together and created the [Open Container Initiative](https://www.opencontainers.org/about). This agreement lays out technical specifications for how containerization technologies should behave and interact with other software. Perhaps the most key component of this scheme is the container runtime.

A container runtime is the connection between the underlying OS and the containers running on it. It also may handle other related tasks, such has networking between containers. In Docker, the runtime is known as **Docker Engine**. 

By the way, Docker Engine is now based on the open source **containerd**, ensuring it complies with the OCI standards.

### Docker API/CLI

Now, you as a user don't interact directly with Docker Engine. Neither do other applications working with Docker. Instead, instructions to Docker Engine are passed through the Docker API: a REST-style API that sends instructions to a **[socket](https://en.wikipedia.org/wiki/Network_socket)** on the host computer. The default location on a Linux computer is `/var/run/docker.sock`. We won't get too deep into sockets, but know that instead of directly interacting with this thing, we and other services use the Docker API. The most commonly used tool that takes advantage of the Docker API is the Docker command-line interface, or CLI. We'll be using this as our primary tool to create containers, images, networks, volumes, and services.

### Images

We've mentioned before that a container is a running instance of an image, but what _is_ an image? I like to think of an onion, or a nested doll. Starting from a base filesystem (usually a well-known Linux distribution or specially-created root image), layers of instructions are added to make the necesssary template, including all files and configuration described in the build instructions. These build instructions are written in special files known as `Dockerfile`s. 

Each instruction adds a layer to the filesystem (increasing its size slightly). 

The most important thing to remember about images is that they are _stateless_. No information is kept in images other than the build specification. A running instance of an image is a container. Containers can have state, although remember that containers should be ephemeral—destroying them should not destroy critical data. That's what **volumes** are for.

### Volumes/Bind Mounts

Say you want to store data collected by your app, but you want the data to persist beyond the lifespan of a container? A reasonable request, but how is it accomplished if containers aren't supposed to be persistent? 

Luckily, Docker provides volumes and bind mounts as a solution. 

Let's discuss bind mounts first, since they're a little simpler. Let's say you have a configuration file for a containerized app, `myapp.conf`. You don't want to force the app to use _only_ that config, so you have left the file out of the image. Instead, you use a _bind mount_ to attach the file to the container's filesystem at the desired location. That way the container has access to the necessay resource while maintaining the ability to use _different_ files if necessary.

Docker volumes are a little bit different. Instead of mounting an existing file/directory into a container, Docker volumes are managed by Docker itself. As we'll explore, volumes are objects that exist alongside images and containers in the Docker CLI command list. They can be created with different drivers and mounting options, depending on their intended usage.

### Networks

Just as we'll often need to connect persistent data storage to containers, we'll often need to connect containers doing different jobs together. Take a basic PHP web application with a MySQL database. We can identify three individual components here that could be containerized:

1. The web server 
2. The PHP application
3. The MySQL database

Each of these services can be containerized, but linked together so that they can communicate. The web server can send users to the application, which in turn can access the database, even though all three are in separate containers. 

Why bother? Well, in this setup, we can update or change any one part of the app while leaving the rest alone. Moreover, a revealed security issue in one of these components does not necessarily affect the others. In this way, we have introduced a little atomicity to our app. 

Docker Engine has the ability to define custom networks. Containers can be added to networks during creation or afterward. Networks use either a `bridge` or `overlay` driver (stay tuned), or a third-party driver you can install yourself. They can also be set to internal-only for private container networking.

It is so common to have networked containers making up a single application, Docker created a tool to easily deploy such applications. It's called **Docker Compose**.

### Docker Compose

So you have your multi-container application. You've learned how to use the Docker CLI to bring containers up from custom images, link them with networks, and attach persistent storage with volumes. But doing so for each app and each version of each app is a HUGE PAIN. If only there were some way to describe the application's specification in a file, much as we do for images in a `Dockerfile`.

Docker got you, fam.

[Docker Compose](https://docs.docker.com/compose/overview/) allows you to describe your multi-container applications using a single YAML (YAM-ul) file. We'll go over the details of creating these files together, but for now it's important to know that these files define the containers, volumes, and networks that will make up your Docker applications. 

After that, there's really only one thing to do: **SCALE**.

### Docker Swarm

Docker in Swarm mode: sounds like a plague of locusts, but no, it's when you you use multiple servers in concert to host your containers. Swarm mode is Docker's answer to the need for applications of massive scale. Using a single `docker-compose.yml` file, you can create load-balanced apps with multiple replicas of containers, hosted across multiple virtual (or physical!) servers.

Swarm mode is the last chapter of the Docker story before moving beyond Docker and onto more complex orchestration technologies like Kubernetes. But before you take on that journey, we'll take some time to go over best practices for securing your containers.

### Docker Secrets and Security Concerns

Let's again consider our three-container application: web server, app code, and database. The database container will require a password for authentication, and the app container will require the same password information to connect to the database. How can we safely provide these credentials?

You might think about adding them as environment variables when running the containers. Although, that's a bit fragile and doesn't survive bringing containers down/up without manual involvement. You could bake them straight into the `Dockerfile`, but then, if it's a public image or the code is stored on GitHub, the secrets are exposed. And what about things like SSH keys? You _really_ don't want those kicking around.

Docker Secrets is a tool that pairs with Docker in swarm mode. Secrets are encrypted pieces of information that are stored in Docker's **Raft log**, an encrypted database that containers may be granted access to. The Raft log is securely shared across all nodes in a swarm. When making a `docker-compose.yml` and using secrets, you can specify which of your stored secrets a given service has access to. These will then be available in the service's containers at `/run/secrets/<secret-name>`. Many certified containers, such as [mysql](https://hub.docker.com/_/mysql) are configured to accept file locations as well as environment variables for sensitive information, meaning that you can provide database credentials as Docker secrets rather than explicitly-written passwords in a file.

Another concern is trust. Odds are, you're going to be using someone else's Docker image to create your own containers. To ensure the image you're pulling was made by the right people, we now have **Docker Content Trust**.

Simply put, DCT allows you and others to digitally sign the images you create. What's more, with Content Trust enabled on your Docker hosts, you may _only_ pull signed images, keeping you in the land of verified content.

Another tool that helps DevOps teams manage best security practices for Docker is [Docker Bench](https://github.com/docker/docker-bench-security). This one-run image will test your configurations and make recommendations for improving your security posture. 























