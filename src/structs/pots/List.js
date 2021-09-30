const { object, string, optional } = require("superstruct");
const Pagination = require("../common/Pagination");

const List = object({
  current_account_id: string(),
  pagination: optional(Pagination),
});

module.exports = List;
