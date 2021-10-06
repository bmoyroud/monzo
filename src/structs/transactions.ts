import { object, Infer } from "superstruct";
import { Id } from "./common";

export type Annotate = Infer<typeof Annotate>;
export const Annotate = object({
  transaction_id: Id,
  // TODO: do not check anything
  annotations: object(),
});
