const { MISSING_ACCOUNT_ID } = require("../constants/errors");
const { buildError } = require("../utils/errors");
const { buildBalanceUrl } = require("../utils/urls");

module.exports = (client) => {
  return {
    retrieve: (accountId) => {
      if (!accountId) {
        throw buildError(MISSING_ACCOUNT_ID);
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
