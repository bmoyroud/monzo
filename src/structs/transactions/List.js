const { object, string, optional } = require("superstruct");

const List = object({
  account_id: string(),
  // TODO: add RFC3339 encoded timestamp validation
  since: optional(string()),
  before: optional(string()),
  // TODO: add pagination
});

module.exports = List;
