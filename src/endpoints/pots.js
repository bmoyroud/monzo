const url = require("url");

module.exports = (client) => {
  return {
    list: (accountId) => {
      if (!accountId) {
        throw new Error("Please provide the account id.");
      }
      return client
        .get("/pots", {
          params: {
            current_account_id: accountId,
          },
        })
        .then((response) => response.data);
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

      const data = new url.URLSearchParams({
        source_account_id: accountId,
        amount,
        dedupe_id: dedupeId,
      });

      return client
        .put(`/pots/${potId}/deposit`, data)
        .then((response) => response.data);
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

      const data = new url.URLSearchParams({
        destination_account_id: accountId,
        amount,
        dedupe_id: dedupeId,
      });

      return client
        .put(`/pots/${potId}/withdraw`, data)
        .then((response) => response.data);
    },
  };
};
