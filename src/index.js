require("dotenv").config();

const axios = require("axios").default;

const baseURL = "https://api.monzo.com";
const endpoints = require("./endpoints");

class Monzo {
  constructor(accessToken) {
    if (!accessToken) {
      throw new Error("Please provide an access token.");
    }

    this.client = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  get whoAmI() {
    return endpoints.whoAmI(this.client);
  }

  get accounts() {
    return endpoints.accounts(this.client);
  }

  get balance() {
    return endpoints.balance(this.client);
  }

  get pots() {
    return endpoints.pots(this.client);
  }

  get transactions() {
    return endpoints.transactions(this.client);
  }

  get feed() {
    return endpoints.feed(this.client);
  }

  get attachment() {
    return endpoints.attachment(this.client);
  }

  get receipts() {
    return endpoints.receipts(this.client);
  }

  get webhooks() {
    return endpoints.webhooks(this.client);
  }
}

module.exports = Monzo;
