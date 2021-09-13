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

      return client.get("/transactions", { params });
    },

    retrieve: (transactionId, expandMerchant = false) => {
      if (!transactionId) {
        throw new Error("Please provide the transaction id.");
      }

      if (expandMerchant) {
        return client.get(`/transactions/${transactionId}`, {
          params: {
            "expand[]": "merchant",
          },
        });
      }

      return client.get(`/transactions/${transactionId}`);
    },

    annotate: (transactionId, annotations) => {
      if (!transactionId) {
        throw new Error("Please provide the transaction id.");
      }

      if (!annotations) {
        throw new Error("Please provide key-value annotations.");
      }

      // append metadata in front of each key
      const entries = Object.entries(annotations);
      const metadataEntries = entries.map(([key, value]) => [
        `metadata[${key}]`,
        value,
      ]);
      const metadata = Object.fromEntries(metadataEntries);

      const data = encodeData(metadata);

      return client.patch(`/transactions/${transactionId}`, data);
    },
  };
};
