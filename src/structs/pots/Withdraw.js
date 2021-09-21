const { object, string, number } = require("superstruct");

const Withdraw = object({
  pot_id: string(),
  destination_account_id: string(),
  amount: number(),
  dedupe_id: string(),
});

module.exports = Withdraw;
