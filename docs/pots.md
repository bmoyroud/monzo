# Pots

[/pots](https://docs.monzo.com/#pots)

A pot is a place to keep some money separate from the main spending account.

## `.list(accountId, pagination?)`

Returns a list of pots owned by the currently authorised user that are associated with the specified account.

| Name                | Required | Type                       |
| ------------------- | -------- | -------------------------- |
| `accountId`         | yes      | string                     |
| `pagination.limit`  | no       | positive integer           |
| `pagination.since`  | no       | RFC 3339-encoded timestamp |
| `pagination.before` | no       | RFC 3339-encoded timestamp |

### Pagination

The SDK adds time-based and cursor-based pagination to this endpoint.
See [pagination](pagination.md).

TODO: add a note about dedupe_id!
TODO: add a note about amount being in minor units

## `.deposit(potId, args)`

Move money from an account owned by the currently authorised user into one of their pots.

| Name                     | Required | Type    | Description                                             |
| ------------------------ | -------- | ------- | ------------------------------------------------------- |
| `potId`                  | yes      | string  | The id of the pot to deposit into.                      |
| `args.dedupe_id`         | yes      | string  | A unique string used to de-duplicate deposits.          |
| `args.amount`            | yes      | integer | The amount to deposit (in minor units of the currency). |
| `args.source_account_id` | yes      | string  | The id of the account to withdraw from.                 |

## `.withdraw(potId, args)`

Move money from a pot owned by the currently authorised user into one of their accounts.

| Name                          | Required | Type    | Description                                              |
| ----------------------------- | -------- | ------- | -------------------------------------------------------- |
| `potId`                       | yes      | string  | The id of the account to deposit into.                   |
| `args.dedupe_id`              | yes      | string  | A unique string used to de-duplicate deposits.           |
| `args.amount`                 | yes      | integer | The amount to withdraw (in minor units of the currency). |
| `args.destination_account_id` | yes      | string  | The id of the pot to withdraw from.                      |

## Examples

### All pots

```javascript
const pots = await monzo.pots.list(accountId);
```

### Pots created since 2017

```javascript
const t1 = "2017-01-01T00:00:00.00Z";
const potsSince = await monzo.pots.list(accountId, { since: t1 });
```

### Pots created before 2019

```javascript
const t2 = "2019-01-01T00:00:00.00Z";
const potsBefore = await monzo.pots.list(accountId, { before: t2 });
```

### Pots created between 2017 and 2019

```javascript
const t1 = "2017-01-01T00:00:00.00Z";
const t2 = "2019-01-01T00:00:00.00Z";
const potsBetween = await monzo.pots.list(accountId, { since: t1, before: t2 });
```

### Return 1 account

```javascript
const potsLimit = await monzo.pots.list(accountId, { limit: 1 });
```

### Open pots

```javascript
const pots = await monzo.pots.list(accountId);
const openPots = pots.filter((pot) => !pot.deleted);
```

### Deleted pots

```javascript
const pots = await monzo.pots.list(accountId);
const closedPots = pots.filter((acc) => pot.deleted);
```

### Locked pots

```javascript
const pots = await monzo.pots.list(accountId);
const lockedPots = pots.filter((pot) => pot.locked);
```

### Deposit into pot

```javascript
const dedupeId = Monzo.utils.id();
const potAfterDeposit = await monzo.pots.deposit(potId, {
  dedupe_id: dedupeId,
  amount: 1,
  source_account_id: accountId,
});
```

### Withdraw from pot

```javascript
const dedupeId = Monzo.utils.id();
const potAfterWithdrawal = await monzo.pots.withdraw(potId, {
  dedupe_id: dedupeId,
  amount: 2,
  destination_account_id: accountId,
});
```
