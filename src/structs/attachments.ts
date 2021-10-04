import { object, string, number } from "superstruct";
import { URL } from "./common/refinements";

// TODO: add enum of accepted file_type types

export const Register = object({
  external_id: string(),
  file_url: URL,
  file_type: string(),
});

export const Upload = object({
  file_name: string(),
  file_type: string(),
  content_length: number(),
});
