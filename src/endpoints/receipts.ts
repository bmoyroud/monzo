import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { Id } from "../structs/common";
import { buildReceiptsUrl } from "../helpers/urls";
import checkReceipt from "../helpers/receipt";
import { ReceiptReq } from "../structs/receipt";
import { EmptyRes, ReceiptRes } from "../types/monzo-api";

const endpointUrl = buildReceiptsUrl();

class ReceiptsEndpoint extends Endpoint {
  save(receipt: ReceiptReq) {
    assert(receipt, ReceiptReq);
    checkReceipt(receipt);
    return this.client.put<void, EmptyRes>(endpointUrl, receipt);
  }

  retrieve(externalId: Id) {
    assert(externalId, Id);
    const params = { external_id: externalId };
    return this.client
      .get<void, ReceiptRes>(endpointUrl, { params })
      .then((data) => data.receipt);
  }

  /**
   * @deprecated
   * Note: currently not working (403 - insufficient permissions).
   */
  delete(externalId: Id) {
    assert(externalId, Id);
    const params = { external_id: externalId };
    return this.client.delete<void, any>(endpointUrl, { params });
  }
}

export default ReceiptsEndpoint;
