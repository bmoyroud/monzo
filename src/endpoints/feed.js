const url = require("url");

module.exports = (client) => {
  return {
    create: (accountId, type, feedParams, url2) => {
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

      // append params in front of each key
      const entries = Object.entries(feedParams);
      const updatedEntries = entries.map(([key, value]) => [
        `params[${key}]`,
        value,
      ]);
      const updatedFeedParams = Object.fromEntries(updatedEntries);

      const data = {
        account_id: accountId,
        type,
        ...updatedFeedParams,
      };

      if (url2) {
        data.url = url2;
      }

      const formattedData = new url.URLSearchParams(data);

      return client
        .post("/feed", formattedData)
        .then((response) => response.data);
    },
  };
};
