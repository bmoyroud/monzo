import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { Create } from "../structs/webhooks";
import { Id, CursorBasedPagination } from "../structs/common";
import { Webhook } from "../types/monzo";
import { buildWebhooksUrl, buildWebhookUrl } from "../utils/urls";
import { encodeData } from "../utils/http";
import { limitResults } from "../utils/pagination";

class WebhooksEndpoint extends Endpoint {
  create(args: Create) {
    assert(args, Create);

    const endpointUrl = buildWebhooksUrl();

    const data = encodeData(args);

    return this.client
      .post<void, { webhook: Webhook }>(endpointUrl, data)
      .then((data) => data.webhook);
  }

  async list(accountId: Id, pagination: CursorBasedPagination = {}) {
    assert(accountId, Id);
    assert(pagination, CursorBasedPagination);

    const endpointUrl = buildWebhooksUrl();

    const webhooks = await this.client
      .get<void, { webhooks: Webhook[] }>(endpointUrl, {
        params: { account_id: accountId },
      })
      .then((data) => data.webhooks);

    if (pagination.limit) {
      return limitResults(webhooks, pagination.limit);
    }

    return webhooks;
  }

  delete(webhookId: Id) {
    assert(webhookId, Id);

    const endpointUrl = buildWebhookUrl(webhookId);

    return this.client.delete<void, {}>(endpointUrl);
  }

  async deleteAll(accountId: Id) {
    assert(accountId, Id);

    const webhooks = await this.list(accountId);

    for (let i = 0; i < webhooks.length; i++) {
      const { id } = webhooks[i];
      await this.delete(id);
    }
  }
}

export default WebhooksEndpoint;
