import { boolean, object, optional, string } from "superstruct";

export const Merchant = object({
  name: optional(string()),
  online: optional(boolean()),
  phone: optional(string()),
  email: optional(string()),
  store_name: optional(string()),
  store_address: optional(string()),
  store_postcode: optional(string()),
});
