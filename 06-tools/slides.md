---
patat:
  title: "Session 6: Management Tools"
  slideInterval: 2
  wrap: true
  images:
    backend: auto
  incrementalLists: true
---

# Session 6: Management Tools

## GitHub

* Include `Dockerfile`s or `docker-compose.yml` in source
* Public vs. Private
* SEEEEECRETS!
* Consider using `.env` and `.gitignore`

## Creating a Repo for our project

* Let's Revisit `node-frontend` and `node-backend`
* Separate repos for each

## Docker Hub

* Not just for pushing images
* Automated builds

## Watchtower

* When new versions of am image appear...
* Watchtower sees all
* And updates your running containers with existing parameters, but new images!

## Private Registry

* Docker hosts can be their own registry
* Useful for large enterprises who don't want to use Docker Hub

## Setting up a Private Registry

* New EC2 Instance
* Install Docker
* Use the Registry image
* Re-tag images
* Needs HTTPS!

# Detour: HTTPS and You

## Portainer

* Web-based Docker management
* Easy, intuitive UI

# Up Next: Swarm mode!
