import axios from "axios";

import {
  AuthEndpoint,
  AccountsEndpoint,
  BalanceEndpoint,
  PotsEndpoint,
  TransactionsEndpoint,
  FeedEndpoint,
  AttachmentsEndpoint,
  ReceiptsEndpoint,
  WebhooksEndpoint,
} from "./endpoints";
import Utils from "./utils";

import { MISSING_ACCESS_TOKEN } from "./constants/errors";
import { BASE_URL } from "./constants/urls";
import { buildError } from "./helpers/errors";
import { buildHeaders, parseError, parseResponse } from "./helpers/http";

class Monzo {
  public auth;
  public accounts;
  public balance;
  public pots;
  public transactions;
  public feed;
  public attachments;
  public receipts;
  public webhooks;

  public static utils = Utils;

  constructor(accessToken: string) {
    if (!accessToken) {
      throw buildError(MISSING_ACCESS_TOKEN);
    }

    const client = axios.create({
      baseURL: BASE_URL,
      headers: buildHeaders(accessToken),
    });

    client.interceptors.response.use(
      (res) => parseResponse(res),
      (err) => parseError(err)
    );

    this.auth = new AuthEndpoint(client);
    this.accounts = new AccountsEndpoint(client);
    this.balance = new BalanceEndpoint(client);
    this.pots = new PotsEndpoint(client);
    this.transactions = new TransactionsEndpoint(client);
    this.feed = new FeedEndpoint(client);
    this.attachments = new AttachmentsEndpoint(client);
    this.receipts = new ReceiptsEndpoint(client);
    this.webhooks = new WebhooksEndpoint(client);
  }
}

export default Monzo;
