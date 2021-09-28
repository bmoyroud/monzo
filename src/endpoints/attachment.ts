import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import Upload from "../structs/attachment/Upload";
import Register from "../structs/attachment/Register";
import Deregister from "../structs/attachment/Deregister";
import {
  buildAttachmentUploadUrl,
  buildAttachmentRegisterUrl,
  buildAttachmentDeregisterUrl,
} from "../utils/urls";
import { encodeData } from "../utils/http";

export default (client: AxiosInstance) => {
  return {
    upload: (params: Infer<typeof Upload>) => {
      assert(params, Upload);

      const endpointUrl = buildAttachmentUploadUrl();

      const data = encodeData(params);

      return client.post(endpointUrl, data);
    },

    register: (params: Infer<typeof Register>) => {
      assert(params, Register);

      const endpointUrl = buildAttachmentRegisterUrl();

      const data = encodeData(params);

      return client
        .post<void, any>(endpointUrl, data)
        .then((data) => data.attachment);
    },

    deregister: (params: Infer<typeof Deregister>) => {
      assert(params, Deregister);

      const endpointUrl = buildAttachmentDeregisterUrl();

      const data = encodeData(params);

      return client.post(endpointUrl, data);
    },
  };
};
