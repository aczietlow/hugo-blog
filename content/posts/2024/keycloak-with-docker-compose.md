---
title: "Keycloak With Docker Compose" # Title of the blog post.
date: 2024-04-28T17:33:28-04:00 # Date of post creation.
description: "A short guide on running Keycloak with docker compose" # Description used for search engine.
draft: false
featureImage: "/images/blogs/keycloak/banner.png" # Sets thumbnail image appearing inside card on homepage.

thumbnail: "/images/blogs/keycloak/icon.svg" # Sets thumbnail image appearing inside card on homepage.
shareImage: "/images/blogs/keycloak/icon.svg" # Designate a separate image for social media sharing.

categories:
  - keycloak
tags:
  - keycloak
  - docker
  - iam
  - sso
---
K
Keycloak is an open sourced project for identity and access management developed by Red Hat. It is designed to be a versatile and robust IAM solution for both authentication and authorization for apps and services. What follows is a brief guide on how to run Keycloak locally using docker compose.

## Docker Compose

By default, Keycloak will use a dev-file for storage, but for our use case we will be using Postgres. Keycloak does [support](https://www.keycloak.org/server/db) other databases as well.

```yaml
#docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:${POSTGRES_VERSION}
    restart: always
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASS}

  keycloak:
    image: quay.io/keycloak/keycloak:${KEYCLOAK_VERSION}
    ports:
      - "8080:8080"
      - "8443:8443"
    entrypoint: /opt/keycloak/bin/kc.sh start-dev
    environment:
      DB_VENDOR: postgres
      DB_ADDR: postgres
      DB_DATABASE: ${POSTGRES_DB}
      DB_USER: ${POSTGRES_USER}
      DB_PASSWORD: ${POSTGRES_PASS}
    env_file:
      - ./.env
    depends_on:
      - postgres
```

In the same directory add an `.env` file

```
# postgres
POSTGRES_VERSION=16.2
POSTGRES_DB=kc
POSTGRES_USER=kc
POSTGRES_PASS=kc

# keycloak
KEYCLOAK_VERSION=24.0.3
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=admin
```

Now run `docker-compose up`, let docker preform its magic, and everything should "just work"tm. Visiting [http://localhost:8080](http://localhost:8080) should load the login page for Keycloak's admin console. Using the environment variables provided above a default user "admin" was created in the master realm with the password "admin"

![Admin login](/images/blogs/keycloak/admin-console-login.png)



## What Just Happened? 

A run down of what the above accomplished:

1. Spun up a docker container with Postgres 16.2 running
2. Running docker-compose will load the `.env` to make the declared environment variables available.
3. Created a new Postgres DB with the name `kc` and user & password of `kc` (Using the aforementioned environment variables)
4. Set the Postgres container to always restart if it encounters an error and fatally dies
5. Import and run Keycloak 24.0.3 in a docker container using the above-mentioned Postgres database
6. Load the `.env` file in order for Keycloak use the environment variables for [configuration](https://www.keycloak.org/server/configuration#_formats_for_configuration)
7. Explicitly mapped the ports `8080` and `8443`. These are the default container ports, but common for local development. Feel free to change them to suite your needs. e.g. `8081:8080` would make Keycloak available via http://localhost:8081 instead
8. If all went well, both services should be running and make a local instance of Keycloak available

## Some Notes 

This instance of Keycloak was started using the `start-dev` option when starting the server. This approach, as indicated by the command, is a more developer-friendly method for getting started quickly. Some default configurations for start-dev are: 
- HTTP is enabled (HTTPS is available, but not required)
- Strict hostname matching is disabled
- Theme-caching and template-caching are disabled 

## Go Forth and Profit

Keycloak is favored in the IAM world for being open source, robust, and easy to deploy (Among many, many other things). For more explore the official [Keycloak guides](https://www.keycloak.org/guides). Happy identifying and authenticating my friends.