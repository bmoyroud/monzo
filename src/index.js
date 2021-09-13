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
        if (accountType) {
          const accountTypes = ["uk_prepaid", "uk_retail", "uk_retail_joint"];
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

  get transactions() {
    return {
      list: (accountId, since, before) => {
        if (!accountId) {
          throw new Error("Please provide the account id.");
        }

        const params = {
          account_id: accountId,
        };

        if (since) {
          params.since = since;
        }

        if (before) {
          params.before = before;
        }

        return this.client
          .get("/transactions", { params })
          .then((response) => response.data);
      },

      retrieve: (transactionId, expandMerchant = false) => {
        if (!transactionId) {
          throw new Error("Please provide the transaction id.");
        }

        if (expandMerchant) {
          return this.client
            .get(`/transactions/${transactionId}`, {
              params: {
                "expand[]": "merchant",
              },
            })
            .then((response) => response.data);
        }

        return this.client
          .get(`/transactions/${transactionId}`)
          .then((response) => response.data);
      },

      annotate: (transactionId, annotations) => {
        if (!transactionId) {
          throw new Error("Please provide the transaction id.");
        }

        if (!annotations) {
          throw new Error("Please provide key-value annotations.");
        }

        // append metadata in front of each key
        const entries = Object.entries(annotations);
        const metadataEntries = entries.map(([key, value]) => [
          `metadata[${key}]`,
          value,
        ]);
        const metadata = Object.fromEntries(metadataEntries);

        const data = new url.URLSearchParams(metadata);

        return this.client
          .patch(`/transactions/${transactionId}`, data)
          .then((response) => response.data);
      },
    };
  }

  get feed() {
    return {
      create: (accountId, type, feedParams, url2) => {
        if (!accountId) {
          throw new Error("Please provide the account id.");
        }

        if (!type) {
          throw new Error("Please provide a type of feed item.");
        }

        const feedItemTypes = ["basic"];
        if (!feedItemTypes.includes(type)) {
          throw new Error(
            `Please provide a valid feed item type (${feedItemTypes.join(
              ", "
            )}).`
          );
        }

        if (!feedParams) {
          throw new Error(
            "Please provide a map of parameters (varies based on type)."
          );
        }

        if (!feedParams.title) {
          throw new Error("Please provide a title to display.");
        }

        if (!feedParams.image_url) {
          throw new Error("Please provide a URL of the image to display.");
        }

        // append params in front of each key
        const entries = Object.entries(feedParams);
        const updatedEntries = entries.map(([key, value]) => [
          `params[${key}]`,
          value,
        ]);
        const updatedFeedParams = Object.fromEntries(updatedEntries);

        const data = {
          account_id: accountId,
          type,
          ...updatedFeedParams,
        };

        if (url2) {
          data.url = url2;
        }

        const formattedData = new url.URLSearchParams(data);

        return this.client
          .post("/feed", formattedData)
          .then((response) => response.data);
      },
    };
  }
}

module.exports = Monzo;
