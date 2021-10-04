const {
  object,
  string,
  enums,
  optional,
  pattern,
  dynamic,
} = require("superstruct");
const URL = require("../common/URL");

const HexColor = pattern(string(), /^#(?:[0-9a-fA-F]{3}){1,2}$/);

const FeedItemType = enums(["basic"]);

const BasicFeedItemParams = object({
  title: string(),
  image_url: URL,
  body: optional(string()),
  background_color: optional(HexColor),
  title_color: optional(HexColor),
  body_color: optional(HexColor),
});

// @ts-ignore
function chooseParams(type) {
  console.log(type);
  switch (type) {
    case "basic": {
      return BasicFeedItemParams;
    }

    default:
      throw new Error("Only basic type allowed for feed item.");
  }
}

const FeedItemsParams = dynamic((value, ctx) => {
  const parent = ctx.branch[0];
  const { type } = parent;
  return chooseParams(type);
});

const FeedItem = object({
  account_id: string(),
  // TODO: default to basic
  // TODO: add list of valid feed types to constants?
  type: FeedItemType,
  params: FeedItemsParams,
  url: optional(URL),
});

module.exports = FeedItem;
