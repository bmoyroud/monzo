import {
  assign,
  dynamic,
  enums,
  Infer,
  literal,
  number,
  object,
  optional,
  size,
  string,
} from "superstruct";
import { Currency } from "../common";

// TODO: move valid payment types to constants?
export type PaymentType = Infer<typeof PaymentType>;
const PaymentType = enums(["cash", "card", "gift_card"]);

const LastFour = size(string(), 4);

type BasePayment = Infer<typeof BasePayment>;
const BasePayment = object({
  type: PaymentType,
  amount: number(),
  currency: Currency,
});

type CashPayment = Infer<typeof CashPayment>;
const CashPayment = assign(
  BasePayment,
  object({
    type: literal("cash"),
  })
);

type CardPayment = Infer<typeof CardPayment>;
const CardPayment = assign(
  BasePayment,
  object({
    type: literal("card"),
    last_four: optional(LastFour),
  })
);

type GiftCardPayment = Infer<typeof GiftCardPayment>;
const GiftCardPayment = assign(
  BasePayment,
  object({
    type: literal("gift_card"),
    gift_card_type: optional(string()),
  })
);

// help TypeScript figure out the type
export type Payment = CashPayment | CardPayment | GiftCardPayment;
// @ts-ignore
export const Payment = dynamic<Payment>((val, _) => {
  // @ts-ignore
  switch (val.type) {
    case "card":
      return CardPayment;
    case "gift_card":
      return GiftCardPayment;
    case "cash":
      return CashPayment;
    default:
      throw new Error("Only basic type allowed for feed item.");
  }
});
