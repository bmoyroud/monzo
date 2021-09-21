const { object, string } = require("superstruct");

const Annotate = object({
  transaction_id: string(),
  // TODO: do not check anything
  annotations: object(),
});

module.exports = Annotate;
