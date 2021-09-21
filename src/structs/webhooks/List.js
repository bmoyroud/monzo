const { object, string } = require("superstruct");

const List = object({ account_id: string() });

module.exports = List;
