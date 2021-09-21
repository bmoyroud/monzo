const { object, string } = require("superstruct");

const ExternalId = object({
  external_id: string(),
});

module.exports = ExternalId;
