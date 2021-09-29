import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import ReceiptParams from "../structs/receipts/Receipt";
import ExternalId from "../structs/receipts/ExternalId";
import { Receipt } from "../monzo";
import { buildReceiptsUrl } from "../utils/urls";

const endpointUrl = buildReceiptsUrl();

export default (client: AxiosInstance) => {
  return {
    create: (params: Infer<typeof ReceiptParams>) => {
      assert(params, ReceiptParams);
      return client.put<void, {}>(endpointUrl, params);
    },

    retrieve: (params: Infer<typeof ExternalId>) => {
      assert(params, ExternalId);
      return client
        .get<void, { receipt: Receipt }>(endpointUrl, { params })
        .then((data) => data.receipt);
    },

    delete: (params: Infer<typeof ExternalId>) => {
      assert(params, ExternalId);
      return client.delete<void, any>(endpointUrl, { params });
    },
  };
};
