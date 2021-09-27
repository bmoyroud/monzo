import { AxiosInstance } from "axios";
import { assert } from "superstruct";
import FeedItem from "../structs/feed/FeedItem";
import { buildFeedUrl } from "../utils/urls";
import { encodeData } from "../utils/http";

export default (client: AxiosInstance) => {
  return {
    create: (params: object) => {
      assert(params, FeedItem);

      const endpointUrl = buildFeedUrl();

      const formattedData = encodeData(params);

      return client.post(endpointUrl, formattedData);
    },
  };
};
