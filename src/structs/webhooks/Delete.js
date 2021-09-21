const { object, string } = require("superstruct");

const Delete = object({ webhook_id: string() });

module.exports = Delete;
