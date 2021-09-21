(async () => {
  const Monzo = require("./src");

  const accessToken = process.env.ACCESS_TOKEN;
  const accountId = process.env.ACCOUNT_ID;
  const potId = process.env.POT_ID;
  const transactionId = process.env.TRANSACTION_ID;
  const receiptExternalId = process.env.RECEIPT_EXTERNAL_ID;

  const imageURL =
    "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG";

  const monzo = new Monzo(accessToken);

  try {
    const whoAmI = await monzo.whoAmI();
    console.log("Who am I", whoAmI);

    const accounts = await monzo.accounts.list({ account_type: "uk_prepaid" });
    console.log("Accounts", accounts);

    const balance = await monzo.balance.retrieve({ account_id: accountId });
    console.log("Balance", balance);

    const pots = await monzo.pots.list({ current_account_id: accountId });
    console.log("Pots", pots);

    const potAfterDeposit = await monzo.pots.deposit({
      pot_id: potId,
      source_account_id: accountId,
      amount: 1,
      dedupe_id: "some_unique_string1",
    });
    console.log("Pot after deposit", potAfterDeposit);

    const potAfterWithdrawal = await monzo.pots.withdraw({
      pot_id: potId,
      destination_account_id: accountId,
      amount: 2,
      dedupe_id: "some_unique_string1",
    });
    console.log("Pot after withdrawal", potAfterWithdrawal);

    const transactions = await monzo.transactions.list({
      account_id: accountId,
      since: "",
      before: "2021-09-01T23:00:00Z",
    });
    console.log("Transactions", transactions);

    const transaction = await monzo.transactions.retrieve({
      transaction_id: transactionId,
    });
    console.log("Transaction", transaction);

    const transactionExpanded = await monzo.transactions.retrieve({
      transaction_id: transactionId,
      expand_merchant: true,
    });
    console.log("Transaction expanded", transactionExpanded);

    const transactionAfterAnnotation = await monzo.transactions.annotate({
      transaction_id: transactionId,
      annotations: { hi: "test" },
    });
    console.log("Transaction after annotation", transactionAfterAnnotation);

    await monzo.feed.create({
      account_id: accountId,
      type: "basic",
      params: {
        title: "feed item title",
        image_url: imageURL,
      },
    });
    console.log("Feed item successfully created.");

    const urls = await monzo.attachment.upload({
      file_name: "receipt.png",
      file_type: "image/png",
      content_length: 1000,
    });
    console.log("Attachment URLs", urls);

    const attachment = await monzo.attachment.register({
      external_id: transactionId,
      file_url: imageURL,
      file_type: "image/png",
    });
    console.log("Attachment", attachment);

    await monzo.attachment.deregister({ id: attachment.id });
    console.log("Attachment successfully deregistered.");

    await monzo.receipts.create({
      transaction_id: transactionId,
      external_id: receiptExternalId,
      total: 700,
      currency: "GBP",
      items: [
        {
          description: "Test",
          amount: 700,
          currency: "GBP",
        },
      ],
    });
    console.log("Receipt successfully created / updated.");

    const receiptId = "some_id";

    const receipt = await monzo.receipts.retrieve({ external_id: receiptId });
    console.log("Receipt", receipt);

    await monzo.receipts.delete({ external_id: receiptId });
    console.log("Receipt successfully deleted.");

    const webhook = await monzo.webhooks.create({
      account_id: accountId,
      url: "https://requestbin.com/r/enn8nks932hpg",
    });
    console.log("Webhook", webhook);

    const webhooks = await monzo.webhooks.list({ account_id: accountId });
    console.log("Webhooks", webhooks);

    for (let i = 0; i < webhooks.length; i++) {
      const { id: webhookId } = webhooks[i];
      await monzo.webhooks.delete({ webhook_id: webhookId });
      console.log(`Webhook ${webhookId} successfully deleted.`);
    }
  } catch (err) {
    console.log("Error", err);
  }
})();
