import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import Create from "../structs/webhooks/Create";
import List from "../structs/webhooks/List";
import Delete from "../structs/webhooks/Delete";
import { Webhook } from "../monzo";
import { buildWebhooksUrl, buildWebhookUrl } from "../utils/urls";
import { encodeData } from "../utils/http";

export default (client: AxiosInstance) => {
  return {
    create: (params: Infer<typeof Create>) => {
      assert(params, Create);

      const endpointUrl = buildWebhooksUrl();

      const data = encodeData(params);

      return client
        .post<void, { webhook: Webhook }>(endpointUrl, data)
        .then((data) => data.webhook);
    },

    list: (params: Infer<typeof List>) => {
      assert(params, List);

      const endpointUrl = buildWebhooksUrl();

      return client
        .get<void, { webhooks: Webhook[] }>(endpointUrl, { params })
        .then((data) => data.webhooks);
    },

    delete: (params: Infer<typeof Delete>) => {
      assert(params, Delete);

      const { webhook_id } = params;

      const endpointUrl = buildWebhookUrl(webhook_id);

      return client.delete<void, {}>(endpointUrl);
    },
  };
};
