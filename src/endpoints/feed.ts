import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import FeedItem from "../structs/feed/FeedItem";
import { buildFeedUrl } from "../utils/urls";
import { encodeData } from "../utils/http";

export default (client: AxiosInstance) => {
  return {
    create: (params: Infer<typeof FeedItem>) => {
      assert(params, FeedItem);

      const endpointUrl = buildFeedUrl();

      const formattedData = encodeData(params);

      return client.post<void, any>(endpointUrl, formattedData);
    },
  };
};
