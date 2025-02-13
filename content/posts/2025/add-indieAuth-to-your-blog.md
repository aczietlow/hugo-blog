---
title: "Add IndieAuth to Your Website" # Title of the blog post.
date: 2025-02-12T17:51:48-05:00 # Date of post creation.
description: "Enabling IndieAuth to your website" # Description used for search engine.
# featureImage: "/images/path/file.jpg" # Sets featured image on blog post.
# thumbnail: "/images/path/thumbnail.png" # Sets thumbnail image appearing inside card on homepage.
codeLineNumbers: false # Override global value for showing of line numbers within code block.
categories:
  - IndieWeb
tags:
  - IndieWeb
  - authentication
  - IndieAuth
---

## IndieAuth

IndieAuth is built upon OAuth 2.0 and OpenID. Authenticating via the IndieWeb requires your **website** URL as your Id. To obtain authorization you will be directed to your chosen IndieAuth server (OAuth provider). The IndieAuth Server can be self hosted, or rely on a hosted option such as [indieauth.com](https://indieauth.com) 

Why not use not just use OIDC? In short b/c it relies on more centralized solutions such as social login providers or managed IDP services by companies like Okta 

### The Setup

#### 1. Identify Yourself on your website

IndieWeb as a whole relies on microformats to provide additional context about html. Building upon that we must leverage the `rel="me"` [spec](https://microformats.org/wiki/rel-me) do state "who" you are for IndieAuth to be successful. Don't worry too much about this, all this means is to add the following html:

```html
<a href="https://github.com/aczietlow" rel="me">@Github</a>
<!-- Alternatively you can use link tag if you don't want the link to be a visible element -->
<link href="https://github.com/aczietlow" rel="me">
```
#### 2. Link back to your website

Then in Github, or Twitter - have a link back to your website (by setting it in the profile)


![Github Profile](../../../images/blogs/2025/indieweb/github-profile.png)

The Github profile markup

```html
<a rel="me" href="https://zietlow.io/">https://zietlow.io/</a>
```

Supported options for identifying yourself will vary by the auth server. indieauth.com supports 
- github
- twitter
- email(buggy)
- PGP keys

With email and PGP key signing, instead of challenging via a link back, the user will be presented with another prompt.

### Go Forth and Test

Confirm with either [indieauth (depreciated)](https://indieauth.com/) or [indielogin](https://indielogin.com/)

After successfully setting up indieAuth with your website, head on over to join the [community](https://indieweb.org/chat-names) and [conversation](https://chat.indieweb.org/) - you'll now be able to log into the Indieweb site, and anything else that implements IndieAuth!
