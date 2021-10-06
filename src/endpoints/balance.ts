import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { BalanceRes } from "../types/monzo-api";
import { Id } from "../structs/common";
import { buildBalanceUrl } from "../helpers/urls";

class BalanceEndpoint extends Endpoint {
  retrieve(accountId: Id) {
    assert(accountId, Id);

    const endpointUrl = buildBalanceUrl();

    const params = { account_id: accountId };

    return this.client.get<void, BalanceRes>(endpointUrl, { params });
  }
}

export default BalanceEndpoint;
