const { object, string } = require("superstruct");

const Create = object({ account_id: string(), url: string() });

module.exports = Create;
