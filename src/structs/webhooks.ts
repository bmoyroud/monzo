import { Infer, object } from "superstruct";
import { Id } from "./common/id";
import { URL } from "./common/refinements";

export type Create = Infer<typeof Create>;
export const Create = object({
  account_id: Id,
  url: URL,
});
