import { assert, Infer } from "superstruct";
import Endpoint from "./endpoint";
import Create from "../structs/webhooks/Create";
import List from "../structs/webhooks/List";
import Delete from "../structs/webhooks/Delete";
import AccountId from "../structs/common/AccountId";
import { Webhook } from "../monzo";
import { buildWebhooksUrl, buildWebhookUrl } from "../utils/urls";
import { encodeData } from "../utils/http";
import { isLimited, limitResults } from "../utils/pagination";

class WebhooksEndpoint extends Endpoint {
  create(args: Infer<typeof Create>) {
    assert(args, Create);

    const endpointUrl = buildWebhooksUrl();

    const data = encodeData(args);

    return this.client
      .post<void, { webhook: Webhook }>(endpointUrl, data)
      .then((data) => data.webhook);
  }

  async list(args: Infer<typeof List>) {
    assert(args, List);

    const { account_id, ...pagination } = args;

    const endpointUrl = buildWebhooksUrl();

    const webhooks = await this.client
      .get<void, { webhooks: Webhook[] }>(endpointUrl, {
        params: { account_id },
      })
      .then((data) => data.webhooks);

    if (isLimited(pagination)) {
      return limitResults(webhooks, pagination);
    }

    return webhooks;
  }

  delete(args: Infer<typeof Delete>) {
    assert(args, Delete);

    const { webhook_id } = args;

    const endpointUrl = buildWebhookUrl(webhook_id);

    return this.client.delete<void, {}>(endpointUrl);
  }

  async deleteAll(args: Infer<typeof AccountId>) {
    assert(args, AccountId);

    const { account_id } = args;

    const webhooks = await this.list({ account_id });

    for (let i = 0; i < webhooks.length; i++) {
      const { id: webhookId } = webhooks[i];
      await this.delete({ webhook_id: webhookId });
    }
  }
}

export default WebhooksEndpoint;
