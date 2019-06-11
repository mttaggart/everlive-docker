# Session 5: Linking Containers

## Action Objectives

1. Install `docker-compose`
2. Use Docker Compose to bring up the Node app from session 4 with a single file
3. Create a blog with 3 containers: a web server, the blog application, and a database—all using a single `docker-compose.yml`.

## Learning Objectives

1. What services are and how they are distinct from containers
2. The basic format of a `docker-compose.yml` file
3. How user-created networks allow secure inter-container communication
4. How Docker Volumes enable persistent data storage

## Multi-Container Apps

We left off last session having created a two-container app: a frontend Node application that drew data from a backend Node application "database." To make this work, we manually created a network to connect these two containers, then manually spun up each container using `docker container run`.

On a single host.

For two containers.

But real-world applications may be dozens, perhaps hundreds of replicated containers to handle scale. This approach isn't going to cut it. Just like the `Dockerfile`, we need a declarative approach to specify our multi-container app design.

Good thing we have one: `docker-compose`.

## Docker Compose

_From the [Docker Compose Overview](https://docs.docker.com/compose/overview/)_

> Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. 

Couldn't have said it better myself. Once instsalled, we can use the `docker-compose` command together with a `docker-compose.yml` file to bring up our multi-container apps. Docker Compose is a separate application from the software we've already installed, so we do need to install it. Luckily, it's super easy.

## Installing Docker Compose

This command should do the trick:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

## The `docker-compose.yml` File

YAML files are designed to be simple to read and write. Think of it as simplified JavaScript objects, with keys, values, and arrays written in a simple syntax. We use this syntax to describe the components of our multi-container application. These components are:

1. Services
2. Networks
3. Volumes

### Services

Services represent discrete components of an application. "But wait," you ask, "why aren't these just containers?" Because soon, very soon in our Docker journey, services _won't have to be a single container_. Services can be **replicated**, meaning multiple copies of a container can run to handle load. So, that's why services instead of containers. Still, we define services with the same kinds of arguments we'd use in `docker container run`.

```yaml
services:
  nginx:
    image: nginx:latest
    ports:
      - 8080:80
    volumes:
      - ./my-website:/usr/share/nginx/html
```

We can even define containers from images that haven't been built yet! Here's how we'd do it with our `node-frontend` `Dockerfile`:

```yaml
services:
  node-frontend:
    build:
      context: ./node-frontend
```

### Networks

We covered private networking in the previous session. As we learned, private networks allow containers in multi-container apps to talk to each other, while exposing only the containers that need external network access. In a Docker Compose scenario, we can define networks in the `docker-compose.yml` file, then attach services to them directly.

```yaml
services:
  db:
    image: mysql
    networks:
      - private-net

---
networks:
  private-net:
    driver: bridge
```
      
### Volumes

We have discussed the difference between Docker Volumes and bind mounts. But to recap, Docker Volumes are managed storage locations handled by Docker itself. We don't have to define location or driver (unless we want to) for the volume; Docker'll handle the nitty-gritty for us. Bind mounts, on the other hand, are pre-existing files or directories we want to place inside containers. As we'll see, Docker Volumes are much more helpful for dynamic data like a database, whereas bind mounts make senes for static content (like a web application with no changes to its directory). We define them much like networks, and attach them similarly as well.


```yaml
services:
  db:
    image: mysql
    networks:
      - private-net
    volumes:
      - db-data:/usr/lib/mysql

---
networks:
  private-net:
    driver: bridge

volumes:
  db-data:
```

## Bringing up a Docker Compose app

In the directory with your `docker-compose.yml` file, run:

```bash
docker-compose up -d
```

That's it! The `-d` flag actually does the same thing as in `docker container run`, in that without it the stdout of the app is attached to the terminal. The `-d` flag runs it detached, which is exactly what we want. 

Check out what containers, networks, and volumes were created with the respective `ls` commands. Note the naming. Docker Compose does us a solid with automatically creating related names for components of our app.

To bring the app back down, it's just `docker-compose down`.

