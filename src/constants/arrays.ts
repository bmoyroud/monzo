export const accountTypes = [
  "uk_prepaid",
  "uk_retail",
  "uk_retail_joint",
] as const;

export const feedItemsTypes = ["basic"] as const;

// TODO: add all currencies?
export const currencies = ["GBP", "USD"] as const;

// TODO: is image/gif or other file types allowed?
// export const fileTypes = ["image/jpeg", "image/png"];

export const paymentTypes = ["cash", "card", "gift_card"] as const;
