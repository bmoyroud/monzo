import { AxiosInstance } from "axios";
import { assert } from "superstruct";
import AccountType from "../structs/accounts/AccountType";
import { buildAccountsUrl } from "../utils/urls";

export default (client: AxiosInstance) => {
  return {
    list: (params: object) => {
      assert(params, AccountType);

      const endpointUrl = buildAccountsUrl();

      // TODO: simplify below?
      if (params) {
        return client
          .get(endpointUrl, { params })
          .then((data) => data.accounts);
      }

      return client.get(endpointUrl).then((data) => data.accounts);
    },
  };
};
