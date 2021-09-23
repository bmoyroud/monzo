const { assert } = require("superstruct");
const Balance = require("../structs/balance/Balance");
const { buildBalanceUrl } = require("../utils/urls");

module.exports = (client) => {
  return {
    retrieve: (params) => {
      assert(params, Balance);

      const endpointUrl = buildBalanceUrl();

      return client.get(endpointUrl, { params });
    },
  };
};
