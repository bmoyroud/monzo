(async () => {
  const Monzo = require("./src");

  const accessToken = process.env.ACCESS_TOKEN;
  const accountId = process.env.ACCOUNT_ID;
  const potId = process.env.POT_ID;
  const transactionId = process.env.TRANSACTION_ID;
  const receiptId = process.env.RECEIPT_ID;

  const imageURL =
    "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG";

  const monzo = new Monzo(accessToken);

  const whoAmI = await monzo.whoAmI();
  console.log("Who am I", whoAmI);

  const accounts = await monzo.accounts.list();
  console.log("Accounts", accounts);

  const balance = await monzo.balance.retrieve(accountId);
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

  const transactionAfterAnnotation = await monzo.transactions.annotate(
    transactionId,
    { hi: "test" }
  );
  console.log("Transaction after annotation", transactionAfterAnnotation);

  await monzo.feed.create(accountId, "basic", {
    title: "feed item title",
    image_url: imageURL,
  });
  console.log("Feed item successfully created.");

  const urls = await monzo.attachment.upload("receipt.png", "image/png", 1000);
  console.log("Attachment URLs", urls);

  const attachment = await monzo.attachment.register(
    transactionId,
    imageURL,
    "image/png"
  );
  console.log("Attachment", attachment);

  await monzo.attachment.deregister(attachment.id);
  console.log("Attachment successfully deregistered.");

  await monzo.receipts.create({
    transaction_id: transactionId,
    external_id: receiptId,
    total: 10,
    currency: "GBP",
    items: [
      {
        description: "Burger",
        amount: 539,
        currency: "GBP",
      },
    ],
  });
  console.log("Receipt successfully created / updated.");

  const receipt = await monzo.receipts.retrieve(receiptId).catch(console.log);
  console.log("Receipt", receipt);

  await monzo.receipts.delete(receiptId).catch((err) => console.log(err));
  console.log("Receipt successfully deleted.");

  const webhook = await monzo.webhooks.create(
    accountId,
    "https://requestbin.com/r/enn8nks932hpg"
  );
  console.log("Webhook", webhook);

  const webhooks = await monzo.webhooks.list(accountId);
  console.log("Webhooks", webhooks);

  for (let i = 0; i < webhooks.length; i++) {
    const { id: webhookId } = webhooks[i];
    await monzo.webhooks.delete(webhookId);
    console.log(`Webhook ${webhookId} successfully deleted.`);
  }
})();
