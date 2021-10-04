import { object, string, enums, optional, dynamic } from "superstruct";
import { URL, HexColor } from "./common/refinements";
import { feedItemTypes } from "../constants/types";

const FeedItemType = enums(feedItemTypes);

const BasicFeedItemParams = object({
  title: string(),
  image_url: URL,
  body: optional(string()),
  background_color: optional(HexColor),
  title_color: optional(HexColor),
  body_color: optional(HexColor),
});

function chooseParams(type: string) {
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

export const FeedItem = object({
  account_id: string(),
  type: FeedItemType,
  params: FeedItemsParams,
  url: optional(URL),
});
