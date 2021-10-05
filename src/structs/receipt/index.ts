import { array, Infer, object, optional } from "superstruct";
import { Currency, Id, Positive } from "../common";
import { Items } from "./items";
import { Merchant } from "./merchant";
import { Payment } from "./payment";
import { Tax } from "./tax";

export type ReceiptReq = Infer<typeof ReceiptReq>;
export const ReceiptReq = object({
  transaction_id: Id,
  external_id: Id,
  total: Positive,
  currency: Currency,
  items: Items,
  taxes: optional(array(Tax)),
  payments: optional(array(Payment)),
  merchant: optional(Merchant),
});
