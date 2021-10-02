import { assert, Infer } from "superstruct";
import Endpoint from "./endpoint";
import List from "../structs/pots/List";
import Deposit from "../structs/pots/Deposit";
import Withdraw from "../structs/pots/Withdraw";
import { Pot } from "../monzo";
import {
  buildPotsUrl,
  buildPotsDepositUrl,
  buildPotsWithdrawalUrl,
} from "../utils/urls";
import { encodeData } from "../utils/http";
import { filterResults, isPaginated } from "../utils/pagination";

class PotsEndpoint extends Endpoint {
  async list(args: Infer<typeof List>) {
    assert(args, List);

    const { account_id, ...pagination } = args;

    const endpointUrl = buildPotsUrl();

    const pots = await this.client
      .get<void, { pots: Pot[] }>(endpointUrl, {
        params: { current_account_id: account_id },
      })
      .then((data) => data.pots);

    if (isPaginated(pagination)) {
      return filterResults(pots, pagination);
    }

    return pots;
  }

  deposit(args: Infer<typeof Deposit>) {
    assert(args, Deposit);

    const { pot_id, ...other } = args;

    const endpointUrl = buildPotsDepositUrl(pot_id);

    const data = encodeData(other);

    return this.client.put<void, Pot>(endpointUrl, data);
  }

  withdraw(args: Infer<typeof Withdraw>) {
    assert(args, Withdraw);

    const { pot_id, ...other } = args;

    const endpointUrl = buildPotsWithdrawalUrl(pot_id);

    const data = encodeData(other);

    return this.client.put<void, Pot>(endpointUrl, data);
  }
}

export default PotsEndpoint;
