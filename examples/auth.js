require("dotenv").config();

const Monzo = require("../dist").default;

(async () => {
  const accessToken = process.env.ACCESS_TOKEN;

  try {
    const monzo = new Monzo(accessToken);

    const whoAmI = await monzo.auth.whoAmI();
    console.log("Who am I:", whoAmI);
  } catch (err) {
    console.log("Error", err);
  }
})();
