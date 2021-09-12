require("dotenv").config();
const axios = require("axios").default;

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
    };
  }
}

(async () => {
  const accessToken = process.env.ACCESS_TOKEN;
  const monzo = new Monzo(accessToken);

  const accounts = await monzo.accounts.list();
  console.log("Accounts", accounts);

  const accountId = process.env.ACCOUNT_ID;

  const balance = await monzo.balance(accountId);
  console.log("Balance", balance);

  const pots = await monzo.pots.list(accountId);
  console.log("Pots", pots);
})();
