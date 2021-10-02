import { assert, Infer } from "superstruct";
import Endpoint from "./endpoint";
import FeedItem from "../structs/feed/FeedItem";
import { buildFeedUrl } from "../utils/urls";
import { encodeData } from "../utils/http";

class FeedEndpoint extends Endpoint {
  create(args: Infer<typeof FeedItem>) {
    assert(args, FeedItem);

    const endpointUrl = buildFeedUrl();

    const formattedData = encodeData(args);

    return this.client.post<void, {}>(endpointUrl, formattedData);
  }
}

export default FeedEndpoint;
