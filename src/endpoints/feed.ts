import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { Id } from "../structs/common";

import { FeedItem } from "../structs/feed";
import { buildFeedUrl } from "../helpers/urls";
import { encodeData } from "../helpers/http";
import { EmptyRes } from "../types/monzo-api";

class FeedEndpoint extends Endpoint {
  create(accountId: Id, feedItem: FeedItem) {
    assert(accountId, Id);
    assert(feedItem, FeedItem);

    const endpointUrl = buildFeedUrl();

    const args = { account_id: accountId, ...feedItem };
    const formattedData = encodeData(args);

    return this.client.post<void, EmptyRes>(endpointUrl, formattedData);
  }
}

export default FeedEndpoint;
