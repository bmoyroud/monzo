import { assert } from "superstruct";
import Receipt from "../structs/receipts/Receipt";
import ExternalId from "../structs/receipts/ExternalId";
import { buildReceiptsUrl } from "../utils/urls";

const endpointUrl = buildReceiptsUrl();

export default (client) => {
  return {
    create: (params: object) => {
      assert(params, Receipt);
      return client.put(endpointUrl, params);
    },

    retrieve: (params: object) => {
      assert(params, ExternalId);
      return client.get(endpointUrl, { params });
    },

    delete: (params: object) => {
      assert(params, ExternalId);
      return client.delete(endpointUrl, { params });
    },
  };
};
