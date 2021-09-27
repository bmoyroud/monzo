import { assert } from "superstruct";
import Balance from "../structs/balance/Balance";
import { buildBalanceUrl } from "../utils/urls";

export default (client) => {
  return {
    retrieve: (params: object) => {
      assert(params, Balance);

      const endpointUrl = buildBalanceUrl();

      return client.get(endpointUrl, { params });
    },
  };
};
