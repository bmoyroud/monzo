const {
  MISSING_FILE_NAME,
  MISSING_FILE_CONTENT_TYPE,
  MISSING_CONTENT_LENGTH,
  MISSING_ATTACHMENT_TRANSACTION_ID,
  MISSING_FILE_URL,
  MISSING_ID_DEREGISTER,
} = require("../constants/errors");
const { buildError } = require("../utils/errors");
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
        throw buildError(MISSING_FILE_NAME);
      }

      if (!fileType) {
        throw buildError(MISSING_FILE_CONTENT_TYPE);
      }

      if (!contentLength) {
        throw buildError(MISSING_CONTENT_LENGTH);
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
        throw buildError(MISSING_ATTACHMENT_TRANSACTION_ID);
      }

      if (!fileURL) {
        throw buildError(MISSING_FILE_URL);
      }

      if (!fileType) {
        throw buildError(MISSING_FILE_CONTENT_TYPE);
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
        throw buildError(MISSING_ID_DEREGISTER);
      }

      const endpointUrl = buildAttachmentDeregisterUrl();

      const data = encodeData({ id });

      return client.post(endpointUrl, data);
    },
  };
};
