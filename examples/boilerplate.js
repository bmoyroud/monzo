require("dotenv").config();

const Monzo = require("../dist").default;

(async () => {
  const accessToken = process.env.ACCESS_TOKEN;

  try {
    const monzo = new Monzo(accessToken);

    // your code below
    // HERE
  } catch (err) {
    console.log("Error", err);
  }
})();
