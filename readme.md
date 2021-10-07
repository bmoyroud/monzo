# Monzo

- TypeScript support
- Full code coverage
- Promise based

### Installation

`npm i power-monzo`

### Usage

```javascript
// CommonJS
const Monzo = require("package-name");

// ES6
import { Monzo } from "package-name";

const monzo = new Monzo(accessToken);
```

## Functions

The SDK closely follows Monzo's public API detailed at [docs.monzo.com](https://docs.monzo.com/).

### /ping/whoami

- `auth.whoAmI()`

### /accounts

- [`accounts.list()`](./examples/accounts.md)

### /balance

- `balance.read()`

### /pots

- `pots.list()`
- `pots.deposit()`
- `pots.withdraw()`

### /transactions

- `transactions.retrieve()`
- `transactions.list()`
- `transactions.annotate()`

### /feed

- `feed.create()`

### /attachment

- `attachments.upload()`
- `attachments.register()`
- `attachments.deregister()`

### /transaction-receipts

- `receipts.save()`
- `receipts.retrieve()`
- `receipts.delete()`

### /webhooks

<!-- TODO: rename .create()? -->

- `webhooks.register()`
- `webhooks.list()`
- `webhooks.delete()`

## Key differences

### Helper functions

The SDK provides 1 additional helper function `webhooks.deleteAll()`.

### Pagination

The Monzo API only adds pagination to the `/transactions` endpoint (`transactions.list()`).

The SDK adds pagination to:

- `accounts.list()` (time and cursor based)
- `pots.list()` (time and cursor based)
- `webhooks.list()` (time based)

More details at [pagination.md](pagination.md).

### Validation

`power-monzo` adds compile-time validation thanks to TypeScript and run-time validation thanks to Superstruct.

### Utils

- `Monzo.utils.last90days()`
- `Monzo.utils.formatTransaction()`
- `Monzo.utils.id()`

### Removal top level property

`.transactions`, `.accounts`, `.pots` => top level property is removed

3. current_account_id for /pots is renamed account_id for consistency with /transactions, /webhooks

4. retrieve(id) for accounts, pots, webhooks returns undefined not a 404 / transaction_not_found like for list

TODO: if we do not add retrieve, at least add example?

## Helper functions

### /accounts

- `accounts.retrieve(id)` ADD?

- `accounts.open()` DOCS
- `accounts.closed()` DOCS

- `accounts.prepaid()` DOCS
- `accounts.current()`DOCS
- `accounts.joint()` DOCS

### /balance

- `balance.spentToday()`

### /pots

- `pots.retrieve(id)` TODO
  Equivalent to calling pots.list() and filtering based on id.

TODO: if none found, imitate behaviour of transactions.retrieve!
TODO: do same for accounts?

- `pots.list.open()` DOCS
- `pots.list.closed()` DOCS
- `pots.list.locked()` DOCS

IMPORTANT: pots cannot be created or deleted via public API.

### /transactions

- `transactions.list()`
  By default, if you ask for all transactions 5 mins after obtaining the token, you will get an error if including transactions not in the last 90 days.

The SDK enables you to get the last 90 days of transactions.

- `transactions.list.declined()` DOCS
- `transactions.list.topUps()` DOCS
- `transactions.list.settled()` DOCS
- `transactions.list.category()` DOCS
- `transactions.annotate.notes()` DOCS

### /attachment

- `attachments.deregisterAll(transactionId)`

### /webhooks

- `webhooks.retrieve()` ADD?
- `webhooks.deleteAll()` DONE
  equivalent to calling `webhooks.list()` then `webhook.delete()` on each
  calls are sequential

## Folder structure

### `docs`

### `examples`

### `src/constants`

### `src/endpoints`

### `src/structs`

Types for API request args.

### `src/types`

Types for API response.

### `src/utils`

different types for Receipt Merchant and Transaction Merchant

superstruct is used to validate request args

with our own pagination, ensure limit takes last x results not first x results!!

TODO: very important to mirror behaviour that transactions does

TODO: add return type in docs

TODO: use async for all methods?

TODO: ensure imports work and we do not have to do .default

TODO: ensure automatic import is possible

TODO: add tests

TODO: add code coverage

TODO: add badges
