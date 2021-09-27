import { assert } from "superstruct";
import Upload from "../structs/attachment/Upload";
import Register from "../structs/attachment/Register";
import Deregister from "../structs/attachment/Deregister";
import {
  buildAttachmentUploadUrl,
  buildAttachmentRegisterUrl,
  buildAttachmentDeregisterUrl,
} from "../utils/urls";
import { encodeData } from "../utils/http";

export default (client) => {
  return {
    upload: (params: object) => {
      assert(params, Upload);

      const endpointUrl = buildAttachmentUploadUrl();

      const data = encodeData(params);

      return client.post(endpointUrl, data);
    },

    register: (params: object) => {
      assert(params, Register);

      const endpointUrl = buildAttachmentRegisterUrl();

      const data = encodeData(params);

      return client.post(endpointUrl, data).then((data) => data.attachment);
    },

    deregister: (params: object) => {
      assert(params, Deregister);

      const endpointUrl = buildAttachmentDeregisterUrl();

      const data = encodeData(params);

      return client.post(endpointUrl, data);
    },
  };
};
