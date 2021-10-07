require("dotenv").config();

const Monzo = require("../dist").default;

(async () => {
  const accessToken = process.env.ACCESS_TOKEN;
  const accountId = process.env.ACCOUNT_ID;

  try {
    const monzo = new Monzo(accessToken);

    // create a webhook for associated account
    const webhook = await monzo.webhooks.create({
      account_id: accountId,
      url: "https://requestbin.com/r/enn8nks932hpg",
    });
    console.log("Webhook", webhook);

    // list all webhooks
    const webhooks = await monzo.webhooks.list(accountId);
    console.log("All webhooks:", webhooks.length);

    // return 5 last webhooks
    const webhooksLimit = await monzo.webhooks.list(accountId, { limit: 5 });
    console.log("Webhooks (limit: 5):", webhooksLimit);

    // delete webhook
    await monzo.webhooks.delete(webhook.id);
    console.log(`Successfully deleted webhook id ${webhook.id}.`);

    // delete all webhooks for associated account
    // await monzo.webhooks.deleteAll(accountId);
    // console.log(`Successfully deleted all webhooks for account id ${accountId}.`)
  } catch (err) {
    console.log("Error", err);
  }
})();
