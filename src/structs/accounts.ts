import { enums, Infer } from "superstruct";
import { accountTypes } from "../constants/arrays";

export type AccountType = Infer<typeof AccountType>;
export const AccountType = enums(accountTypes);
