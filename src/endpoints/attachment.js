const { assert } = require("superstruct");
const Upload = require("../structs/attachment/Upload");
const Register = require("../structs/attachment/Register");
const Deregister = require("../structs/attachment/Deregister");
const {
  buildAttachmentUploadUrl,
  buildAttachmentRegisterUrl,
  buildAttachmentDeregisterUrl,
} = require("../utils/urls");
const { encodeData } = require("../utils/http");

module.exports = (client) => {
  return {
    upload: (params) => {
      assert(params, Upload);

      const endpointUrl = buildAttachmentUploadUrl();

      const data = encodeData(params);

      return client.post(endpointUrl, data);
    },

    register: (params) => {
      assert(params, Register);

      const endpointUrl = buildAttachmentRegisterUrl();

      const data = encodeData(params);

      return client.post(endpointUrl, data).then((data) => data.attachment);
    },

    deregister: (params) => {
      assert(params, Deregister);

      const endpointUrl = buildAttachmentDeregisterUrl();

      const data = encodeData(params);

      return client.post(endpointUrl, data);
    },
  };
};
