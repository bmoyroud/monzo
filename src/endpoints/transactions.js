const {
  MISSING_ACCOUNT_ID,
  MISSING_TRANSACTION_ID,
  MISSING_TRANSACTION_ANNOTATIONS,
} = require("../constants/errors");
const { buildError } = require("../utils/errors");
const { buildTransactionsUrl, buildTransactionUrl } = require("../utils/urls");
const { encodeData } = require("../utils/http");

module.exports = (client) => {
  return {
    list: (accountId, since, before) => {
      if (!accountId) {
        throw buildError(MISSING_ACCOUNT_ID);
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
        throw buildError(MISSING_TRANSACTION_ID);
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
        throw buildError(MISSING_TRANSACTION_ID);
      }

      if (!annotations) {
        throw buildError(MISSING_TRANSACTION_ANNOTATIONS);
      }

      const endpointUrl = buildTransactionUrl(transactionId);

      const data = encodeData({ metadata: annotations });

      return client.patch(endpointUrl, data).then((data) => data.transaction);
    },
  };
};
