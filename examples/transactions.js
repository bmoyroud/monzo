require("dotenv").config();

const Monzo = require("../dist").default;

(async () => {
  const accessToken = process.env.ACCESS_TOKEN;
  const accountId = process.env.ACCOUNT_ID;
  const transactionId = "tx_0000AByOgHIxJ0pYxkdNQH";

  try {
    const monzo = new Monzo(accessToken);

    // get transaction by its id
    const transaction = await monzo.transactions.retrieve(transactionId);
    console.log("Transaction:", transaction);

    const transactionExpanded = await monzo.transactions.retrieve(
      transactionId,
      {
        expand_merchant: true,
      }
    );
    console.log("Transaction expanded:", transactionExpanded);

    // get all transactions
    // const transactions = await monzo.transactions.list(accountId);
    // console.log("Transactions:", transactions);

    // get transactions in last 90 days
    const t1 = Monzo.utils.last90Days();
    const transactions = await monzo.transactions.list(accountId, {
      since: t1,
    });
    console.log("Transactions (last 90 days):", transactions);

    // get 20 transactions in last 90 days
    const t2 = Monzo.utils.last90Days();
    const transactionsLimit = await monzo.transactions.list(accountId, {
      since: t2,
      limit: 20,
    });
    console.log("20 transactions (last 90 days):", transactionsLimit);

    // get all top ups
    const topUps = transactions.filter((tx) => tx.amount > 0 && tx.is_load);
    console.log("Top ups:", topUps);

    // get all declined
    const declined = transactions.filter((tx) => tx.decline_reason);
    console.log("Declined:", declined);

    // get all authorised (not yet settled)
    const authorised = transactions.filter(
      (tx) => tx.settled === "" && tx.amount_is_pending
    );
    console.log("Authorised:", authorised);

    // get all settled
    const settled = transactions.filter((tx) => tx.settled);
    console.log("Settled:", settled);

    // get all from category 'entertainment'
    const entertainment = transactions.filter(
      (tx) => tx.category === "entertainment"
    );
    console.log("Entertainment:", entertainment);

    const transactionAfterAnnotation = await monzo.transactions.annotate(
      transactionId,
      {
        notes: "updated note!",
      }
    );
    console.log("Transaction after annotation", transactionAfterAnnotation);
  } catch (err) {
    console.log("Error", err);
  }
})();
