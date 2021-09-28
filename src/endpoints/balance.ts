import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import Balance from "../structs/balance/Balance";
import { buildBalanceUrl } from "../utils/urls";

export default (client: AxiosInstance) => {
  return {
    retrieve: (params: Infer<typeof Balance>) => {
      assert(params, Balance);

      const endpointUrl = buildBalanceUrl();

      return client.get(endpointUrl, { params });
    },
  };
};
