# Kingdom Finder API

> A different take on search for rented apartments. Tell us about yourself,
> and we'll show you where the best neighborhood is you should live in.
> Based on places you visit often, communities, fashion trends, political
> alignment,.

## Run with Docker

When you run this as a Docker container, make sure
you link a Mongo database `mongodb` and expose the
port `8001`.

```bash
$ docker run -d -p 80:8001 --link mongo-instance:mongodb diversum/kingdom-api
```
