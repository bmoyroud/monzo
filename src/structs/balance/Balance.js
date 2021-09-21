const { object, string } = require("superstruct");

const Balance = object({
  account_id: string(),
});

module.exports = Balance;
