Netlify ignores files that have a . at the beginning of the file name. As a work around, we're duplicating the .well-known directory and creating a redirect rule on within netlify.


le sigh...

```
/.well_known/*  /well_known/:splat 200
```