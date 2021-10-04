import { object, string } from "superstruct";
import { URL } from "./common/refinements";

export const Create = object({
  account_id: string(),
  url: URL,
});
