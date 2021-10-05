import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { Account } from "../types/monzo";
import { AccountType } from "../structs/accounts";
import { Pagination } from "../structs/common";
import { buildAccountsUrl } from "../utils/urls";
import { filterResults } from "../utils/pagination";

class AccountEndpoint extends Endpoint {
  async list(accountType: AccountType, pagination: Pagination = {}) {
    assert(accountType, AccountType);
    assert(pagination, Pagination);

    const endpointUrl = buildAccountsUrl();

    const accounts = await this.client
      .get<void, { accounts: Account[] }>(endpointUrl, {
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
