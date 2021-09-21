const { assert } = require("superstruct");
const FeedItem = require("../structs/feed/FeedItem");
const { buildFeedUrl } = require("../utils/urls");
const { encodeData } = require("../utils/http");

module.exports = (client) => {
  return {
    create: (params) => {
      assert(params, FeedItem);

      const endpointUrl = buildFeedUrl();

      const formattedData = encodeData(params);

      return client.post(endpointUrl, formattedData);
    },
  };
};
