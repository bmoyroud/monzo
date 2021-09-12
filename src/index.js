require("dotenv").config();

const axios = require("axios").default;
const url = require("url");

const baseURL = "https://api.monzo.com";

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
    return this.client.get("/ping/whoami").then((response) => response.data);
  }

  get accounts() {
    return {
      list: (accountType) => {
        const accountTypes = ["uk_prepaid", "uk_retail", "uk_retail_joint"];
        if (accountType) {
          if (!accountTypes.includes(accountType)) {
            throw new Error(
              `Please provide a valid account type (${accountTypes.join(
                ", "
              )}).`
            );
          }
          return this.client
            .get("/accounts", {
              params: {
                account_type: accountType,
              },
            })
            .then((response) => response.data);
        }
        return this.client.get("/accounts").then((response) => response.data);
      },
    };
  }

  // TODO: use a getter for consistency?
  balance(accountId) {
    if (!accountId) {
      throw new Error("Please provide the account id.");
    }
    return this.client
      .get("/balance", {
        params: {
          account_id: accountId,
        },
      })
      .then((response) => response.data);
  }

  get pots() {
    return {
      list: (accountId) => {
        if (!accountId) {
          throw new Error("Please provide the account id.");
        }
        return this.client
          .get("/pots", {
            params: {
              current_account_id: accountId,
            },
          })
          .then((response) => response.data);
      },

      deposit: (potId, accountId, amount, dedupeId) => {
        if (!potId) {
          throw new Error("Please provide the pot id.");
        }

        if (!accountId) {
          throw new Error("Please provide the account id.");
        }

        if (!amount) {
          throw new Error("Please provide the amount to deposit.");
        }

        if (!dedupeId) {
          throw new Error(
            "Please provide a unique string to de-deduplicate deposits."
          );
        }

        const data = new url.URLSearchParams({
          source_account_id: accountId,
          amount,
          dedupe_id: dedupeId,
        });

        return this.client
          .put(`/pots/${potId}/deposit`, data)
          .then((response) => response.data);
      },

      withdraw: (potId, accountId, amount, dedupeId) => {
        if (!potId) {
          throw new Error("Please provide the pot id.");
        }

        if (!accountId) {
          throw new Error("Please provide the account id.");
        }

        if (!amount) {
          throw new Error("Please provide the amount to deposit.");
        }

        if (!dedupeId) {
          throw new Error(
            "Please provide a unique string to de-deduplicate deposits."
          );
        }

        const data = new url.URLSearchParams({
          destination_account_id: accountId,
          amount,
          dedupe_id: dedupeId,
        });

        return this.client
          .put(`/pots/${potId}/withdraw`, data)
          .then((response) => response.data);
      },
    };
  }
}

module.exports = Monzo;
