import { object, string, enums, optional, dynamic } from "superstruct";
import { Id } from "./common/id";
import { URL, HexColor } from "./common/refinements";
import { feedItems } from "../constants/types";

const FeedItemType = enums(feedItems);

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
  account_id: Id,
  type: FeedItemType,
  params: FeedItemsParams,
  url: optional(URL),
});
