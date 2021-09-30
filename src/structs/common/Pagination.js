const { object, number, max, string } = require("superstruct");

const Pagination = object({
  // TODO: add minimum 0?
  limit: max(number(), 100),
  since: string(),
  before: string(),
});

module.exports = Pagination;
