# Accounts

[/balance](https://docs.monzo.com/#balance)

Retrieve information about an account’s balance.

## `.retrieve(accountId)`

Returns balance information for a specific account.

| Name        | Required | Type   | Description            |
| ----------- | -------- | ------ | ---------------------- |
| `accountId` | yes      | string | The id of the account. |

## Examples

### Get balance info

```javascript
const balanceInfo = await monzo.balance.retrieve(accountId);
```

### Get amount spent today

```javascript
const balanceInfo = await monzo.balance.retrieve(accountId);
const spentToday = balanceInfo.spend_today;
```
