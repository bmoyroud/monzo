const whoAmI = require("./whoAmI");
const accounts = require("./accounts");
const balance = require("./balance");
const pots = require("./pots");
const transactions = require("./transactions");
const feed = require("./feed");
const attachment = require("./attachment");
const receipts = require("./receipts");
const webhooks = require("./webhooks");

module.exports = {
  whoAmI,
  accounts,
  balance,
  pots,
  transactions,
  feed,
  attachment,
  receipts,
  webhooks,
};
