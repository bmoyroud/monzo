const { buildReceiptsUrl } = require("../utils/urls");

const endpointUrl = buildReceiptsUrl();

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

      return client.put(endpointUrl, receipt).catch(console.log);
    },

    retrieve: (externalId) => {
      if (!externalId) {
        throw new Error("Please provide external id of receipt.");
      }

      return client.get(endpointUrl, {
        params: {
          external_id: externalId,
        },
      });
    },

    delete: (externalId) => {
      if (!externalId) {
        throw new Error("Please provide external id of receipt.");
      }

      return client.delete(endpointUrl, {
        params: {
          external_id: externalId,
        },
      });
    },
  };
};
