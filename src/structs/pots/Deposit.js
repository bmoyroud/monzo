const { object, string, number } = require("superstruct");

const Deposit = object({
  pot_id: string(),
  source_account_id: string(),
  amount: number(),
  dedupe_id: string(),
});

module.exports = Deposit;
