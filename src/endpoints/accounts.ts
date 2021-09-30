import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import { Account } from "../monzo";
import List from "../structs/accounts/List";
import { buildAccountsUrl } from "../utils/urls";

export default (client: AxiosInstance) => {
  return {
    list: (params?: Infer<typeof List>) => {
      assert(params, List);

      const endpointUrl = buildAccountsUrl();

      return client
        .get<void, { accounts: Account }>(endpointUrl, { params })
        .then((data) => data.accounts);
    },
  };
};
