---
patat:
  title: "Session 5: Linking Containers"
  slideInterval: 2
  wrap: true
  images:
    backend: auto
  incrementalLists: true
---

# Session 5: Linking Containers

## Do we have everything?

* Class Repo (https://github.com/mttaggart/everlive-docker)
* AWS Account
* Docker Hub Account
* Terminal Emulator?
  * macOS/Linux: Terminal
  * Windows: PuTTY or Windows Subsystem for Linux

## The Story So Far

* Images
* Containers
* Dockerfile for custom images
* Docker Hub
* Port Forwarding
* Docker Networking
* Multi-container applications

## The Trouble With `container run`

* It
* Doesn't
* Scale

## A different way

If only there were a **declarative** way of handling multi-container apps.

Enter `docker-compose`

# Docker Compose

## Installing Docker Compose

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

* `docker-compose --version`
* `docker-compose --help`

## `docker-compose.yml`

* Describes:
    * Services
    * Networks
    * Volumes

## YAML Files

```yaml
key: value
key:
  - some
  - array
  - items

key:
  objectValue: 
    key: 
      - array
      - items
```

## Services

* Abstracted from containers
* Can be pre-built image or build args for a `Dockerfile`
* Can (eventually) be **replicated** with many copies of a container running at once

## Networks

* Declarative description of Docker Networks
* Services can be connected with a single key
* Listed in services, declared top-level

## Volumes

* Bind mount or Docker Volume
* Listed in services, declared top-level

## A Basic `docker-compose.yml`

```yaml
version: "3"

services:
  web:
    image: nginx
    ports:
      - 8080:80
```

## Docker Compose CLI

* `docker-compose config`
    * Verifies a `docker-compose.yml` file
* `docker-compose up`
    * Brings services up
    * Use the `-d` flag to detach from stdin
* `docker-compose down`
    * Gracefully stop services, networks

## Our Node App, Composed

* We have our images
* Images become services
    * `node-frontend`
        * Translate port 8080:9001
        * Set environment variables
            * `DATABASE_HOST`
            * Service names work in DNS
    * `node-backend`
* We need a network
    * `node-net`

## Bringing the App Up

```
docker-compose -d up
```

Then, confirm all's working

## A More Complex App

* Web Server
    * Remember `nginx`?
* Database
    * MySQL
* Application
    * Ghost Blog

## Nginx

* `nginx.conf`
    * Proxy for the Ghost application
* Nginx is a powerful, dedicated web server
* Ghost's Node server is not

## MySQL

* Configured with environment variables
* Will store data outside the container
    * Docker Volume

## Ghost

### Environment Variables

* `database__client`
* `database__connection__host`
* `database__connection__user`
* `databse__connection__password`
* `database__connection__database`

## Ghost, Cont'd

* External Volume
* Private network
* Restart policy
    * Why is this necessary?

## Networking

* `ghost-net`: Private network for our app

## Volumes

* `blog-data`: Where MySQL will keep its data
* `blog-content`: Where Ghost will keep its data

## Putting it all together
























