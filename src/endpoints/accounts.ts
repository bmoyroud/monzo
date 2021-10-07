import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { List } from "../structs/accounts";
import { AccountsRes } from "../types/monzo-api";
import { buildAccountsUrl } from "../helpers/urls";
import { filterResults } from "../helpers/pagination";

class AccountEndpoint extends Endpoint {
  async list(args: List = {}) {
    assert(args, List);

    const endpointUrl = buildAccountsUrl();

    const { account_type, ...pagination } = args;
    const params = account_type ? { account_type } : {};

    const accounts = await this.client
      .get<void, AccountsRes>(endpointUrl, { params })
      .then((data) => data.accounts);

    if (pagination) {
      return filterResults(accounts, pagination);
    }

    return accounts;
  }
}

export default AccountEndpoint;
