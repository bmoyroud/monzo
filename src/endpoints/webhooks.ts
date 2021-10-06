import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { Create } from "../structs/webhooks";
import { Id, CursorBasedPagination } from "../structs/common";
import { EmptyRes, WebhookRes, WebhooksRes } from "../types/monzo-api";
import { buildWebhooksUrl, buildWebhookUrl } from "../helpers/urls";
import { encodeData } from "../helpers/http";
import { limitResults } from "../helpers/pagination";

class WebhooksEndpoint extends Endpoint {
  create(args: Create) {
    assert(args, Create);

    const endpointUrl = buildWebhooksUrl();

    const data = encodeData(args);

    return this.client
      .post<void, WebhookRes>(endpointUrl, data)
      .then((data) => data.webhook);
  }

  async list(accountId: Id, pagination: CursorBasedPagination = {}) {
    assert(accountId, Id);
    assert(pagination, CursorBasedPagination);

    const endpointUrl = buildWebhooksUrl();

    const webhooks = await this.client
      .get<void, WebhooksRes>(endpointUrl, {
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

    return this.client.delete<void, EmptyRes>(endpointUrl);
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
