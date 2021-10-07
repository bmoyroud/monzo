# Webhooks

[/webhooks](https://docs.monzo.com/#webhooks)

Webhooks allow your application to receive real-time, push notification of events in an account.

## `.create(accountId, url)`

Each time a matching event occurs, Monzo will make a POST call to the URL you provide. If the call fails, Monzo will retry up to a maximum of 5 attempts, with exponential backoff.

| Name        | Required | Type   | Description                               |
| ----------- | -------- | ------ | ----------------------------------------- |
| `accountId` | yes      | string | The account to receive notifications for. |
| `url`       | yes      | string | The URL we will send notifications to.    |

## `.list(accountId, pagination?)`

List the webhooks your application has registered on an account.

| Name               | Required | Type    | Description                                  |
| ------------------ | -------- | ------- | -------------------------------------------- |
| `accountId`        | yes      | string  | The account to list registered webhooks for. |
| `pagination.limit` | no       | integer |                                              |

### Pagination

The SDK **only** adds time-based pagination to this endpoint.
See [pagination](pagination.md).

## `.delete(webhookId)`

When you delete a webhook, Monzo will no longer send notifications to it.

| Name        | Required | Type   | Description                      |
| ----------- | -------- | ------ | -------------------------------- |
| `webhookId` | yes      | string | The id of the webhook to delete. |

## `.deleteAll(accountId)` (HELPER)

This is equivalent to calling `monzo.webhooks.list(accountId)` then `monzo.webhooks.delete()` on each webhook in the list.

> The deletion of the webhooks is sequential so this might take a while if you have many webhooks.

| Name        | Required | Type   | Description                      |
| ----------- | -------- | ------ | -------------------------------- |
| `webhookId` | yes      | string | The id of the webhook to delete. |

## Examples

### Create webhook

```javascript
const webhook = await monzo.webhooks.create({
  account_id: accountId,
  url: "https://requestbin.com/r/enn8nks932hpg",
});
```

### Get all webhooks

```javascript
const webhooks = await monzo.webhooks.list(accountId);
```

### Get last 5 webhooks

```javascript
const webhooks = await monzo.webhooks.list(accountId, { limit: 5 });
```

### Delete webhook

```javascript
await monzo.webhooks.delete(webhook.id);
```

### Delete all webhooks

```javascript
await monzo.webhooks.deleteAll(accountId);
```

TODO: rename create to register?

TODO: figure out what events webhook sends? only transaction.created?
TODO: add TS types for transaction.created event
