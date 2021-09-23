import { buildWhoAmIUrl } from "../utils/urls";

export default (client) => {
  const endpointUrl = buildWhoAmIUrl();
  return () => client.get(endpointUrl);
};
