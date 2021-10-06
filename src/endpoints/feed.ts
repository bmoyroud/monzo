import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { FeedItem } from "../structs/feed";
import { buildFeedUrl } from "../helpers/urls";
import { encodeData } from "../helpers/http";
import { EmptyRes } from "../types/monzo-api";

class FeedEndpoint extends Endpoint {
  create(args: FeedItem) {
    assert(args, FeedItem);

    const endpointUrl = buildFeedUrl();

    const formattedData = encodeData(args);

    return this.client.post<void, EmptyRes>(endpointUrl, formattedData);
  }
}

export default FeedEndpoint;
