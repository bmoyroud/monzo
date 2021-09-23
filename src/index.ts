import axios from "axios";

import endpoints from "./endpoints";

import { MISSING_ACCESS_TOKEN } from "./constants/errors";
import { BASE_URL } from "./constants/urls";
import { buildError } from "./utils/errors";
import { buildHeaders, parseError, parseResponse } from "./utils/http";

class Monzo {
  whoAmI;
  accounts;
  balance;
  pots;
  transactions;
  feed;
  attachment;
  receipts;
  webhooks;

  constructor(accessToken) {
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

    this.whoAmI = endpoints.whoAmI(client);
    this.accounts = endpoints.accounts(client);
    this.balance = endpoints.balance(client);
    this.pots = endpoints.pots(client);
    this.transactions = endpoints.transactions(client);
    this.feed = endpoints.feed(client);
    this.attachment = endpoints.attachment(client);
    this.receipts = endpoints.receipts(client);
    this.webhooks = endpoints.webhooks(client);
  }
}

export default Monzo;
