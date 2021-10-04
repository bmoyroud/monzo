import { string, object } from "superstruct";

export const Id = string();

export const AccountId = object({
  account_id: Id,
});
