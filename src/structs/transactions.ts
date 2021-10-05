import { object, boolean, optional, Infer } from "superstruct";
import { Id } from "./common";

export type Retrieve = Infer<typeof Retrieve>;
export const Retrieve = object({
  transaction_id: Id,
  // TODO: rename to something else?
  // TODO: default to false
  expand_merchant: optional(boolean()),
});

export type Annotate = Infer<typeof Annotate>;
export const Annotate = object({
  transaction_id: Id,
  // TODO: do not check anything
  annotations: object(),
});
