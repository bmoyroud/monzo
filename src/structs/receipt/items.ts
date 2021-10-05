import {
  array,
  assign,
  Infer,
  number,
  object,
  optional,
  size,
  string,
} from "superstruct";
import { Currency, Positive } from "../common";

export type BaseItem = Infer<typeof BaseItem>;
const BaseItem = object({
  description: string(),
  amount: number(),
  currency: Currency,
  // despite what docs says - tax field is required!
  tax: number(),
  quantity: Positive,
  unit: optional(string()),
});

const SubItem = BaseItem;

const Item = assign(
  BaseItem,
  object({
    sub_items: optional(array(SubItem)),
  })
);

export type Items = Infer<typeof Items>;
export const Items = size(array(Item), 1, Infinity);
