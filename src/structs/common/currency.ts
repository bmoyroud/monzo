import { enums, Infer } from "superstruct";
import { currencies } from "../../constants/types";

export type Currency = Infer<typeof Currency>;
export const Currency = enums(currencies);
