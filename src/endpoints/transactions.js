const { buildTransactionsUrl, buildTransactionUrl } = require("../utils/urls");
const { encodeData } = require("../utils/http");

module.exports = (client) => {
  return {
    list: (accountId, since, before) => {
      if (!accountId) {
        throw new Error("Please provide the account id.");
      }

      const params = {
        account_id: accountId,
      };

      if (since) {
        params.since = since;
      }

      if (before) {
        params.before = before;
      }

      const endpointUrl = buildTransactionsUrl();

      return client
        .get(endpointUrl, { params })
        .then((data) => data.transactions);
    },

    retrieve: (transactionId, expandMerchant = false) => {
      const endpointUrl = buildTransactionUrl(transactionId);

      if (!transactionId) {
        throw new Error("Please provide the transaction id.");
      }

      if (expandMerchant) {
        return client.get(endpointUrl, {
          params: {
            "expand[]": "merchant",
          },
        });
      }

      return client.get(endpointUrl).then((data) => data.transaction);
    },

    annotate: (transactionId, annotations) => {
      if (!transactionId) {
        throw new Error("Please provide the transaction id.");
      }

      if (!annotations) {
        throw new Error("Please provide key-value annotations.");
      }

      const endpointUrl = buildTransactionUrl(transactionId);

      const data = encodeData({ metadata: annotations });

      return client.patch(endpointUrl, data).then((data) => data.transaction);
    },
  };
};
