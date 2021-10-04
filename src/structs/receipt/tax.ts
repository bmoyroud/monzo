import { number, object, optional, string } from "superstruct";
import { Currency } from "./currency";

export const Tax = object({
  description: string(),
  amount: number(),
  currency: Currency,
  tax_number: optional(string()),
});
