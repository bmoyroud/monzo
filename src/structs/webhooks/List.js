const { object, string } = require("superstruct");
const Pagination = require("../common/Pagination");

const List = object({
  account_id: string(),
  pagination: Pagination,
});

module.exports = List;
