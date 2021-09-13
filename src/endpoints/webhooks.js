const { buildWebhooksUrl, buildWebhookUrl } = require("../utils/urls");
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

      const endpointUrl = buildWebhooksUrl();

      const data = encodeData({
        account_id: accountId,
        url,
      });

      return client.post(endpointUrl, data).then((data) => data.webhook);
    },

    list: (accountId) => {
      if (!accountId) {
        throw new Error("Please provide account id to list webhooks for.");
      }

      const endpointUrl = buildWebhooksUrl();

      return client
        .get(endpointUrl, { params: { account_id: accountId } })
        .then((data) => data.webhooks);
    },

    delete: (webhookId) => {
      if (!webhookId) {
        throw new Error("Please provide webhook id to delete.");
      }

      const endpointUrl = buildWebhookUrl(webhookId);
      return client.delete(endpointUrl);
    },
  };
};
