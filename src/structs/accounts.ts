import { enums, Infer } from "superstruct";
import { accounts } from "../constants/arrays";

export type AccountType = Infer<typeof AccountType>;
export const AccountType = enums(accounts);
