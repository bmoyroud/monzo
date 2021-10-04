import { assert, Infer } from "superstruct";
import Endpoint from "./endpoint";
import { Account } from "../monzo";
import { AccountType } from "../structs/accounts";
import { Pagination } from "../structs/common/pagination";
import { buildAccountsUrl } from "../utils/urls";
import { filterResults, isPaginated } from "../utils/pagination";

class AccountEndpoint extends Endpoint {
  async list(
    accountType: Infer<typeof AccountType>,
    pagination?: Infer<typeof Pagination>
  ) {
    assert(accountType, AccountType);
    assert(pagination, Pagination);

    const endpointUrl = buildAccountsUrl();

    const accounts = await this.client
      .get<void, { accounts: Account[] }>(endpointUrl, {
        params: { account_type: accountType },
      })
      .then((data) => data.accounts);

    if (isPaginated(pagination)) {
      return filterResults(accounts, pagination);
    }

    return accounts;
  }
}

export default AccountEndpoint;
