---
title: "Go Indieauth Client"
date: 2024-09-04T19:17:53-04:00
tags: [
  "go",
  "IndieWeb",
  "IndieAuth",
]
teaser: "A Proof of Concept Indie Auth Client Playground"
codeLineNumbers: true
thumbnail: "images/projects/indieauth-logo.png"
thumbnail_byline: "IndieAuth Logo Color" # Sets a byline under the thumbnail image
source: https://github.com/aczietlow/go-indieauth-client
license: MIT
activity: 2024-09-04
---

## Introduction

What started as small bug when attempting a Web Sign-In, quickly rabbit holed into attempting to craft an IndieAuth playground for testing Web Sign-In.

[Demo](https://indie-auth.zietlow.cloud)

## About the Project

After spending some time on the forums and reading through the documentation, I remained somewhat lost. I identify as someone that learns best by throwing things against a wall to see what will stick. What I found missing was something akin to [Google's OAuth Playground](https://developers.google.com/oauthplayground/). 

[IndieAuth.com](https://IndieAuth.com/setup) and [Indielogin.com](https://indielogin.com) both provide Web Sign-in to validate that a website is correctly configured to use a provider. What I wanted was much more in depth feedback on how the process worked. To give credit to [aatonpk](https://aaronparecki.com/) there is documentation, and a beautifully crafted [IndieAuth Spec](https://indieauth.spec.indieweb.org/). Really, shout out to [aatonpk](https://aaronparecki.com/) for all you do for IndieWeb. At the end of the day I just have a cave man brain, and need to see the login flow in action to process it. 

![indieauth-playground.png](../../images/projects/indieauth-client.png)

The project is mostly a raw interpretation of the IndieAuth Spec wrapped in a shiny HTMX and Echo implementation. For example:

> Users are identified by a [URL]. Profile URLs MUST have either an https or http scheme, MUST contain a path component (/ is a valid path), MUST NOT contain single-dot or double-dot path segments, MAY contain a query string component, MUST NOT contain a fragment component, MUST NOT contain a username or password component, and MUST NOT contain a port. Additionally, host names MUST be domain names and MUST NOT be ipv4 or ipv6 addresses.

```go
func validateProfileURL(u *url.URL) error {
	validSchemes := map[string]bool{
		"http":  true,
		"https": true,
	}

	if !validSchemes[u.Scheme] {
		return errors.New("URL MUST use 'http' or 'https' as a valid scheme")
	}

	if u.Hostname() == "" {
		return errors.New("no Hostname provided")
	}

	if u.Fragment != "" {
		return errors.New("URLs MUST NOT contain a fragment")
	}

	if u.User.String() != "" {
		return errors.New("URLs MUST NOT contain a username and password")
	}

	if u.Port() != "" {
		if u.Hostname() != "localhost" {
			return errors.New("URLs MUST NOT contain a port")
		}
	}

	if net.ParseIP(u.Hostname()) != nil {
		return errors.New("hostnames MUST be domains, and MUST NOT by ipv4 or ipv6 addresses")
	}

	return nil
}
```

The go indieAuth client library package walked the user through the Web Sign-In process. Providing feedback and documentation along the route of discovery, authorization, and token verification. Upon successfully completing the sign, the user will be granted an access token, which is set via a cookie. With this token the user will be granted access to the super secret area of the sandbox site.

## Future Plans

I hope to expand on the functionality of this in the future, by implementing some optional features of the spec, like the using of metadata wellknown endpoints during discovery, and allow composable scopes. I also hope to come back to add a middleware layer to the API, to sanitize and expose the API calls between client and authorization server, adding even more discoverability of IndieAuth to the end user.

I should probably check back to see if my bug is resolvable after a Bethesda grade side quest.
