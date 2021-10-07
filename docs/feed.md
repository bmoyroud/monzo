# Feed

[/feed](https://docs.monzo.com/#feed-items)

The Monzo app is organised around the feed – a reverse-chronological stream of events. Transactions are one such feed item, and your application can create its own feed items to surface relevant information to the user.

It’s important to keep a few principals in mind when creating feed items:

1. Feed items are discrete events that happen at a point in time.
2. Because of their prominence within the Monzo app, feed items should contain information of high value.
3. While the appearance of feed items can be customised, care should be taken to match the style of the Monzo app so that your feed items feel part of the experience.

## `.create(accountId, feedItem)`

Creates a new feed item on the user’s feed. These can be dismissed.

| Name              | Required | Type    | Description                                           |
| ----------------- | -------- | ------- | ----------------------------------------------------- |
| `accountId`       | yes      | string  |
| `feedItem.type`   | yes      | 'basic' | Type of feed item. Currently only basic is supported. |
| `feedItem.params` | yes      | object  | A map of parameters which vary based on type.         |

See Monzo [docs](https://docs.monzo.com/#create-feed-item) for possible arguments.

## Examples

### Create a feed item

```javascript
const imageURL =
  "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG";

await monzo.feed.create({
  account_id: accountId,
  type: "basic",
  params: {
    title: "feed item title",
    image_url: imageURL,
  },
});
```

TODO: explain what superstruct validates?
