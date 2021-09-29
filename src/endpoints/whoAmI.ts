import { AxiosInstance } from "axios";
import { WhoAmI } from "../monzo";
import { buildWhoAmIUrl } from "../utils/urls";

export default (client: AxiosInstance) => {
  const endpointUrl = buildWhoAmIUrl();
  return () => client.get<void, WhoAmI>(endpointUrl);
};
