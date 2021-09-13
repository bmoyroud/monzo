const {
  buildAttachmentUploadUrl,
  buildAttachmentRegisterUrl,
  buildAttachmentDeregisterUrl,
} = require("../utils/urls");
const { encodeData } = require("../utils/http");

module.exports = (client) => {
  return {
    upload: (fileName, fileType, contentLength) => {
      if (!fileName) {
        throw new Error("Please provide file name.");
      }

      if (!fileType) {
        throw new Error("Please provide file content type.");
      }

      if (!contentLength) {
        throw new Error("Please provide content length.");
      }

      const endpointUrl = buildAttachmentUploadUrl();

      const data = encodeData({
        file_name: fileName,
        file_type: fileType,
        content_length: contentLength,
      });

      return client.post(endpointUrl, data);
    },

    register: (externalId, fileURL, fileType) => {
      if (!externalId) {
        throw new Error(
          "Please provide the id of the transaction to associate the attachment with."
        );
      }

      if (!fileURL) {
        throw new Error("Please provide URL of the uploaded attachment.");
      }

      if (!fileType) {
        throw new Error("Please provide file content type.");
      }

      const endpointUrl = buildAttachmentRegisterUrl();

      const data = encodeData({
        external_id: externalId,
        file_url: fileURL,
        file_type: fileType,
      });

      return client.post(endpointUrl, data).then((data) => data.attachment);
    },

    deregister: (id) => {
      if (!id) {
        throw new Error("Please provide the id of attachment to deregister.");
      }

      const endpointUrl = buildAttachmentDeregisterUrl();

      const data = encodeData({ id });

      return client.post(endpointUrl, data);
    },
  };
};
