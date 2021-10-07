# Attachments

[/attachment](https://docs.monzo.com/#attachments)

Images (eg. receipts) can be attached to transactions by uploading these via the attachment API. Once an attachment is registered against a transaction, the image will be shown in the transaction detail screen within the Monzo app.

There are two options for attaching images to transactions - either Monzo can host the image, or remote images can be displayed.

If Monzo is hosting the attachment the upload process consists of three steps:

1. Obtain a temporary authorised URL to upload the attachment to.
2. Upload the file to this URL.
3. Register the attachment against a transaction.

If you are hosting the attachment, you can simply register the attachment with the transaction:

1. Register the attachment against a transaction.

## `.upload(args)`

The first step when uploading an attachment is to obtain a temporary URL to which the file can be uploaded.

The response will include a `file_url` which will be the URL of the resulting file, and an `upload_url` to which the file should be uploaded to.

| Name                  | Required | Type                            | Description                                                   |
| --------------------- | -------- | ------------------------------- | ------------------------------------------------------------- |
| `args.file_name`      | yes      | string                          | The name of the file to be uploaded                           |
| `args.file_type`      | yes      | TODO: add list of allowed types | The content type of the file                                  |
| `args.content_length` | yes      | number                          | The HTTP Content-Length of the upload request body, in bytes. |
|                       |

## `.register(args)`

Once you have obtained a URL for an attachment, either by uploading to the upload_url obtained from the upload endpoint above or by hosting a remote image, this URL can then be registered against a transaction.

Once an attachment is registered against a transaction this will be displayed on the detail page of a transaction within the Monzo app.

Returns the attachment.

| Name               | Required | Type                            | Description                                                 |
| ------------------ | -------- | ------------------------------- | ----------------------------------------------------------- |
| `args.external_id` | yes      | string                          | The id of the transaction to associate the attachment with. |
| `args.file_url`    | yes      | string                          | The URL of the uploaded attachment.                         |
| `args.file_type`   | yes      | TODO: add list of allowed types | The content type of the attachment.                         |
|                    |

## `.deregister(attachmentId)`

To remove an attachment, simply deregister this using its id

| Name           | Required | Type   |
| -------------- | -------- | ------ |
| `attachmentId` | yes      | string |

## Examples

### Get attachment URLs

```javascript
const urls = await monzo.attachments.upload({
  file_name: "receipt.png",
  file_type: "image/png",
  content_length: 1000,
});
```

### Register attachment

```javascript
const transactionId = "tx_id";
const attachment = await monzo.attachments.register({
  external_id: transactionId,
  file_url:
    "https://lh3.googleusercontent.com/MFxUoYL3SyJ_v-2c2rPceoiRG6N8bOCBRPBxF_tvfpnAZ_9BeDuKpV6CML_nPk7KzRpNYH7dr-8yoktRg6Z4lh0lFitG2eAkNDf6=w600",
  file_type: "image/png",
});
```

### Deregister attachment

```javascript
await monzo.attachments.deregister({ id: attachment.id });
```

### Deregister all transaction attachments

```javascript
const transactionId = "tx_id";
const transaction = await monzo.transactions.retrieve(transactionId);
for (const attachment of transaction.attachments) {
  await monzo.attachments.deregister({ id: attachment.id });
}
```

TODO: add method to upload file directly?
