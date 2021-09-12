(async () => {
  const Monzo = require("./src");

  const accessToken = process.env.ACCESS_TOKEN;
  const accountId = process.env.ACCOUNT_ID;
  const potId = process.env.POT_ID;
  const transactionId = process.env.TRANSACTION_ID;

  const monzo = new Monzo(accessToken);

  const whoAmI = await monzo.whoAmI;
  console.log("Who am I", whoAmI);

  const accounts = await monzo.accounts.list();
  console.log("Accounts", accounts);

  const balance = await monzo.balance(accountId);
  console.log("Balance", balance);

  const pots = await monzo.pots.list(accountId);
  console.log("Pots", pots);

  const potAfterDeposit = await monzo.pots.deposit(
    potId,
    accountId,
    1,
    "some_unique_string1"
  );
  console.log("Pot after deposit", potAfterDeposit);

  const potAfterWithdrawal = await monzo.pots.withdraw(
    potId,
    accountId,
    2,
    "some_unique_string1"
  );
  console.log("Pot after withdrawal", potAfterWithdrawal);

  // const transactions = await monzo.transactions.list(
  //   accountId,
  //   "",
  //   "2021-09-01T23:00:00Z"
  // );
  // console.log("Transactions", transactions);

  const transaction = await monzo.transactions.retrieve(transactionId);
  console.log("Transaction", transaction);

  const transactionExpanded = await monzo.transactions.retrieve(
    transactionId,
    true
  );
  console.log("Transaction expanded", transactionExpanded);
})();
