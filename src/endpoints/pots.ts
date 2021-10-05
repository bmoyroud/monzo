import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { Id, Pagination } from "../structs/common";
import { Deposit, Withdraw } from "../structs/pots";
import { Pot } from "../types/monzo-api";
import {
  buildPotsUrl,
  buildPotsDepositUrl,
  buildPotsWithdrawalUrl,
} from "../utils/urls";
import { encodeData } from "../utils/http";
import { filterResults } from "../utils/pagination";

class PotsEndpoint extends Endpoint {
  async list(accountId: Id, pagination: Pagination = {}) {
    assert(accountId, Id);
    assert(pagination, Pagination);

    const endpointUrl = buildPotsUrl();

    const pots = await this.client
      .get<void, { pots: Pot[] }>(endpointUrl, {
        params: { current_account_id: accountId },
      })
      .then((data) => data.pots);

    if (pagination) {
      return filterResults(pots, pagination);
    }

    return pots;
  }

  deposit(args: Deposit) {
    assert(args, Deposit);

    const { pot_id, ...other } = args;

    const endpointUrl = buildPotsDepositUrl(pot_id);

    const data = encodeData(other);

    return this.client.put<void, Pot>(endpointUrl, data);
  }

  withdraw(args: Withdraw) {
    assert(args, Withdraw);

    const { pot_id, ...other } = args;

    const endpointUrl = buildPotsWithdrawalUrl(pot_id);

    const data = encodeData(other);

    return this.client.put<void, Pot>(endpointUrl, data);
  }
}

export default PotsEndpoint;
