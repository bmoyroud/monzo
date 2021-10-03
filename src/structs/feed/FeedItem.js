const { object, string, enums, optional } = require("superstruct");
const URL = require("../common/URL");

const BasicFeedItem = object({
  // TODO: add max length?
  title: string(),
  image_url: URL,
  body: optional(string()),
  // TODO: add regex to validate hex color?
  background_color: optional(string()),
  title_color: optional(string()),
  body_color: optional(string()),
});

const FeedItem = object({
  account_id: string(),
  // TODO: default to basic
  // TODO: add list of valid feed types to constants?
  type: enums(["basic"]),
  // TODO: add function to choose struct based on type
  params: BasicFeedItem,
  url: optional(URL),
});

module.exports = FeedItem;
