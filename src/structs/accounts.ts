import { enums, Infer } from "superstruct";
import { accounts } from "../constants/types";

export type AccountType = Infer<typeof AccountType>;
export const AccountType = enums(accounts);
