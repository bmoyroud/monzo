const { object, string, boolean, optional } = require("superstruct");

const Retrieve = object({
  transaction_id: string(),
  // TODO: rename to something else?
  // TODO: default to false
  expand_merchant: optional(boolean()),
});

module.exports = Retrieve;
