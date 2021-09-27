import { assert } from "superstruct";
import Create from "../structs/webhooks/Create";
import List from "../structs/webhooks/List";
import Delete from "../structs/webhooks/Delete";
import { buildWebhooksUrl, buildWebhookUrl } from "../utils/urls";
import { encodeData } from "../utils/http";

export default (client) => {
  return {
    create: (params: object) => {
      assert(params, Create);

      const endpointUrl = buildWebhooksUrl();

      const data = encodeData(params);

      return client.post(endpointUrl, data).then((data) => data.webhook);
    },

    list: (params: object) => {
      assert(params, List);

      const endpointUrl = buildWebhooksUrl();

      return client.get(endpointUrl, { params }).then((data) => data.webhooks);
    },

    delete: (params: object) => {
      assert(params, Delete);

      const { webhook_id } = params;

      const endpointUrl = buildWebhookUrl(webhook_id);

      return client.delete(endpointUrl);
    },
  };
};
