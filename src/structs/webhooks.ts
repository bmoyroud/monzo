import { Infer, object } from "superstruct";
import { Id, URL } from "./common";

export type Create = Infer<typeof Create>;
export const Create = object({
  account_id: Id,
  url: URL,
});
