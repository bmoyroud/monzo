import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { Id } from "../structs/common";
import { Upload, Register } from "../structs/attachments";
import { AttachmentRes, EmptyRes, UploadRes } from "../types/monzo-api";
import {
  buildAttachmentUploadUrl,
  buildAttachmentRegisterUrl,
  buildAttachmentDeregisterUrl,
} from "../utils/urls";
import { encodeData } from "../utils/http";

class AttachmentsEndpoint extends Endpoint {
  upload(args: Upload) {
    assert(args, Upload);

    const endpointUrl = buildAttachmentUploadUrl();

    const data = encodeData(args);

    return this.client.post<void, UploadRes>(endpointUrl, data);
  }

  register(args: Register) {
    assert(args, Register);

    const endpointUrl = buildAttachmentRegisterUrl();

    const data = encodeData(args);

    return this.client
      .post<void, AttachmentRes>(endpointUrl, data)
      .then((data) => data.attachment);
  }

  deregister(id: Id) {
    assert(id, Id);

    const endpointUrl = buildAttachmentDeregisterUrl();

    const args = { id };
    const data = encodeData(args);

    return this.client.post<void, EmptyRes>(endpointUrl, data);
  }
}

export default AttachmentsEndpoint;
