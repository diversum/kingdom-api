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

## Environment variables

Don't forget to provide these environment variables:

|name||default|description|
|--|--|--|--|
|`HOMEGATE_API_BASE`|*mandatory*|https://api-2445581357976.apicast.io:443|The Homegate API base url|
|`HOMEGATE_AUTH`|*mandatory*|f5c7eb019fb2db2687a960dbb2bec5bf|The Homegate auth key|
|`HOMEGATE_REFRESH_RATE`|*optional*|3480|The interval in which the flats cache is re-fetched|
