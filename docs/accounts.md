# Accounts

- /accounts (list)

## `.list()`

| Name           | Required | Type                                       | Description            |
| -------------- | -------- | ------------------------------------------ | ---------------------- |
| `account_type` | no       | uk_prepaid \| uk_retail \| uk_retail_joint | filter by account type |

### Pagination

The SDK adds time-based and cursor-based pagination to this endpoint.

```
{
  since: '',
  before: '',
  limit: 1,
}
```
