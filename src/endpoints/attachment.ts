import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import UploadStruct from "../structs/attachment/Upload";
import Register from "../structs/attachment/Register";
import Deregister from "../structs/attachment/Deregister";
import { Attachment, Upload } from "../monzo";
import {
  buildAttachmentUploadUrl,
  buildAttachmentRegisterUrl,
  buildAttachmentDeregisterUrl,
} from "../utils/urls";
import { encodeData } from "../utils/http";

export default (client: AxiosInstance) => {
  return {
    upload: (params: Infer<typeof UploadStruct>) => {
      assert(params, UploadStruct);

      const endpointUrl = buildAttachmentUploadUrl();

      const data = encodeData(params);

      return client.post<void, Upload>(endpointUrl, data);
    },

    register: (params: Infer<typeof Register>) => {
      assert(params, Register);

      const endpointUrl = buildAttachmentRegisterUrl();

      const data = encodeData(params);

      return client
        .post<void, { attachment: Attachment }>(endpointUrl, data)
        .then((data) => data.attachment);
    },

    deregister: (params: Infer<typeof Deregister>) => {
      assert(params, Deregister);

      const endpointUrl = buildAttachmentDeregisterUrl();

      const data = encodeData(params);

      return client.post<void, {}>(endpointUrl, data);
    },
  };
};
