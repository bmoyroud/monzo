const {
  MISSING_ACCOUNT_ID,
  MISSING_POT_ID,
  MISSING_AMOUNT_DEPOSIT,
  MISSING_DEDUPE_ID,
  MISSING_AMOUNT_WITHDRAW,
} = require("../constants/errors");
const { buildError } = require("../utils/errors");
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
        throw buildError(MISSING_ACCOUNT_ID);
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
        throw buildError(MISSING_POT_ID);
      }

      if (!accountId) {
        throw buildError(MISSING_ACCOUNT_ID);
      }

      if (!amount) {
        throw buildError(MISSING_AMOUNT_DEPOSIT);
      }

      if (!dedupeId) {
        throw buildError(MISSING_DEDUPE_ID);
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
        throw buildError(MISSING_POT_ID);
      }

      if (!accountId) {
        throw buildError(MISSING_ACCOUNT_ID);
      }

      if (!amount) {
        throw buildError(MISSING_AMOUNT_WITHDRAW);
      }

      if (!dedupeId) {
        throw buildError(MISSING_DEDUPE_ID);
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
