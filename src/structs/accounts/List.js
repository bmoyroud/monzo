const { object, optional, enums, assign } = require("superstruct");
const Pagination = require("../common/Pagination");

const AccountType = object({
  // TODO: add list of valid account types to constants?
  account_type: optional(enums(["uk_prepaid", "uk_retail", "uk_retail_joint"])),
});

const List = optional(assign(AccountType, Pagination));

module.exports = List;
