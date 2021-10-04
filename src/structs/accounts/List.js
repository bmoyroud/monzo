const { object, optional, enums, assign } = require("superstruct");
const { Pagination } = require("../common/Pagination");

// TODO: add list of valid account types to constants?
const Type = enums(["uk_prepaid", "uk_retail", "uk_retail_joint"]);

const AccountType = object({
  account_type: optional(Type),
});

const List = optional(assign(AccountType, Pagination));

module.exports = List;
