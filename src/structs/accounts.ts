import { assign, enums, Infer, object, optional } from "superstruct";
import { accountTypes } from "../constants/arrays";
import { Pagination } from "./common";

export type AccountType = Infer<typeof AccountType>;
const AccountType = enums(accountTypes);

export type List = Infer<typeof List>;
export const List = assign(
  object({
    account_type: optional(AccountType),
  }),
  Pagination
);
