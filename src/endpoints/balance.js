const { buildBalanceUrl } = require("../utils/urls");

module.exports = (client) => {
  return {
    retrieve: (accountId) => {
      if (!accountId) {
        throw new Error("Please provide the account id.");
      }

      const endpointUrl = buildBalanceUrl();
      return client.get(endpointUrl, {
        params: {
          account_id: accountId,
        },
      });
    },
  };
};
