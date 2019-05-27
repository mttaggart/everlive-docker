# Session 2: Build a Containerized Website

Now that we have our Docker installation all sorted, we can get to work using this thing as intended. We're going to use the `nginx` base image to create a containerized website. 

## Action Objectives

1. Start a basic web server using the `nginx` image
2. Configure a container using the Docker CLI to mount our web content inside the container and serve it
3. Use `docker pull` to get base images from the Docker Hub

## Learning Objectives

1. Understand bind mounts and how to use them in `docker container run` commands
2. Understand exposing and translating ports from host to containers

## Start a Basic Web Server

One of the great things about containers is allowing _most_ of the configuration for a given service to be including in the base image you're using. We'll definitely take advantage of that here with our Nginx web server. The certified base image from from Docker Hub makes this fairly simple. Let's go grab it:

```bash
docker image pull nginx:latest
```

This will download the `nginx` base image with the `latest` tag. We can then use it to create containers.

Let's run a no-frills, just-what's-included nginx container to get used to the ergonomics of the CLI:

```
docker container run -dit --name nginx-test -p 8080:80 nginx
```

Now, to confirm this thing is working, we _could_ try to visit it via a web browser. However, without making sure our AWS security rules are correct, it's easier to just use a command-line tool like `curl` to test this content.

```bash
curl localhost:8080
```

We should get back our Nginx welcome page. Success! 

That's cool and all, but we'd very much like to be able to host our content, and not just a default index page. One way to do this is to use **bind mounts** to connect a local folder to the running container. That way, the container could point the webserver to our content. As you see, we have a folder in this directory called `my-site`. By using the `-v` flag in our `docker container run` command, we can specify a source directory and desination within the container's filesystem. Let's try it:

```bash
docker container run -dit  -p 8081:80 --name my-site -v $(pwd)/my-site:/usr/share/nginx/html nginx
```

Once again, let's use `curl` to test it out.

```bash
curl localhost:8081
```

Now we should be seeing our own site's content.

Let's clean up our running containers using `docker container stop` for each running container. Then, we'll use `docker container prune` to delete stopped and unnecessary containers.
