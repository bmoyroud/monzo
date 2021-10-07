# Auth

## Getting an access token

1. Go to [developers.monzo.com](https://developers.monzo.com/).
2. Click on **Sign in with your Monzo account**.
3. Click on **Continue to login**.
4. Enter the email address you use to sign into Monzo.
5. Click on **Grant access**.
6. Check your emails for an email from Monzo 'Log in to Monzo (Don't forward this)'.
7. Click magic link. You will be redirected to the [API Playground](https://developers.monzo.com/api/playground).
8. Open the Monzo app and allow access by clicking notification at top of feed.
9. You'll find the access token below the user id and account id.

> If you do not allow access, using the token from the API playground will result in a `403` error ('Access forbidden due to insufficient permissions').

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
