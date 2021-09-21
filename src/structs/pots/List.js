const { object, string } = require("superstruct");

const List = object({
  current_account_id: string(),
});

module.exports = List;
