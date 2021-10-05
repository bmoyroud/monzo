import { enums, number, object, optional, string } from "superstruct";
import { Currency } from "../common";

// TODO: move valid payment types to constants?
const PaymentType = enums(["cash", "cash", "gift_card"]);

export const Payment = object({
  type: PaymentType,
  amount: number(),
  currency: Currency,
  last_four: optional(string()),
  gift_card_type: optional(string()),
});
