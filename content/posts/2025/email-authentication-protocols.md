---
title: "Email Authentication Policies"
date: 2025-01-29 
description: "a brief look at email authentication protocls" 
tags:
  - blogumentation
  - email
---

## Problem 

I'm a manager of a team that maintains a large scale CIAM solution. One of the many things that the  platform does is allow users to preform account actions via email, such as reseting password, or performing email verification. We received a heads up from our infosec team that there would be changes to our company's DMARC policy, and that we should ensure that our emails are able to pass before those chagnes go live. To translate that into impact of our users, if we failed to pass DMARC checks once the changes were live, there was a risk that our users would be unable to receive official emails from us.

## Context

Quickly let's look at what all this involves 

### DMARC

TL;DR - specifies which mail servers are allowed to send emails on behalf of a domain. [RFC-7489](https://datatracker.ietf.org/doc/html/rfc7489)



### DKIM

### SPF

