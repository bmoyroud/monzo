const axios = require("axios").default;

const baseURL = "https://api.monzo.com";

// TODO: move to .env
const accessToken =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYiI6IlBjNGV4ZGFnUWdPeWM2YTNKbjR0IiwianRpIjoiYWNjdG9rXzAwMDBBQkh0cVp0UG5FSVRCWHl4cmwiLCJ0eXAiOiJhdCIsInYiOiI2In0.ryWyNsAzG4-5VAHNBze3696wmab_a6ZJFptHaEIQ4e3-1gY6D_epfnLnS9lgkKlc0X0kUWrFhg2Jw5RHfRryfw";

class Monzo {
  constructor(accessToken) {
    this.client = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  get accounts() {
    return {
      list: () =>
        this.client
          .get("/accounts")
          .then((response) => response.data)
          .then((data) => console.log(data))
          .catch(console.log),
    };
  }
}

const monzo = new Monzo(accessToken);
monzo.accounts.list();
