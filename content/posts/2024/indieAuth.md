---
title: "IndieAuth" # Title of the blog post.
date: 2024-05-01
description: "Allowing a site to be discoverable through a ring" # Description used for search engine.
draft: true
featureImage: "/images/path/file.jpg" # Sets featured image on blog post.
thumbnail: "/images/path/thumbnail.png" # Sets thumbnail image appearing inside card on homepage.
categories:
  - IndieWeb
tags:
  - IndieWeb
  - authentication
  - IndieAuth
d# comment: false # Disable comment if false.
---

Suppose you want to authenticate with an application for <insert examples here>. 

IndieAuth is an extension of OAuth 2.0. It's implementation differs from OIDC or other common OAuth Authorization Code Flows in that IndieAuth requires using your URL as your identifier, rather than relying on a social provider to manage your id, or require maintaining a self-hosted IAM solution. 

Below is an example if you wanted to use a micropub client app for <insert reasons>

```mermaid
sequenceDiagram

Actor User
participant Client App
participant Website
box rgb(56, 58, 58) IndieAuth ServerMetadata URL
participant Metadata URL
participant Authorization Endpoint
participant Token Endpoint 
end
User->>Client App: Request Resource Access
Client App->>User: Login with URL
Client App->>Website: Discovery Request
Website->>Client App: Respond with Metadata URL
Client App->>Metadata URL: Request OAuth Authorization Metadata
Metadata URL->>Client App: Respond with OAuth Metadata
Client App-->>User: Builds authentication Request 
User->>Authorization Endpoint: Via browser, User visits authorization endpoint & sees the authorization request
Authorization Endpoint->>Client App: Requests Client Information e.g. name, image
Client App->>Authorization Endpoint: Client App responds with requested information
Authorization Endpoint-->>User: User authenticates with the authorization endpoint. The authorization endpoint issues authorization code & builds redirect back to client
User->>Client App: User browser redirects to client app with authorization code
Client App->>Token Endpoint: Client exchanges the authorization code for an access token
Token Endpoint-->>Client App: Token endpoint verifies authorization code & returns canonical URL AND access token
Client App->>Website: Verify User Identity via URL and authorization server to validate token
Website->>Client App: Return Canonical Profile URL and authorization server metadata
Client App-->>User: Client initiates login & user is logged in successfully
```

