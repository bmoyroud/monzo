import { AxiosInstance } from "axios";
import { buildWhoAmIUrl } from "../utils/urls";

export default (client: AxiosInstance) => {
  const endpointUrl = buildWhoAmIUrl();
  return () => client.get(endpointUrl);
};
