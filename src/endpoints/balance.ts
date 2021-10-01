import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import { Balance } from "../monzo";
import BalanceParams from "../structs/balance/Balance";
import { buildBalanceUrl } from "../utils/urls";

export default (client: AxiosInstance) => {
  return {
    retrieve: (args: Infer<typeof BalanceParams>) => {
      assert(args, BalanceParams);

      const endpointUrl = buildBalanceUrl();

      return client.get<void, Balance>(endpointUrl, { params: args });
    },
  };
};
