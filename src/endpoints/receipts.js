const {
  MISSING_RECEIPT,
  MISSING_RECEIPT_TRANSACTION_ID,
  MISSING_RECEIPT_EXTERNAL_ID,
  MISSING_RECEIPT_TOTAL,
  MISSING_RECEIPT_CURRENCY,
  MISSING_RECEIPT_ITEMS,
  MISSING_RECEIPT_EXTERNAL_ID_2,
} = require("../constants/errors");
const { buildError } = require("../utils/errors");
const { buildReceiptsUrl } = require("../utils/urls");

const endpointUrl = buildReceiptsUrl();

module.exports = (client) => {
  return {
    create: (receipt) => {
      if (!receipt) {
        throw buildError(MISSING_RECEIPT);
      }

      if (!receipt.transaction_id) {
        throw buildError(MISSING_RECEIPT_TRANSACTION_ID);
      }

      if (!receipt.external_id) {
        throw buildError(MISSING_RECEIPT_EXTERNAL_ID);
      }

      if (!receipt.total) {
        throw buildError(MISSING_RECEIPT_TOTAL);
      }

      if (!receipt.currency) {
        throw buildError(MISSING_RECEIPT_CURRENCY);
      }

      if (!receipt.items) {
        throw buildError(MISSING_RECEIPT_ITEMS);
      }

      return client.put(endpointUrl, receipt);
    },

    retrieve: (externalId) => {
      if (!externalId) {
        throw buildError(MISSING_RECEIPT_EXTERNAL_ID_2);
      }

      return client.get(endpointUrl, {
        params: {
          external_id: externalId,
        },
      });
    },

    delete: (externalId) => {
      if (!externalId) {
        throw buildError(MISSING_RECEIPT_EXTERNAL_ID_2);
      }

      return client.delete(endpointUrl, {
        params: {
          external_id: externalId,
        },
      });
    },
  };
};
