const {
  MISSING_ACCOUNT_ID,
  MISSING_FEED_ITEM_TYPE,
  MISSING_FEED_PARAMS,
  MISSING_FEED_ITEM_TITLE,
  MISSING_FEED_ITEM_IMAGE_URL,
} = require("../constants/errors");
const {
  buildError,
  buildInvalidFeedItemTypeError,
} = require("../utils/errors");
const { buildFeedUrl } = require("../utils/urls");
const { encodeData } = require("../utils/http");

module.exports = (client) => {
  return {
    create: (accountId, type, feedParams, url) => {
      if (!accountId) {
        throw buildError(MISSING_ACCOUNT_ID);
      }

      if (!type) {
        throw buildError(MISSING_FEED_ITEM_TYPE);
      }

      const feedItemTypes = ["basic"];
      if (!feedItemTypes.includes(type)) {
        throw buildInvalidFeedItemTypeError(feedItemTypes);
      }

      if (!feedParams) {
        throw buildError(MISSING_FEED_PARAMS);
      }

      if (!feedParams.title) {
        throw buildError(MISSING_FEED_ITEM_TITLE);
      }

      if (!feedParams.image_url) {
        throw buildError(MISSING_FEED_ITEM_IMAGE_URL);
      }

      const endpointUrl = buildFeedUrl();

      const data = {
        account_id: accountId,
        type,
        params: feedParams,
      };

      if (url) {
        data.url = url;
      }

      const formattedData = encodeData(data);

      return client.post(endpointUrl, formattedData);
    },
  };
};
