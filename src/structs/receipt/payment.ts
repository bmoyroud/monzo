import {
  assign,
  dynamic,
  enums,
  Infer,
  number,
  object,
  optional,
  size,
  string,
} from "superstruct";
import { Currency } from "../common";

// TODO: move valid payment types to constants?
export type PaymentType = Infer<typeof PaymentType>;
const PaymentType = enums(["card", "cash", "gift_card"]);

const LastFour = size(string(), 4);

const BasePayment = object({
  type: PaymentType,
  amount: number(),
  currency: Currency,
});

const CardPayment = assign(
  BasePayment,
  object({
    last_four: optional(LastFour),
  })
);

const GiftCardPayment = assign(
  BasePayment,
  object({
    gift_card_type: optional(string()),
  })
);

export const Payment = dynamic((val, _) => {
  // @ts-ignore
  switch (val.type) {
    case "card":
      return CardPayment;
    case "gift_card":
      return GiftCardPayment;
    case "cash":
    default:
      return BasePayment;
  }
});
