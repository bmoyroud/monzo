import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { Id, Pagination } from "../structs/common";
import { Deposit, Withdraw } from "../structs/pots";
import { PotRes, PotsRes } from "../types/monzo-api";
import {
  buildPotsUrl,
  buildPotsDepositUrl,
  buildPotsWithdrawalUrl,
} from "../helpers/urls";
import { encodeData } from "../helpers/http";
import { filterResults } from "../helpers/pagination";

class PotsEndpoint extends Endpoint {
  async list(accountId: Id, pagination: Pagination = {}) {
    assert(accountId, Id);
    assert(pagination, Pagination);

    const endpointUrl = buildPotsUrl();

    const pots = await this.client
      .get<void, PotsRes>(endpointUrl, {
        params: { current_account_id: accountId },
      })
      .then((data) => data.pots);

    if (pagination) {
      return filterResults(pots, pagination);
    }

    return pots;
  }

  deposit(potId: Id, args: Deposit) {
    assert(potId, Id);
    assert(args, Deposit);

    const endpointUrl = buildPotsDepositUrl(potId);

    const data = encodeData(args);

    return this.client.put<void, PotRes>(endpointUrl, data);
  }

  withdraw(potId: Id, args: Withdraw) {
    assert(potId, Id);
    assert(args, Withdraw);

    const endpointUrl = buildPotsWithdrawalUrl(potId);

    const data = encodeData(args);

    return this.client.put<void, PotRes>(endpointUrl, data);
  }
}

export default PotsEndpoint;
