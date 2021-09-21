const { assert } = require("superstruct");
const AccountType = require("../structs/accounts/AccountType");
const { buildAccountsUrl } = require("../utils/urls");

module.exports = (client) => {
  return {
    list: (params) => {
      assert(params, AccountType);

      const endpointUrl = buildAccountsUrl();

      // TODO: simplify below?
      if (params) {
        return client.get(endpointUrl, { params });
      }

      return client.get(endpointUrl).then((data) => data.accounts);
    },
  };
};
