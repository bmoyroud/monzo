import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import ReceiptParams from "../structs/receipts/Receipt";
import ExternalId from "../structs/receipts/ExternalId";
import { Receipt } from "../monzo";
import { buildReceiptsUrl } from "../utils/urls";

const endpointUrl = buildReceiptsUrl();

export default (client: AxiosInstance) => {
  return {
    create: (args: Infer<typeof ReceiptParams>) => {
      assert(args, ReceiptParams);
      return client.put<void, {}>(endpointUrl, args);
    },

    retrieve: (args: Infer<typeof ExternalId>) => {
      assert(args, ExternalId);
      return client
        .get<void, { receipt: Receipt }>(endpointUrl, { params: args })
        .then((data) => data.receipt);
    },

    delete: (args: Infer<typeof ExternalId>) => {
      assert(args, ExternalId);
      return client.delete<void, any>(endpointUrl, { params: args });
    },
  };
};
