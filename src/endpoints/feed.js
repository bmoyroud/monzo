const { encodeData } = require("../utils/http");

module.exports = (client) => {
  return {
    create: (accountId, type, feedParams, url) => {
      if (!accountId) {
        throw new Error("Please provide the account id.");
      }

      if (!type) {
        throw new Error("Please provide a type of feed item.");
      }

      const feedItemTypes = ["basic"];
      if (!feedItemTypes.includes(type)) {
        throw new Error(
          `Please provide a valid feed item type (${feedItemTypes.join(", ")}).`
        );
      }

      if (!feedParams) {
        throw new Error(
          "Please provide a map of parameters (varies based on type)."
        );
      }

      if (!feedParams.title) {
        throw new Error("Please provide a title to display.");
      }

      if (!feedParams.image_url) {
        throw new Error("Please provide a URL of the image to display.");
      }

      const data = {
        account_id: accountId,
        type,
        params: feedParams,
      };

      if (url) {
        data.url = url;
      }

      const formattedData = encodeData(data);
      console.log(formattedData);

      return client.post("/feed", formattedData);
    },
  };
};
