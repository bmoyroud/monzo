const { object, string } = require("superstruct");
const URL = require("../common/URL");

const Create = object({
  account_id: string(),
  url: URL,
});

module.exports = Create;
