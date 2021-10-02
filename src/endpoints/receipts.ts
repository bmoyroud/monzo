import { assert, Infer } from "superstruct";
import Endpoint from "./endpoint";
import ReceiptParams from "../structs/receipts/Receipt";
import ExternalId from "../structs/receipts/ExternalId";
import { Receipt } from "../monzo";
import { buildReceiptsUrl } from "../utils/urls";

const endpointUrl = buildReceiptsUrl();

class ReceiptsEndpoint extends Endpoint {
  create(args: Infer<typeof ReceiptParams>) {
    assert(args, ReceiptParams);
    return this.client.put<void, {}>(endpointUrl, args);
  }

  retrieve(args: Infer<typeof ExternalId>) {
    assert(args, ExternalId);
    return this.client
      .get<void, { receipt: Receipt }>(endpointUrl, { params: args })
      .then((data) => data.receipt);
  }

  delete(args: Infer<typeof ExternalId>) {
    assert(args, ExternalId);
    return this.client.delete<void, any>(endpointUrl, { params: args });
  }
}

export default ReceiptsEndpoint;
