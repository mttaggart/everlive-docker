---
title: "4: Networked Containers"
author: Michael Taggart
patat:
    slideLevel: 2
    margins:
        left: 3
        right: 3
    incrementalLists: true
    wrap: true
    images:
        backend: auto
---

# Session 4: Networked Containers

## Got Everything?

* AWS Account
    * EC2 Instance
    * SSH Private Key
* Docker Hub Account
* Terminal?

## IP Concepts

* IP Address
    * IPv4
    * 4 **octets**
    * 0-255 (256 values)
    * We only use use a subset of the IP Range

## Subnets

* Created with:
    * **Starting address**: The first address in our subnet
    * **Subnet Mask**: Restriction of IPv4 range
    * **Default Gateway**: Address to escape the subnet

* `192.168.0.0`
* `255.255.255.0`
* `192.168.0.1`

## Subnet Masks

Subnet masks close off parts of the IPv4 range from our subnet.

### How Masks Work

```
255.255.255.0
192.168.0.0
xxx.xxx.x.0-255
```


Bits | Values | Octet Mask
--|--|--
8 | 256 | 255
4 | 128 | 128

Subnet Mask | Bits Masked | Total Addresses | Last Address
--|--|--|--
255.255.255.0 | 24 | 254 | 192.168.0.254
255.255.255.128 | 25 | 126 | 192.168.0.126

The last address in a subnet is reserved for **broadcast**.

# Docker Networks

## Docker Networking

Docker has default networks.

```
docker network ls
```

```
docker network inspect bridge
```

## Creating Docker Networks

```
docker network create new-net
```

```
docker network inspect new-net
```

## Attaching Containers to Networks

```
docker network connect <network> <container>
```

We can also connect containers to a network during creation with the `--network` option.

# Real uses for networks

## Frontend/Backend

We have 2 `node` applications here: one displays data from a database, the other...is the database.

## Network Diagram

```
Internet<---->Docker Host
                   |               
                x__|_____              
                |       |
            node-net  bridge
                |       |
      backend<--|--->frontend
                  
```


