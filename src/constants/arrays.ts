export const accountTypes = [
  "uk_prepaid",
  "uk_retail",
  "uk_retail_joint",
] as const;

export const feedItemsTypes = ["basic"] as const;

// TODO: add all currencies?
export const currencies = ["GBP", "USD"] as const;

export const fileTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "video/mp4",
] as const;

export const paymentTypes = ["cash", "card", "gift_card"] as const;
