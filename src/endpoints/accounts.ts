import { assert } from "superstruct";
import AccountType from "../structs/accounts/AccountType";
import { buildAccountsUrl } from "../utils/urls";

export default (client) => {
  return {
    list: (params) => {
      assert(params, AccountType);

      const endpointUrl = buildAccountsUrl();

      // TODO: simplify below?
      if (params) {
        return client.get(endpointUrl, { params });
      }

      return client.get(endpointUrl).then((data) => data.accounts);
    },
  };
};
