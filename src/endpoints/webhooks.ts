const { assert } = require("superstruct");
const Create = require("../structs/webhooks/Create");
const List = require("../structs/webhooks/List");
const Delete = require("../structs/webhooks/Delete");
const { buildWebhooksUrl, buildWebhookUrl } = require("../utils/urls");
const { encodeData } = require("../utils/http");

module.exports = (client) => {
  return {
    create: (params) => {
      assert(params, Create);

      const endpointUrl = buildWebhooksUrl();

      const data = encodeData(params);

      return client.post(endpointUrl, data).then((data) => data.webhook);
    },

    list: (params) => {
      assert(params, List);

      const endpointUrl = buildWebhooksUrl();

      return client.get(endpointUrl, { params }).then((data) => data.webhooks);
    },

    delete: (params) => {
      assert(params, Delete);

      const { webhook_id } = params;

      const endpointUrl = buildWebhookUrl(webhook_id);

      return client.delete(endpointUrl);
    },
  };
};
