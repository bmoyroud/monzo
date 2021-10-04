const { object, optional, enums, assign } = require("superstruct");
const { accountTypes } = require("../../constants/types");
const { Pagination } = require("../common/Pagination");

const Type = enums(accountTypes);

const AccountType = object({
  account_type: optional(Type),
});

const List = optional(assign(AccountType, Pagination));

module.exports = List;
