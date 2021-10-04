import { assert, Infer } from "superstruct";
import Endpoint from "./endpoint";
import { Create } from "../structs/webhooks";
import { Id } from "../structs/common/id";
import { CursorBasedPagination } from "../structs/common/pagination";
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

  async list(
    accountId: Infer<typeof Id>,
    pagination?: Infer<typeof CursorBasedPagination>
  ) {
    assert(accountId, Id);
    assert(pagination, CursorBasedPagination);

    const endpointUrl = buildWebhooksUrl();

    const webhooks = await this.client
      .get<void, { webhooks: Webhook[] }>(endpointUrl, {
        params: { account_id: accountId },
      })
      .then((data) => data.webhooks);

    if (isLimited(pagination)) {
      return limitResults(webhooks, pagination);
    }

    return webhooks;
  }

  delete(webhookId: Infer<typeof Id>) {
    assert(webhookId, Id);

    const endpointUrl = buildWebhookUrl(webhookId);

    return this.client.delete<void, {}>(endpointUrl);
  }

  async deleteAll(accountId: Infer<typeof Id>) {
    assert(accountId, Id);

    const webhooks = await this.list(accountId);

    for (let i = 0; i < webhooks.length; i++) {
      const { id } = webhooks[i];
      await this.delete(id);
    }
  }
}

export default WebhooksEndpoint;
