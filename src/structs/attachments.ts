import { object, string, number, Infer } from "superstruct";
import { Id } from "./common/id";
import { URL } from "./common/refinements";

// TODO: add enum of accepted file_type types

export type Upload = Infer<typeof Upload>;
export const Upload = object({
  file_name: string(),
  file_type: string(),
  content_length: number(),
});

export type Register = Infer<typeof Register>;
export const Register = object({
  external_id: Id,
  file_url: URL,
  file_type: string(),
});
