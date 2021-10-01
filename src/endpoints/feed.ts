import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import FeedItem from "../structs/feed/FeedItem";
import { buildFeedUrl } from "../utils/urls";
import { encodeData } from "../utils/http";

export default (client: AxiosInstance) => {
  return {
    create: (args: Infer<typeof FeedItem>) => {
      assert(args, FeedItem);

      const endpointUrl = buildFeedUrl();

      const formattedData = encodeData(args);

      return client.post<void, {}>(endpointUrl, formattedData);
    },
  };
};
