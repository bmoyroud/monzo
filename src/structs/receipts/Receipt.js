const {
  object,
  string,
  number,
  array,
  optional,
  enums,
  boolean,
} = require("superstruct");

const ReceiptItem = object({
  description: string(),
  amount: number(),
  // TODO: replace with enum and list of valid currencies?
  currency: string(),
  quantity: optional(number()),
  unit: optional(string()),
  tax: optional(number()),
  // TODO: how to deal with cyclical?
  // sub_items: optional(array(ReceiptItem)),
});

const Tax = object({
  description: string(),
  amount: number(),
  currency: string(),
  tax_number: optional(string()),
});

const Payment = object({
  // TODO: move valid payment types to constants?
  type: enums(["cash", "cash", "gift_card"]),
  amount: number(),
  currency: string(),
  last_four: optional(string()),
  gift_card_type: optional(string()),
});

const Merchant = object({
  name: optional(string()),
  online: optional(boolean()),
  phone: optional(string()),
  email: optional(string()),
  store_name: optional(string()),
  store_address: optional(string()),
  store_postcode: optional(string()),
});

const Receipt = object({
  transaction_id: string(),
  external_id: string(),
  total: number(),
  // TODO: replace with enum and list of valid currencies?
  currency: string(),
  items: array(ReceiptItem),
  taxes: optional(array(Tax)),
  payments: optional(array(Payment)),
  merchant: optional(Merchant),
});

module.exports = Receipt;
