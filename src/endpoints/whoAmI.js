const { buildWhoAmIUrl } = require("../utils/urls");

module.exports = (client) => {
  const endpointUrl = buildWhoAmIUrl();
  return () => client.get(endpointUrl);
};
