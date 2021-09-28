import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import AccountType from "../structs/accounts/AccountType";
import { buildAccountsUrl } from "../utils/urls";

export default (client: AxiosInstance) => {
  return {
    list: (params?: Infer<typeof AccountType>) => {
      assert(params, AccountType);

      const endpointUrl = buildAccountsUrl();

      return client
        .get<void, any>(endpointUrl, { params })
        .then((data) => data.accounts);
    },
  };
};
