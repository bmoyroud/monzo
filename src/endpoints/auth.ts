import Endpoint from "./endpoint";
import { WhoAmI } from "../monzo";
import { buildWhoAmIUrl } from "../utils/urls";

class AuthEndpoint extends Endpoint {
  whoAmI() {
    const endpointUrl = buildWhoAmIUrl();
    return this.client.get<void, WhoAmI>(endpointUrl);
  }
}

export default AuthEndpoint;
