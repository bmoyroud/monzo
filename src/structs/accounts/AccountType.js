const { object, optional, enums } = require("superstruct");

const AccountType = object({
  // TODO: add list of valid account types to constants?
  account_type: optional(enums(["uk_prepaid", "uk_retail", "uk_retail_joint"])),
});

module.exports = AccountType;
