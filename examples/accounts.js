require("dotenv").config();

const Monzo = require("../dist").default;

(async () => {
  const accessToken = process.env.ACCESS_TOKEN;

  try {
    const monzo = new Monzo(accessToken);

    // all accounts (no filtering)
    const accounts = await monzo.accounts.list();
    console.log("All:", accounts);

    // account_type
    // prepaid account
    const prepaidAccounts = await monzo.accounts.list({
      account_type: "uk_prepaid",
    });
    const prepaidAccount = prepaidAccounts[0];
    console.log("Prepaid:", prepaidAccount);

    // current account
    const currentAccounts = await monzo.accounts.list({
      account_type: "uk_retail",
    });
    const currentAccount = currentAccounts[0];
    console.log("Current:", currentAccount);

    // joint account
    const jointAccounts = await monzo.accounts.list({
      account_type: "uk_retail_joint",
    });
    const jointAccount = jointAccounts[0];
    console.log("Joint:", jointAccount);

    // pagination (since, before, limit)

    // accounts created since 2017
    const t1 = "2017-01-01T00:00:00.00Z";
    const accountsSince = await monzo.accounts.list({ since: t1 });
    console.log("Accounts created since 2017:", accountsSince);

    // accounts created before 2019
    const t2 = "2019-01-01T00:00:00.00Z";
    const accountsBefore = await monzo.accounts.list({ before: t2 });
    console.log("Accounts created before 2018:", accountsBefore);

    // accounts created between 2017 and 2019
    const accountsBetween = await monzo.accounts.list({
      since: t1,
      before: t2,
    });
    console.log("Accounts created in 2017:", accountsBetween);

    // return 1 account
    const accountsLimit = await monzo.accounts.list({ limit: 1 });
    console.log("Account (limit: 1):", accountsLimit);

    // open accounts
    // const accounts = await monzo.accounts.list();
    const openAccounts = accounts.filter((acc) => !acc.closed);
    console.log("Open accounts:", openAccounts);

    // closed accounts
    // const accounts = await monzo.accounts.list();
    const closedAccounts = accounts.filter((acc) => acc.closed);
    console.log("Closed accounts:", closedAccounts);
  } catch (err) {
    console.log("Error", err);
  }
})();
