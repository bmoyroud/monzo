import { object, string, boolean, optional } from "superstruct";

export const Retrieve = object({
  transaction_id: string(),
  // TODO: rename to something else?
  // TODO: default to false
  expand_merchant: optional(boolean()),
});

export const Annotate = object({
  transaction_id: string(),
  // TODO: do not check anything
  annotations: object(),
});
