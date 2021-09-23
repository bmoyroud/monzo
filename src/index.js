const axios = require("axios").default;

const endpoints = require("./endpoints");

const { MISSING_ACCESS_TOKEN } = require("./constants/errors");
const { BASE_URL } = require("./constants/urls");
const { buildError } = require("./utils/errors");
const { buildHeaders, parseResponse, parseError } = require("./utils/http");

class Monzo {
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

module.exports = Monzo;
