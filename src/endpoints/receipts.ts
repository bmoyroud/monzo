import { assert, create, Infer } from "superstruct";
import Endpoint from "./endpoint";
import ReceiptParams from "../structs/receipts/Receipt";
import Id from "../structs/common/Id";
import { Receipt } from "../monzo";
import { buildReceiptsUrl } from "../utils/urls";
import checkReceipt from "../utils/receipt";

const endpointUrl = buildReceiptsUrl();

class ReceiptsEndpoint extends Endpoint {
  save(args: Infer<typeof ReceiptParams>) {
    const receipt = create(args, ReceiptParams);
    checkReceipt(receipt);
    return this.client.put<void, {}>(endpointUrl, receipt);
  }

  retrieve(externalId: Infer<typeof Id>) {
    assert(externalId, Id);
    const args = { external_id: externalId };
    return this.client
      .get<void, { receipt: Receipt }>(endpointUrl, { params: args })
      .then((data) => data.receipt);
  }

  /**
   * Note: currently not working (403 - insufficient permissions).
   */
  delete(externalId: Infer<typeof Id>) {
    assert(externalId, Id);
    const args = { external_id: externalId };
    return this.client.delete<void, any>(endpointUrl, { params: args });
  }
}

export default ReceiptsEndpoint;
