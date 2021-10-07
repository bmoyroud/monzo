require("dotenv").config();

const Monzo = require("../dist").default;

(async () => {
  const accessToken = process.env.ACCESS_TOKEN;
  const accountId = process.env.ACCOUNT_ID;

  try {
    const monzo = new Monzo(accessToken);

    // balance info for a specific account
    const balanceInfo = await monzo.balance.retrieve(accountId);
    console.log("Balance info:", balanceInfo);

    // amount spent today
    const spentToday = balanceInfo.spend_today;
    console.log("Spent today:", spentToday);
  } catch (err) {
    console.log("Error", err);
  }
})();
