const { object, optional, enums } = require("superstruct");
const Pagination = require("../common/Pagination");

const List = optional(
  object({
    // TODO: add list of valid account types to constants?
    account_type: optional(
      enums(["uk_prepaid", "uk_retail", "uk_retail_joint"])
    ),
    pagination: optional(Pagination),
  })
);

module.exports = List;
