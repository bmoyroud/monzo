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
    create: (args: Infer<typeof Create>) => {
      assert(args, Create);

      const endpointUrl = buildWebhooksUrl();

      const data = encodeData(args);

      return client
        .post<void, { webhook: Webhook }>(endpointUrl, data)
        .then((data) => data.webhook);
    },

    list: (args: Infer<typeof List>) => {
      assert(args, List);

      const endpointUrl = buildWebhooksUrl();

      return client
        .get<void, { webhooks: Webhook[] }>(endpointUrl, { params: args })
        .then((data) => data.webhooks);
    },

    delete: (args: Infer<typeof Delete>) => {
      assert(args, Delete);

      const { webhook_id } = args;

      const endpointUrl = buildWebhookUrl(webhook_id);

      return client.delete<void, {}>(endpointUrl);
    },
  };
};
