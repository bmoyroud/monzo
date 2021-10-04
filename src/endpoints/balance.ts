import { assert, Infer } from "superstruct";
import Endpoint from "./endpoint";
import { Balance } from "../monzo";
import Id from "../structs/common/Id";
import { buildBalanceUrl } from "../utils/urls";

class BalanceEndpoint extends Endpoint {
  retrieve(accountId: Infer<typeof Id>) {
    assert(accountId, Id);

    const endpointUrl = buildBalanceUrl();

    const args = { account_id: accountId };

    return this.client.get<void, Balance>(endpointUrl, { params: args });
  }
}

export default BalanceEndpoint;
