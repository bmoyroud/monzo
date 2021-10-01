const { object, string } = require("superstruct");

const AccountId = object({
  account_id: string(),
});

module.exports = AccountId;
