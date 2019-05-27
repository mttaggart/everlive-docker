# Session 3: Creating Custom Images

So we have ourselves a working website that mounts our code within it and runs. That's a start, but we can do better. What happens when, say, we want to deploy our code on a different server? Should we really have to connect, download the code again, and do all that `docker container run` customization?

No. No we shouldn't. There's a better way.

It's time to build a custom image.

## Action Objectives

1. Create a Dockerfile to imagify our Node application
2. Build the image
3. Push the image to Docker Hub

## Learning Objectives

1. Understand the basic instructions in a `Dockerfile`
2. Understand the layered process of constructing a Docker image

## The `Dockerfile`

Docker intends for you to make your own images based on the foundational, certified base images. To do that, Docker uses a specially-structured text file that contains all the instructions necessary to take a base image, enact your modifications and configuration, and create that new image.

The full `Dockerfile` specification is available in Docker's [documentation](https://docs.docker.com/engine/reference/builder/).

But for now, let's take a look at a sample `Dockerfile` and go over the pieces.

```Dockerfile
FROM ubuntu:18.04

RUN apt update
RUN apt install -y cowsay

ENTRYPOINT ["/usr/games/cowsay"]
CMD ["Hello from Docker!"]
```
So what's going on?

`FROM` indicates the image you'll use as a base. Docker searches for locally-saved images first, then the Docker Registry (by default, Docker Hub). The argument to `FROM` is formatted as an image name, followed by a colon, followed by a tag. Tags can indicate versions of an image. Without a tag, Docker will default to using the `latest` tag.

`RUN` executes commands as the container builds. This is where things start to get interesting in the build process. Remember that Docker images are like onions, or nesting dolls. Starting from the base image, a Docker image is a series of changes appended to a filesystem. Each change or layer adds a little bit of size to the resulting image, and each directive in a `Dockerfile` constitutes a layer. 

There are some advanced strategies we'll discuss later for keeping images small. For now, just be aware that these commands have a storage cost.

`ENTRYPOINT` and `CMD` do similar jobs. You can use `CMD` by itself, which will represent the default command and arguments executed by a container on startup. Notice the `[]` around the quoted arguments? That's the preferred syntax for these two instructions. 

So why have both? Well, with `ENTRYPOINT`, we can use `CMD` to provide default arguments to the command listed in `ENTRYPOINT`, but override them by providing other arguments when we `docker container run`. This is handy if you know for sure which executable you want to run in a new container, but not necessarily the arguments given. In this case, we know we want `/usr/games/cowsay` to be our executable, and by default we'll use `"Hello from Docker!"` as our message, but allow users to override that default in their `docker container run` commands.

### Building Images From `Dockerfile`s

With our `Dockerfile` written, we can now build the image using:

```bash
docker image build -t cowsay -f cowsay-dockerfile .
```

What's going on here? We're giving two flagged arguments and a positional one to `docker image build`. The `-t` flag indicates the 
**tag** or `name:tag` we're giving to the newly-built image. If you leave off the `:tag` component, the default tag of `latest` will be assigned. Now, under normal circumstances, you build a Docker image in a given directory with a file named `Dockerfile`. But since we'll be making our own `Dockerfile` for a different, non-`cowsay`
image later, we need to use the `-f` flag to specify the correct file to use. Lastly, we want to use this directory to do the building, so we enter `.`.

## Imagifying Our Application

So now we're going to create a Docker image to hold our web application inside of it.

Let's start by making our `Dockerfile`.

```bash
touch Dockerfile
```

We also will need our website folder local to our build folder, so let's copy that over.

```bash
cp -r ../02-website/my-website ./
```

We'll now use a text editor (`vim` or `nano`) to create the specific instructions in this file.


We'll be using the `node` image, with the `10` tag. So the first line of our `Dockerfile` is 

```
FROM node:10
```

We want to include our folder of code inside the image. We can do that with the `COPY` instruction.

```
COPY my-website /my-website
```

This will include the `my-website` folder inside the image, located at the root of the filesystem in a folder called `my-website`.

Now, this is a git repository. As such, we ignore the giant folder called `node_modules` in our tracking. So just to be safe, let's run a command to guarantee that all the dependencies listed in `package.json` are satisfied within the image. To do that, we're first going to set the `WORKDIR` to the correct directory inside the image:

```
WORKDIR /my-website
```

Now, let's run a command inside that directory to install Node dependencies.

```
RUN npm install
```

Okay, almost done! We want to make our web app available, which means we have to let traffic to a given port through. If you recall, our `app.js` file had the following line:

```javascript
const PORT = process.env.PORT || 3000;
```

The `env` in there refers to an environment variable: values set in the running shell that processes can access. If the environment variable `PORT` isn't set, our app will default to using port 3000. But since we _can_ set `PORT`, let's do it with the `ENV` instruction:

```
ENV PORT 8080
```

Now that we know our app will be available on port 8080, let's open that port to the world with the `EXPOSE` instruction. Now, we could type the number again, but since we just defined an environment variable, we can use it in successive instructions.

```
EXPOSE $PORT
```

And lastly, let's give our image a default command to run when it starts. We want node to run our `app.js` file, so...

```
CMD node app.js
```

We don't need to specify the directory because we already set `WORKDIR` to the correct directory earlier. And why not `ENTRYPOINT`? In this case, there's no reason to override the default command. 

Time to build!

```bash
docker image build -t my-website .
```

Notice we don't use the `-f` flag this time, since the correct file is named `Dockerfile` as expected.

Once building completes, we can confirm success by running `docker image ls` to see our new `my-website` image listed.

### Running The Container

To get our containerized website up and running, we'll need to once more use the `docker container run` command, with some extra options.

```bash
docker container run -dit -p 8080:8080 --name my-website my-website
```

Let's break that down a bit.

* `-d`: Run detached so we keep our command prompt
* `-i`: Keep STDIN open, just in case we want to attach to it
* `-t`: Allocates a pseudo-TTY (terminal interface) again, in case we want to attach to it
* `-p`: Port forwarding in the form of `host:container` ports
* `--name`: The name of our newly-created container

And lastly, the name of the image we will be starting the container from.

## Pushing to Docker Hub

This one's fairly simple. `docker image push <image>` will do the trick, EXCEPT that the image's name needs to begin with your username and a slash. To rename/retag an image, you can run `docker image tag <SOURCE> <NEW>`.























