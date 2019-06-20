---
patat:
  title: "Session 8: Let's Deploy!"
  slideInterval: 2
  wrap: true
  images:
    backend: auto
  incrementalLists: true
---

# Session 8: Let's Deploy!

## Docker Node Review
* `docker node ls`
* AMI images for easy recreation

## Our Final App

* A Wordpress blog
* MySQL backend
* Nginx Proxy
* Blog Data volume
* Database volume
* Replicas of each

## Docker security

* What are the risks?
* What tools do we have to mitigate them?

## Security Risks

* CIA
* Software vulnerability
    * Containers limit exposure
* Resource usage
* Host compromise
    * Network islation
* Container Compromise
    * 😬
* Image spoofing
* Code Repo compromise

## Docker Bench

* Container that checks all kinds of security settings
* Resource quotas
* Namespaces
* Encrypted overlay networks

## Controlling resources

* `docker container run`
* `docker-compose`
    * `deploy.resources`

## Docker Content Trust (DCT)

* Addresses Image Spoofing
* What is it?
* How does it work?
* How do you enable it?

## Seccomp

* Addresses Container Compromise
* Linux kernel feature
* Policy manager for kernel syscalls
* Must download default seccomp policies
* `https://raw.githubusercontent.com/moby/moby/master/profiles/seccomp/default.json`
* `--cap-drop`

## Docker Secrets

* Addresses Code repo/secret compromise
* Secrets manager for Docker
* Can start encrypted, or use a file/stdin
* `docker secret create`


## Wordpress

* Dockerfile accepts secrets 
* Built-in web server, but we'll put Nginx in front

## Nginx

* You know it, you love it
* Proxy to Wordpress
* The only part that need be exposed!

## MySQL

* Accepts secrets
* Connected to Wordpress

# `docker-compose` time!
