const { object, optional, enums } = require("superstruct");

const AccountType = optional(
  object({
    // TODO: add list of valid account types to constants?
    account_type: enums(["uk_prepaid", "uk_retail", "uk_retail_joint"]),
  })
);

module.exports = AccountType;
