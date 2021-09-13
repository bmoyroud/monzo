require("dotenv").config();

const axios = require("axios").default;

const baseURL = "https://api.monzo.com";
const endpoints = require("./endpoints");

class Monzo {
  constructor(accessToken) {
    if (!accessToken) {
      throw new Error("Please provide an access token.");
    }

    const client = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    client.interceptors.response.use(
      (res) => res.data,
      (err) => Promise.reject(err.response)
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
