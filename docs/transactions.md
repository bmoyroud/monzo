# Transactions

[/transactions](https://docs.monzo.com/#transactions)

Transactions are movements of funds into or out of an account.

Negative transactions represent debits (ie. spending money) and positive transactions represent credits (ie. receiving money).

## `.retrieve(transactionId, opts?)`

Returns an individual transaction, fetched by its id.

| Name                  | Required | Type    | Description                                       |
| --------------------- | -------- | ------- | ------------------------------------------------- |
| `transactionId`       | yes      | string  |
| `opts.expandMerchant` | no       | boolean | get more details about merchant (not just its id) |

## `.list(accountId, opts?)`

Returns a list of transactions on the user’s account.

| Name                  | Required | Type                       | Description                                                           |
| --------------------- | -------- | -------------------------- | --------------------------------------------------------------------- |
| `accountId`           | yes      | string                     |
| `opts.expandMerchant` | no       | boolean                    | get more details about merchant (not just its id) - defaults to false |
| `opts.limit`          | no       | positive integer           |
| `opts.since`          | no       | RFC 3339-encoded timestamp |
| `opts.before`         | no       | RFC 3339-encoded timestamp |

TODO: add not explaining the pagination is handled by the API

TODO: add note about last 90 days

TODO: add note about Monzo.utils.last90days

TODO: add default column for docs?

## `.annotate(transactionId, annotations)`

Store your own key-value annotations against a transaction in its metadata.

Returns updated transaction.

| Name            | Required | Type   |
| --------------- | -------- | ------ |
| `transactionId` | yes      | string |
| `annotations`   | no       | object |

TODO: explain that it is not working - see Monzo forum and Github
TODO: explain how to update notes

## Examples

### Get transaction by id

```javascript
const transactionId = "tx_id";
const transaction = await monzo.transactions.retrieve(transactionId);
```

### Get transaction by id (expanded merchant info)

```javascript
const transactionId = "tx_id";
const transaction = await monzo.transactions.retrieve(transactionId, {
  expandMerchant: true,
});
```

### Get all transactions

```javascript
// note: this only works in the first 5 minutes after a user has authenticated
const transactions = await monzo.transactions.list(accountId);
```

### Get transactions from last 90 days

```javascript
const timestamp = Monzo.utils.last90Days();
const transactions = await monzo.transactions.list(accountId, {
  since: timestamp,
});
```

TODO: add note about formatTransaction helper

### Get last 20 transactions from last 90 days

```javascript
const timestamp = Monzo.utils.last90Days();
const transactions = await monzo.transactions.list(accountId, {
  since: timestamp,
  limit: 20,
});
```

### Get top-ups

Top-ups to an account are represented as transactions with a positive amount and `is_load = true`.

```javascript
const transactions = await monzo.transactions.list(accountId);
const topUps = transactions.filter((tx) => tx.amount > 0 && tx.is_load);
```

### Get declined transactions

`decline_reason` is only present on declined transactions.

```javascript
const transactions = await monzo.transactions.list(accountId);
const declined = transactions.filter((tx) => tx.decline_reason);
```

### Get authorised (not yet settled) transactions

If `settled` is an empty string, the transaction is authorised but not yet "complete".
Add `amount_is_pending = true` to filter out temporary holds.

```javascript
const transactions = await monzo.transactions.list(accountId);
const authorised = transactions.filter(
  (tx) => tx.settled === "" && tx.amount_is_pending
);
```

### Get settled transactions

```javascript
const transactions = await monzo.transactions.list(accountId);
const settled = transactions.filter((tx) => tx.settled);
```

### Get transactions from 'entertainment' category

```javascript
const transactions = await monzo.transactions.list(accountId);
const settled = transactions.filter((tx) => tx.category === "entertainment");
```

### Annotate transaction

```javascript
// note: currently only works with notes key
const transactionAfterAnnotation = await monzo.transactions.annotate(
  transactionId,
  {
    notes: "updated note!",
  }
);
```
