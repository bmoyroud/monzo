import { assert, Infer } from "superstruct";
import Endpoint from "./endpoint";
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

class AttachmentEndpoint extends Endpoint {
  upload(args: Infer<typeof UploadStruct>) {
    assert(args, UploadStruct);

    const endpointUrl = buildAttachmentUploadUrl();

    const data = encodeData(args);

    return this.client.post<void, Upload>(endpointUrl, data);
  }

  register(args: Infer<typeof Register>) {
    assert(args, Register);

    const endpointUrl = buildAttachmentRegisterUrl();

    const data = encodeData(args);

    return this.client
      .post<void, { attachment: Attachment }>(endpointUrl, data)
      .then((data) => data.attachment);
  }

  deregister(args: Infer<typeof Deregister>) {
    assert(args, Deregister);

    const endpointUrl = buildAttachmentDeregisterUrl();

    const data = encodeData(args);

    return this.client.post<void, {}>(endpointUrl, data);
  }
}

export default AttachmentEndpoint;
