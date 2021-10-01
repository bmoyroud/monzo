const {
  object,
  number,
  max,
  string,
  optional,
  assign,
} = require("superstruct");

const CursorBasedPagination = object({
  // TODO: add minimum 0?
  limit: optional(max(number(), 100)),
});

const TimeBasedPagination = object({
  // TODO: add RFC3339 encoded timestamp validation for since and before
  // this would avoid throwing errors when calling new Date()?
  since: optional(string()),
  before: optional(string()),
});

const Pagination = assign(CursorBasedPagination, TimeBasedPagination);

module.exports = { CursorBasedPagination, Pagination };
