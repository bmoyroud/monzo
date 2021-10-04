import { object, string, boolean, optional } from "superstruct";
import { Id } from "./common/id";

export const Retrieve = object({
  transaction_id: Id,
  // TODO: rename to something else?
  // TODO: default to false
  expand_merchant: optional(boolean()),
});

export const Annotate = object({
  transaction_id: Id,
  // TODO: do not check anything
  annotations: object(),
});
