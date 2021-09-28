import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import Receipt from "../structs/receipts/Receipt";
import ExternalId from "../structs/receipts/ExternalId";
import { buildReceiptsUrl } from "../utils/urls";

const endpointUrl = buildReceiptsUrl();

export default (client: AxiosInstance) => {
  return {
    create: (params: Infer<typeof Receipt>) => {
      assert(params, Receipt);
      return client.put(endpointUrl, params);
    },

    retrieve: (params: Infer<typeof ExternalId>) => {
      assert(params, ExternalId);
      return client.get(endpointUrl, { params });
    },

    delete: (params: Infer<typeof ExternalId>) => {
      assert(params, ExternalId);
      return client.delete(endpointUrl, { params });
    },
  };
};
