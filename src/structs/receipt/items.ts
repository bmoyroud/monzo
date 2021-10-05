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
import { Currency, Positive } from "../common";

const Quantity = defaulted(Positive, 1);

const Item = object({
  description: string(),
  amount: number(),
  currency: Currency,
  tax: number(),
  quantity: optional(Quantity),
  unit: optional(string()),
});

const SubItem = Item;

const MainItem = assign(
  Item,
  object({
    sub_items: optional(array(SubItem)),
  })
);

export const Items = size(array(MainItem), 1, Infinity);
