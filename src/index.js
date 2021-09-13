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

  get attachment() {
    return {
      upload: (fileName, fileType, contentLength) => {
        if (!fileName) {
          throw new Error("Please provide file name.");
        }

        if (!fileType) {
          throw new Error("Please provide file content type.");
        }

        if (!contentLength) {
          throw new Error("Please provide content length.");
        }

        const data = new url.URLSearchParams({
          file_name: fileName,
          file_type: fileType,
          content_length: contentLength,
        });

        return this.client
          .post("/attachment/upload", data)
          .then((response) => response.data);
      },

      register: (externalId, fileURL, fileType) => {
        if (!externalId) {
          throw new Error(
            "Please provide the id of the transaction to associate the attachment with."
          );
        }

        if (!fileURL) {
          throw new Error("Please provide URL of the uploaded attachment.");
        }

        if (!fileType) {
          throw new Error("Please provide file content type.");
        }

        const data = new url.URLSearchParams({
          external_id: externalId,
          file_url: fileURL,
          file_type: fileType,
        });

        return this.client
          .post("/attachment/register", data)
          .then((response) => response.data);
      },

      deregister: (id) => {
        if (!id) {
          throw new Error("Please provide the id of attachment to deregister.");
        }

        const data = new url.URLSearchParams({
          id,
        });

        return this.client
          .post("/attachment/deregister", data)
          .then((response) => response.data);
      },
    };
  }

  get receipts() {
    return {
      create: (receipt) => {
        if (!receipt) {
          throw new Error("Please provide receipt.");
        }

        if (!receipt.transaction_id) {
          throw new Error(
            "Please provide the id of the transaction to associate the receipt with."
          );
        }
        if (!receipt.external_id) {
          throw new Error("Please provide a unique identifier.");
        }

        if (!receipt.total) {
          throw new Error("Please provide receipt total.");
        }

        if (!receipt.currency) {
          throw new Error("Please provide receipt currency.");
        }

        if (!receipt.items) {
          throw new Error("Please provide receipt items (can be empty array).");
        }

        return this.client
          .put("/transaction-receipts", receipt)
          .then((response) => response.data);
      },
    };
  }
}

module.exports = Monzo;
