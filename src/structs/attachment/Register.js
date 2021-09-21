const { object, string } = require("superstruct");

const Register = object({
  external_id: string(),
  // TODO: add url validation using pattern?
  file_url: string(),
  // TODO: add enum of accepted types
  file_type: string(),
});

module.exports = Register;
