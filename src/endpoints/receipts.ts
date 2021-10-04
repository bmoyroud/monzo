import { assert, Infer } from "superstruct";
import Endpoint from "./endpoint";
import ReceiptParams from "../structs/receipts/Receipt";
import Id from "../structs/common/Id";
import { Receipt } from "../monzo";
import { buildReceiptsUrl } from "../utils/urls";

const endpointUrl = buildReceiptsUrl();

class ReceiptsEndpoint extends Endpoint {
  save(args: Infer<typeof ReceiptParams>) {
    assert(args, ReceiptParams);
    return this.client.put<void, {}>(endpointUrl, args);
  }

  retrieve(externalId: Infer<typeof Id>) {
    assert(externalId, Id);
    const args = { external_id: externalId };
    return this.client
      .get<void, { receipt: Receipt }>(endpointUrl, { params: args })
      .then((data) => data.receipt);
  }

  delete(externalId: Infer<typeof Id>) {
    assert(externalId, Id);
    const args = { external_id: externalId };
    return this.client.delete<void, any>(endpointUrl, { params: args });
  }
}

export default ReceiptsEndpoint;
