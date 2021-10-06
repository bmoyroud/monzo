import {
  WHO_AM_I_URL,
  BALANCE_URL,
  ACCOUNTS_URL,
  POTS_URL,
  TRANSACTIONS_URL,
  FEED_URL,
  ATTACHMENT_URL,
  RECEIPTS_URL,
  WEBHOOKS_URL,
} from "../constants/urls";

export const buildWhoAmIUrl = () => WHO_AM_I_URL;

export const buildBalanceUrl = () => BALANCE_URL;

export const buildAccountsUrl = () => ACCOUNTS_URL;

export const buildPotsUrl = () => POTS_URL;
export const buildPotsDepositUrl = (id: string) => `${POTS_URL}/${id}/deposit`;
export const buildPotsWithdrawalUrl = (id: string) =>
  `${POTS_URL}/${id}/withdraw`;

export const buildTransactionsUrl = () => TRANSACTIONS_URL;
export const buildTransactionUrl = (id: string) => `${TRANSACTIONS_URL}/${id}`;

export const buildFeedUrl = () => FEED_URL;

export const buildAttachmentUploadUrl = () => `${ATTACHMENT_URL}/upload`;
export const buildAttachmentRegisterUrl = () => `${ATTACHMENT_URL}/register`;
export const buildAttachmentDeregisterUrl = () =>
  `${ATTACHMENT_URL}/deregister`;

export const buildReceiptsUrl = () => RECEIPTS_URL;

export const buildWebhooksUrl = () => WEBHOOKS_URL;
export const buildWebhookUrl = (id: string) => `${WEBHOOKS_URL}/${id}`;
