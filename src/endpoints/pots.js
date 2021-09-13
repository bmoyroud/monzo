const {
  buildPotsUrl,
  buildPotsDepositUrl,
  buildPotsWithdrawalUrl,
} = require("../utils/urls");
const { encodeData } = require("../utils/http");

module.exports = (client) => {
  return {
    list: (accountId) => {
      if (!accountId) {
        throw new Error("Please provide the account id.");
      }

      const endpointUrl = buildPotsUrl();

      return client
        .get(endpointUrl, {
          params: {
            current_account_id: accountId,
          },
        })
        .then((data) => data.pots);
    },

    deposit: (potId, accountId, amount, dedupeId) => {
      if (!potId) {
        throw new Error("Please provide the pot id.");
      }

      if (!accountId) {
        throw new Error("Please provide the account id.");
      }

      if (!amount) {
        throw new Error("Please provide the amount to deposit.");
      }

      if (!dedupeId) {
        throw new Error(
          "Please provide a unique string to de-deduplicate deposits."
        );
      }

      const endpointUrl = buildPotsDepositUrl(potId);

      const data = encodeData({
        source_account_id: accountId,
        amount,
        dedupe_id: dedupeId,
      });

      return client.put(endpointUrl, data);
    },

    withdraw: (potId, accountId, amount, dedupeId) => {
      if (!potId) {
        throw new Error("Please provide the pot id.");
      }

      if (!accountId) {
        throw new Error("Please provide the account id.");
      }

      if (!amount) {
        throw new Error("Please provide the amount to deposit.");
      }

      if (!dedupeId) {
        throw new Error(
          "Please provide a unique string to de-deduplicate deposits."
        );
      }

      const endpointUrl = buildPotsWithdrawalUrl(potId);

      const data = encodeData({
        destination_account_id: accountId,
        amount,
        dedupe_id: dedupeId,
      });

      return client.put(endpointUrl, data);
    },
  };
};
