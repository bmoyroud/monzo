# Auth

[/ping/whoami](https://docs.monzo.com/#authenticating-requests)

## `.whoAmI()`

To get information about an access token, you can call the `/ping/whoami` endpoint.

## Examples

### Get info about access token

```javascript
const info = await monzo.auth.whoAmI();
```

TODO: add OAuth support
TODO: run a local server if we need to get token?
