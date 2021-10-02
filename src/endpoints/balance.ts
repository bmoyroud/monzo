import { assert, Infer } from "superstruct";
import Endpoint from "./endpoint";
import { Balance } from "../monzo";
import BalanceParams from "../structs/balance/Balance";
import { buildBalanceUrl } from "../utils/urls";

class BalanceEndpoint extends Endpoint {
  retrieve(args: Infer<typeof BalanceParams>) {
    assert(args, BalanceParams);

    const endpointUrl = buildBalanceUrl();

    return this.client.get<void, Balance>(endpointUrl, { params: args });
  }
}

export default BalanceEndpoint;
