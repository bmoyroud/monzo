import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { AccountType } from "../structs/accounts";
import { Pagination } from "../structs/common";
import { AccountsRes } from "../types/monzo-api";
import { buildAccountsUrl } from "../helpers/urls";
import { filterResults } from "../helpers/pagination";

class AccountEndpoint extends Endpoint {
  async list(accountType: AccountType, pagination: Pagination = {}) {
    assert(accountType, AccountType);
    assert(pagination, Pagination);

    const endpointUrl = buildAccountsUrl();

    const accounts = await this.client
      .get<void, AccountsRes>(endpointUrl, {
        params: { account_type: accountType },
      })
      .then((data) => data.accounts);

    if (pagination) {
      return filterResults(accounts, pagination);
    }

    return accounts;
  }
}

export default AccountEndpoint;
