const {
  object,
  string,
  number,
  array,
  optional,
  enums,
  boolean,
  assign,
  min,
  defaulted,
} = require("superstruct");

// TODO: replace with enum and list of valid currencies?
const Currency = enums(["GBP", "USD"]);

const Positive = min(number(), 0, { exclusive: true });

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

const Tax = object({
  description: string(),
  amount: number(),
  currency: string(),
  tax_number: optional(string()),
});

// TODO: move valid payment types to constants?
const PaymentType = enums(["cash", "cash", "gift_card"]);

const Payment = object({
  type: PaymentType,
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
  total: Positive,
  currency: Currency,
  items: array(ReceiptItem),
  taxes: optional(array(Tax)),
  payments: optional(array(Payment)),
  merchant: optional(Merchant),
});

module.exports = Receipt;
