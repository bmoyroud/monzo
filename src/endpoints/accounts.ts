import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import { Account } from "../monzo";
import List from "../structs/accounts/List";
import { buildAccountsUrl } from "../utils/urls";
import { filterResults, isPaginated } from "../utils/pagination";

export default (client: AxiosInstance) => {
  return {
    list: async (args: Infer<typeof List> = {}) => {
      assert(args, List);

      const { account_type, ...pagination } = args;

      const endpointUrl = buildAccountsUrl();

      const accounts = await client
        .get<void, { accounts: Account[] }>(endpointUrl, {
          params: { account_type },
        })
        .then((data) => data.accounts);

      if (isPaginated(pagination)) {
        return filterResults(accounts, pagination);
      }

      return accounts;
    },
  };
};
