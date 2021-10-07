require("dotenv").config();

const Monzo = require("../dist").default;

(async () => {
  const accessToken = process.env.ACCESS_TOKEN;

  try {
    const monzo = new Monzo(accessToken);

    // get attachment URLs
    const urls = await monzo.attachments.upload({
      file_name: "receipt.png",
      file_type: "image/png",
      content_length: 1000,
    });
    console.log("Attachment URLs", urls);

    // register attachment
    const transactionId = "tx_0000AByOgHIxJ0pYxkdNQH";
    const attachment = await monzo.attachments.register({
      external_id: transactionId,
      file_url:
        "https://lh3.googleusercontent.com/MFxUoYL3SyJ_v-2c2rPceoiRG6N8bOCBRPBxF_tvfpnAZ_9BeDuKpV6CML_nPk7KzRpNYH7dr-8yoktRg6Z4lh0lFitG2eAkNDf6=w600",
      file_type: "image/png",
    });
    console.log("Attachment", attachment);

    // deregister attachment
    await monzo.attachments.deregister({ id: attachment.id });
    console.log("Attachment successfully deregistered.");

    // deregister all transaction attachments
    const transaction = await monzo.transactions.retrieve(transactionId);
    for (const attachment of transaction.attachments) {
      await monzo.attachments.deregister({ id: attachment.id });
    }
  } catch (err) {
    console.log("Error", err);
  }
})();
