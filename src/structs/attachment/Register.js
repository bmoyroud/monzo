const { object, string } = require("superstruct");
const URL = require("../common/URL");

const Register = object({
  external_id: string(),
  file_url: URL,
  // TODO: add enum of accepted types
  file_type: string(),
});

module.exports = Register;
