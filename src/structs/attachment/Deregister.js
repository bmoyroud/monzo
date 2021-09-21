const { object, string } = require("superstruct");

const Deregister = object({
  id: string(),
});

module.exports = Deregister;
