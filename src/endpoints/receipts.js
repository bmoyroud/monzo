module.exports = (client) => {
  return {
    create: (receipt) => {
      if (!receipt) {
        throw new Error("Please provide receipt.");
      }

      if (!receipt.transaction_id) {
        throw new Error(
          "Please provide the id of the transaction to associate the receipt with."
        );
      }
      if (!receipt.external_id) {
        throw new Error("Please provide a unique identifier.");
      }

      if (!receipt.total) {
        throw new Error("Please provide receipt total.");
      }

      if (!receipt.currency) {
        throw new Error("Please provide receipt currency.");
      }

      if (!receipt.items) {
        throw new Error("Please provide receipt items (can be empty array).");
      }

      return client
        .put("/transaction-receipts", receipt)
        .then((response) => response.data);
    },

    retrieve: (externalId) => {
      if (!externalId) {
        throw new Error("Please provide external id of receipt.");
      }

      return client
        .get("/transaction-receipts", {
          params: {
            external_id: externalId,
          },
        })
        .then((response) => response.data);
    },

    delete: (externalId) => {
      if (!externalId) {
        throw new Error("Please provide external id of receipt.");
      }

      return client
        .delete("/transaction-receipts", {
          params: {
            external_id: externalId,
          },
        })
        .then((response) => response.data);
    },
  };
};
