const axios = require("axios").default;

const baseURL = "https://api.monzo.com";

// TODO: move to .env
const accessToken =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYiI6IlBjNGV4ZGFnUWdPeWM2YTNKbjR0IiwianRpIjoiYWNjdG9rXzAwMDBBQkh0cVp0UG5FSVRCWHl4cmwiLCJ0eXAiOiJhdCIsInYiOiI2In0.ryWyNsAzG4-5VAHNBze3696wmab_a6ZJFptHaEIQ4e3-1gY6D_epfnLnS9lgkKlc0X0kUWrFhg2Jw5RHfRryfw";

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
}

(async () => {
  const monzo = new Monzo(accessToken);

  const accounts = await monzo.accounts.list();
  console.log("Accounts", accounts);

  const balance = await monzo.balance("acc_00009GO9ZevTx6Ky3l9r7p");
  console.log("Balance", balance);
})();
