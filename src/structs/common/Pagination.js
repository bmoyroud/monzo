const { object, number, max, string, optional } = require("superstruct");

const Pagination = object({
  // TODO: add minimum 0?
  limit: optional(max(number(), 100)),
  since: optional(string()),
  before: optional(string()),
});

module.exports = Pagination;
