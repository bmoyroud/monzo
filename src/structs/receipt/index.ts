import { array, object, optional, string } from "superstruct";
import { Id } from "../common/id";
import { Positive } from "../common/refinements";
import { Currency } from "./currency";
import { Items } from "./items";
import { Merchant } from "./merchant";
import { Payment } from "./payment";
import { Tax } from "./tax";

export const Receipt = object({
  transaction_id: Id,
  external_id: Id,
  total: Positive,
  currency: Currency,
  items: Items,
  taxes: optional(array(Tax)),
  payments: optional(array(Payment)),
  merchant: optional(Merchant),
});
