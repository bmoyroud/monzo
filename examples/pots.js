require("dotenv").config();

const Monzo = require("../dist").default;

(async () => {
  const accessToken = process.env.ACCESS_TOKEN;
  const accountId = process.env.ACCOUNT_ID;
  const potId = process.env.POT_ID;

  try {
    const monzo = new Monzo(accessToken);

    // list all pots associated with account
    const pots = await monzo.pots.list(accountId);
    console.log("Pots", pots);

    // pagination (since, before, limit)

    // pots created since 2017
    const t1 = "2017-01-01T00:00:00.00Z";
    const potsSince = await monzo.pots.list(accountId, { since: t1 });
    console.log("Pots created since 2017:", potsSince);

    // pots created before 2019
    const t2 = "2019-01-01T00:00:00.00Z";
    const potsBefore = await monzo.pots.list(accountId, { before: t2 });
    console.log("Pots created before 2019:", potsBefore);

    // pots created between 2017 and 2019
    const potsBetween = await monzo.pots.list(accountId, {
      since: t1,
      before: t2,
    });
    console.log("Pots created between 2017 and 2019:", potsBetween);

    // return 1 account
    const potsLimit = await monzo.pots.list(accountId, { limit: 1 });
    console.log("Pots (limit: 1):", potsLimit);

    // open pots
    // const pots = await monzo.pots.list(accountId);
    const openPots = pots.filter((pot) => !pot.deleted);
    console.log("Open pots:", openPots);

    // deleted pots
    // const pots = await monzo.pots.list(accountId);
    const closedPots = pots.filter((pot) => pot.deleted);
    console.log("Closed pots:", closedPots);

    // locked pots
    // const pots = await monzo.pots.list(accountId);
    const lockedPots = pots.filter((pot) => pot.locked);
    console.log("Locked pots:", lockedPots);

    // deposit into pot
    const dedupeId = Monzo.utils.id();
    const potAfterDeposit = await monzo.pots.deposit(potId, {
      dedupe_id: dedupeId,
      amount: 1,
      source_account_id: accountId,
    });
    console.log("Pot after deposit", potAfterDeposit);

    // withdraw from pot
    // const dedupeId = Monzo.utils.id();
    const potAfterWithdrawal = await monzo.pots.withdraw(potId, {
      dedupe_id: dedupeId,
      amount: 2,
      destination_account_id: accountId,
    });
    console.log("Pot after withdrawal", potAfterWithdrawal);
  } catch (err) {
    console.log("Error", err);
  }
})();
