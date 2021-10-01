import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import Create from "../structs/webhooks/Create";
import List from "../structs/webhooks/List";
import Delete from "../structs/webhooks/Delete";
import { Webhook } from "../monzo";
import { buildWebhooksUrl, buildWebhookUrl } from "../utils/urls";
import { encodeData } from "../utils/http";
import { isLimited, limitResults } from "../utils/pagination";

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

    list: async (args: Infer<typeof List>) => {
      assert(args, List);

      const { account_id, ...pagination } = args;

      const endpointUrl = buildWebhooksUrl();

      const webhooks = await client
        .get<void, { webhooks: Webhook[] }>(endpointUrl, {
          params: { account_id },
        })
        .then((data) => data.webhooks);

      if (isLimited(pagination)) {
        return limitResults(webhooks, pagination);
      }

      return webhooks;
    },

    delete: (args: Infer<typeof Delete>) => {
      assert(args, Delete);

      const { webhook_id } = args;

      const endpointUrl = buildWebhookUrl(webhook_id);

      return client.delete<void, {}>(endpointUrl);
    },
  };
};
