# Session 4: Docker Networking

In past sessions, we've used port forwarding to expose specific ports from our running containers to the world. That's great, but it might also be the case that we want containers to talk to each other without having them all exposed to the internet. Custom networks solve that problem.

## Action Objectives

1. Create a custom Docker network
2. Attach running containers to a custom network
3. Create a two-container application using a custom network

## Learning Objectives

1. Understand basic networking concepts
2. Understand private vs. public networks
3. Understand why not all containers should be connected to the default network

## Before we begin...

We have to talk about some basic network concepts. Since we're going to be using terms like IP Address, CIDR, and subnet, it's worth taking a moment to go over these concepts.

### IP Addresses

Most of us are familiar with the term, and we can recognize them when we see them.

```
192.168.0.1
```

But it's worth understanding a bit more about how these addresses work. To start, IP addresses that look like this are IP version 4, or IPv4 addresses. Each number separated by periods is known as an **octet**. Why an octet? Because each number represents 8 bits of information.

We don't have to go into too much detail here, but I do want us all familiar with the concept of **subnets**. 

Each octet can be a value of 0-255. So in theory, there are 4294967296 possible IPv4 addresses (which turns out, isn't enough for every device on the internet, but that's a topic for another day). That's WAY TOO MANY for a personal or even business network. To make the range of possible addresses more manageable, we **mask** the network space to include just as much as we need. **Subnet masks** often look something like:

```
255.255.255.0
```

Meaning that all 256 values in octets 1, 2, and 3 are _masked_, or unavailable. That leaves only the last octet, or 8 bits, available for addressing. So if we have a subnet that looks like `172.16.0.0`, we'll have up to address `172.16.0.254` in the range. 

Another way of writing this, known as the CIDR (Classless Inter-Domain Routing) format, is to say we have a subnet of `172.16.0.0/24`. The `/24` refers to how many bits are masked in the subnet. Remember that each part of the address is an octet?

Here's how that subnet mask breaks down:

Values | Bits 
--|--
255 | 8
255 | 8
255 | 8
0 | 0

For a total of...24 bits masked! Okay. Why go through all this trouble?

Well, Docker networks its containers. 

## Docker's networks

It has a few default networks, and the ability to create custom ones. Let's check them out with `docker network ls`.

You'll see a few networks listed here, including one called "bridge". This is the default network that our containers are attached to when we create them. Let's look deeper with `docker network inspect bridge`.

A lot of information comes up, but I'd like us to focus on the `Subnet` entry. You'll notice that there's a CIDR-formatted subnet there. 

Now, if you have a container running, `inspect` it. Otherwise, fire off a quick `docker container run -dit busybox /bin/sh` to get one up. Then `docker inspect` to get its IP address.

Looks like...it's in the same subnet! By default, Docker attaches our containers to the `bridge` network and manages port forwarding from the host machine's network interface to this network. That's how we can use `-p` and `EXPOSE` in `Dockerfile`s to provide access to these containers.

Running `docker network --help` will show us all the possible network commands. But DON'T MESS WITH THE DEFAULT NETWORKS. If you do, you might as well just reinstall Docker from scratch.

Instead, let's make a new network.

## Creating Networks

This one is simple enough.

```
docker network create new-net
```

Hooray, a new network! Let's check it out

```
docker network inspect new-net
```

Not that different from the `bridge` network, although the `Subnet` and `Gateway` components should be slightly different.

## Attaching Containers to Networks

We're able make our own networks. But that's no fun without containers attached to them.

Let's make a couple of lightweight containers to work with:

```
docker container run -dit --name alpine1 alpine /bin/sh
docker container run -dit --name alpine2 alpine /bin/sh
```

With these running containers, we can use `docker network connect new-net alpine<1|2>` to attach them. 

Run an `inspect` on these to see what you see.

## Creating Containers Attached To A Network

We can also connect containers to a network during creation with the `--network` option.





