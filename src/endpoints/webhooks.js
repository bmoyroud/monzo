const {
  MISSING_WEBHOOK_CREATE_ACCOUNT_ID,
  MISSING_WEBHOOK_URL,
  MISSING_WEBHOOK_LIST_ACCOUNT_ID,
  MISSING_WEBHOOK_ID,
} = require("../constants/errors");
const { buildError } = require("../utils/errors");
const { buildWebhooksUrl, buildWebhookUrl } = require("../utils/urls");
const { encodeData } = require("../utils/http");

module.exports = (client) => {
  return {
    create: (accountId, url) => {
      if (!accountId) {
        throw buildError(MISSING_WEBHOOK_CREATE_ACCOUNT_ID);
      }

      if (!url) {
        throw buildError(MISSING_WEBHOOK_URL);
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
        throw buildError(MISSING_WEBHOOK_LIST_ACCOUNT_ID);
      }

      const endpointUrl = buildWebhooksUrl();

      return client
        .get(endpointUrl, { params: { account_id: accountId } })
        .then((data) => data.webhooks);
    },

    delete: (webhookId) => {
      if (!webhookId) {
        throw buildError(MISSING_WEBHOOK_ID);
      }

      const endpointUrl = buildWebhookUrl(webhookId);
      return client.delete(endpointUrl);
    },
  };
};
