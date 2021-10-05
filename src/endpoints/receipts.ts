import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { Id } from "../structs/common";
import { buildReceiptsUrl } from "../utils/urls";
import checkReceipt from "../utils/receipt";
import { ReceiptReq } from "../structs/receipt";

const endpointUrl = buildReceiptsUrl();

class ReceiptsEndpoint extends Endpoint {
  save(args: ReceiptReq) {
    assert(args, ReceiptReq);
    checkReceipt(args);
    return this.client.put<void, {}>(endpointUrl, args);
  }

  retrieve(externalId: Id) {
    assert(externalId, Id);
    const args = { external_id: externalId };
    return this.client
      .get<void, { receipt: any }>(endpointUrl, { params: args })
      .then((data) => data.receipt);
  }

  /**
   * @deprecated
   * Note: currently not working (403 - insufficient permissions).
   */
  delete(externalId: Id) {
    assert(externalId, Id);
    const args = { external_id: externalId };
    return this.client.delete<void, any>(endpointUrl, { params: args });
  }
}

export default ReceiptsEndpoint;
