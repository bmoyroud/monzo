const {
  WHO_AM_I_URL,
  BALANCE_URL,
  ACCOUNTS_URL,
  POTS_URL,
  TRANSACTIONS_URL,
  FEED_URL,
  ATTACHMENT_URL,
  RECEIPTS_URL,
  WEBHOOKS_URL,
} = require("../constants/urls");

module.exports = {
  buildWhoAmIUrl: () => WHO_AM_I_URL,

  buildBalanceUrl: () => BALANCE_URL,

  buildAccountsUrl: () => ACCOUNTS_URL,

  buildPotsUrl: () => POTS_URL,
  buildPotsDepositUrl: (id) => `${POTS_URL}/${id}/deposit`,
  buildPotsWithdrawalUrl: (id) => `${POTS_URL}/${id}/withdraw`,

  buildTransactionsUrl: () => TRANSACTIONS_URL,
  buildTransactionUrl: (id) => `${TRANSACTIONS_URL}/${id}`,

  buildFeedUrl: () => FEED_URL,

  buildAttachmentUploadUrl: () => `${ATTACHMENT_URL}/upload`,
  buildAttachmentRegisterUrl: () => `${ATTACHMENT_URL}/register`,
  buildAttachmentDeregisterUrl: () => `${ATTACHMENT_URL}/deregister`,

  buildReceiptsUrl: () => RECEIPTS_URL,

  buildWebhooksUrl: () => WEBHOOKS_URL,
  buildWebhookUrl: (id) => `${WEBHOOKS_URL}/${id}`,
};
