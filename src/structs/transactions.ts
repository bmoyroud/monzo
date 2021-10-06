import { object, Infer, assign, boolean, optional } from "superstruct";
import { Pagination } from "./common";

export type ExpandMerchant = Infer<typeof ExpandMerchant>;
export const ExpandMerchant = object({
  expandMerchant: optional(boolean()),
});

export type Options = Infer<typeof Options>;
export const Options = assign(ExpandMerchant, Pagination);

export type Annotations = Infer<typeof Annotations>;
export const Annotations = object();
