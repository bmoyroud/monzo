const { encodeData } = require("../utils/http");

module.exports = (client) => {
  return {
    create: (accountId, url) => {
      if (!accountId) {
        throw new Error(
          "Please provide account id to receive notifications for."
        );
      }

      if (!url) {
        throw new Error("Please provide url to send notifications to.");
      }

      const data = encodeData({
        account_id: accountId,
        url,
      });

      return client.post("/webhooks", data).then((response) => response.data);
    },

    list: (accountId) => {
      if (!accountId) {
        throw new Error("Please provide account id to list webhooks for.");
      }

      return client
        .get("/webhooks", { params: { account_id: accountId } })
        .then((response) => response.data);
    },

    delete: (webhookId) => {
      if (!webhookId) {
        throw new Error("Please provide webhook id to delete.");
      }

      return client
        .delete(`/webhooks/${webhookId}`)
        .then((response) => response.data);
    },
  };
};
