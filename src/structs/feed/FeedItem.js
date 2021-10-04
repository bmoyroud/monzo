const { object, string, enums, optional, pattern } = require("superstruct");
const URL = require("../common/URL");

const HexColor = pattern(string(), /^#(?:[0-9a-fA-F]{3}){1,2}$/);

const BasicFeedItem = object({
  title: string(),
  image_url: URL,
  body: optional(string()),
  background_color: optional(HexColor),
  title_color: optional(HexColor),
  body_color: optional(HexColor),
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
