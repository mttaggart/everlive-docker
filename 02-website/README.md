# Session 2: Build a Containerized Website

Now that we have our Docker installation all sorted, we can get to work using this thing as intended. We're going to use the `nginx` base image to create a containerized website. 

## Action Objectives

1. Start a basic web server using the `nginx` image
2. Configure a container using the Docker CLI to mount our web content inside the container and serve it
3. Use `docker pull` to get base images from the Docker Hub

## Learning Objectives

1. Understand bind mounts and how to use them in `docker container run` commands
2. Understand exposing and translating ports from host to containers

## Bonus Objectives

1. Copy the website directory to a new location, and modify `nginx.conf` to serve BOTH SITES using the same `nginx` container, but two different `node` containers
