import {
  array,
  assign,
  defaulted,
  number,
  object,
  optional,
  size,
  string,
} from "superstruct";
import { Positive } from "../common/refinements";
import { Currency } from "./currency";

const Quantity = defaulted(Positive, 1);

const Item = object({
  description: string(),
  amount: number(),
  currency: Currency,
  tax: number(),
  quantity: optional(Quantity),
  unit: optional(string()),
});

const ReceiptItem = assign(
  Item,
  object({
    sub_items: optional(array(Item)),
  })
);

export const Items = size(array(ReceiptItem), 1, Infinity);
