const { object, string, optional } = require("superstruct");
const Pagination = require("../common/Pagination");

const List = object({
  account_id: string(),
  pagination: optional(Pagination),
});

module.exports = List;
