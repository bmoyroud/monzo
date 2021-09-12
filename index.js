const axios = require("axios").default;

const baseURL = "https://api.monzo.com";

// TODO: move to .env
const accessToken = "ACCESS_TOKEN";

const instance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

// List accounts
instance
  .get("/accounts")
  .then((response) => response.data)
  .then((data) => console.log(data))
  .catch(console.log);
