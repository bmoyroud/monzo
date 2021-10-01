import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import { Account } from "../monzo";
import List from "../structs/accounts/List";
import { buildAccountsUrl } from "../utils/urls";

export default (client: AxiosInstance) => {
  return {
    list: (args?: Infer<typeof List>) => {
      assert(args, List);

      const endpointUrl = buildAccountsUrl();

      return client
        .get<void, { accounts: Account }>(endpointUrl, { params: args })
        .then((data) => data.accounts);
    },
  };
};
