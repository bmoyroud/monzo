import Endpoint from "./endpoint";
import { WhoAmIRes } from "../types/monzo-api";
import { buildWhoAmIUrl } from "../utils/urls";

class AuthEndpoint extends Endpoint {
  whoAmI() {
    const endpointUrl = buildWhoAmIUrl();
    return this.client.get<void, WhoAmIRes>(endpointUrl);
  }
}

export default AuthEndpoint;
