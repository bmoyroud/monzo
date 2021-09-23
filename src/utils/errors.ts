const {
  INVALID_ACCOUNT_TYPE,
  INVALID_FEED_ITEM_TYPE,
} = require("../constants/errors");

const commaSeparateTypes = (types) => types.join(", ");

module.exports = {
  buildError: (message) => new Error(message),
  buildInvalidAccountTypeError: (accountTypes) =>
    `${INVALID_ACCOUNT_TYPE} (${commaSeparateTypes(accountTypes)}).`,
  buildInvalidFeedItemTypeError: (feedItemTypes) =>
    `${INVALID_FEED_ITEM_TYPE} (${commaSeparateTypes(feedItemTypes)}).`,
};
