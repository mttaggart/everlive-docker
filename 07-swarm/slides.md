---
patat:
  title: "Session 7: Beyond a Single Host"
  slideInterval: 2
  wrap: true
  images:
    backend: auto
  incrementalLists: true
---

# Session 7: Beyond a Single Host

## Orchestration

* The DevOps Dream
* Deployment _and_ scaling with simple tools
* Docker Compose is great, but...
    * What about multiple nodes?
* State reconciliation
* Load balancing

## Swarm Mode

* Networking multiple hosts together
* Managers
    * Manage members and delegate tasks
* Workers
    * Run services
* Hosts can be one or both
* Docker uses its resources to maintain a service's state

## Multiple hosts, eh?

* New EC2 Instance time!

## New Security Group

* Open up the ports necessary for Swarm communication

## Our First Stack

* Good ol' Node frontend/backend
* Deployed now as a stack
* Don't forget to build the images!

## Services

* That's why they were called that!
* Inspect them
* `docker service ps`: see which node is running what
* `docker service scale <id>=n`

## Rolling Updates

* Update a service with no downtime

## Networks in Swarm

* Overlay vs. Bridge
* Inspect networks
* Firewall rules makes this possible

## Volumes in Swarm

* Need a special driver
* [REX-Ray](https://rexray.readthedocs.io)
* Makes the same volume available across nodes
* Buckle up, 'cause this is gonna be a _thing_

## IAM

* Create a new group/policy/user
* Your choice: specific or broad permissions

## Installing the REX-Ray driver

```bash
docker plugin install rexray/ebs \
  EBS_ACCESSKEY=abc \
  EBS_SECRETKEY=123
```

## Creating a Volume

* `docker volume create --driver rexray/ebs`
* YAML

```yaml
volumes:
  my-data:
    driver: rexray/ebs
```

## All together now

A Wordpress blog, swarm style
