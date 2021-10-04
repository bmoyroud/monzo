import { object } from "superstruct";
import { Id } from "./common/id";
import { URL } from "./common/refinements";

export const Create = object({
  account_id: Id,
  url: URL,
});
