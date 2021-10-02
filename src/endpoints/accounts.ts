import { assert, Infer } from "superstruct";
import Endpoint from "./endpoint";
import { Account } from "../monzo";
import List from "../structs/accounts/List";
import { buildAccountsUrl } from "../utils/urls";
import { filterResults, isPaginated } from "../utils/pagination";

class AccountEndpoint extends Endpoint {
  async list(args: Infer<typeof List> = {}) {
    assert(args, List);

    const { account_type, ...pagination } = args;

    const endpointUrl = buildAccountsUrl();

    const accounts = await this.client
      .get<void, { accounts: Account[] }>(endpointUrl, {
        params: { account_type },
      })
      .then((data) => data.accounts);

    if (isPaginated(pagination)) {
      return filterResults(accounts, pagination);
    }

    return accounts;
  }
}

export default AccountEndpoint;
