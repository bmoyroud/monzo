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
      return client.put<void, any>(endpointUrl, params);
    },

    retrieve: (params: Infer<typeof ExternalId>) => {
      assert(params, ExternalId);
      return client.get<void, any>(endpointUrl, { params });
    },

    delete: (params: Infer<typeof ExternalId>) => {
      assert(params, ExternalId);
      return client.delete<void, any>(endpointUrl, { params });
    },
  };
};
