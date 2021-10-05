import { assert, Infer } from "superstruct";
import Endpoint from "./endpoint";
import { Upload as UploadStruct, Register } from "../structs/attachments";
import { Id } from "../structs/common/id";
import { Attachment, Upload } from "../types/monzo";
import {
  buildAttachmentUploadUrl,
  buildAttachmentRegisterUrl,
  buildAttachmentDeregisterUrl,
} from "../utils/urls";
import { encodeData } from "../utils/http";

class AttachmentsEndpoint extends Endpoint {
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

  deregister(id: Infer<typeof Id>) {
    assert(id, Id);

    const endpointUrl = buildAttachmentDeregisterUrl();

    const args = { id };
    const data = encodeData(args);

    return this.client.post<void, {}>(endpointUrl, data);
  }
}

export default AttachmentsEndpoint;
