# Accounts

[/accounts](https://docs.monzo.com/#accounts)

Accounts represent a store of funds, and have a list of transactions.

## `.list(args?)`

Returns a list of accounts owned by the currently authorised user.

| Name                | Required | Type                                       | Description            |
| ------------------- | -------- | ------------------------------------------ | ---------------------- |
| `args.account_type` | no       | uk_prepaid \| uk_retail \| uk_retail_joint | filter by account type |
| `args.limit`        | no       | positive integer                           | limit results          |
| `args.since`        | no       | RFC 3339-encoded timestamp                 |                        |
| `args.before`       | no       | RFC 3339-encoded timestamp                 |                        |

### Pagination

The SDK adds time-based and cursor-based pagination to this endpoint.
See pagination.md.

## Examples

### All accounts

```javascript
const accounts = await monzo.accounts.list();
```

### Prepaid account

```javascript
const prepaidAccounts = await monzo.accounts.list({
  account_type: "uk_prepaid",
});
const prepaidAccount = prepaidAccounts[0];
```

### Current account

```javascript
const currentAccounts = await monzo.accounts.list({
  account_type: "uk_retail",
});
const currentAccount = currentAccounts[0];
```

### Joint account

```javascript
const jointAccounts = await monzo.accounts.list({
  account_type: "uk_retail_joint",
});
const jointAccount = jointAccounts[0];
```

### Accounts created since 2017

```javascript
const t1 = "2017-01-01T00:00:00.00Z";
const accountsSince = await monzo.accounts.list({ since: t1 });
```

### Accounts created before 2019

```javascript
const t2 = "2019-01-01T00:00:00.00Z";
const accountsBefore = await monzo.accounts.list({ before: t2 });
```

### Accounts created between 2017 and 2019

```javascript
const t1 = "2017-01-01T00:00:00.00Z";
const t2 = "2019-01-01T00:00:00.00Z";
const accountsBetween = await monzo.accounts.list({
  since: t1,
  before: t2,
});
```

### Return 1 account

```javascript
const accountsLimit = await monzo.accounts.list({ limit: 1 });
```

### Open accounts

```javascript
const accounts = await monzo.accounts.list();
const openAccounts = accounts.filter((acc) => !acc.closed);
```

### Closed accounts

```javascript
const accounts = await monzo.accounts.list();
const closedAccounts = accounts.filter((acc) => acc.closed);
```
