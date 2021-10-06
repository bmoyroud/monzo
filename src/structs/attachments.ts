import { object, string, number, Infer, enums } from "superstruct";
import { fileTypes } from "../constants/arrays";
import { Id, URL } from "./common";

export type FileType = Infer<typeof FileType>;
const FileType = enums(fileTypes);

export type Upload = Infer<typeof Upload>;
export const Upload = object({
  file_name: string(),
  file_type: FileType,
  content_length: number(),
});

export type Register = Infer<typeof Register>;
export const Register = object({
  external_id: Id,
  file_url: URL,
  file_type: FileType,
});
