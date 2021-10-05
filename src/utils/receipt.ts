import { ReceiptReq } from "../structs/receipt";
import { BaseItem, Items } from "../structs/receipt/items";

const calculateReducer = (acc: number, item: BaseItem) =>
  acc + item.amount * item.quantity;

// from docs, https://docs.monzo.com/#receipt-items

// The amounts of the sub-items should add up to amount on the item.
function checkSubItems(items: Items) {
  for (const item of items) {
    const { amount, sub_items } = item;
    if (sub_items) {
      const subItemsAmount = sub_items.reduce(calculateReducer, 0);
      console.log("Amounts", subItemsAmount);

      if (subItemsAmount !== amount) {
        throw new Error(
          "The amounts of the sub-items should add up to amount on the item."
        );
      }
    }
  }
}

// All of the items together, plus the taxes, should add up to the Receipt total.
// Note: this not what EAT does. They do not include taxes in calculation.
function checkTotal(receipt: ReceiptReq) {
  const { total: receiptTotal } = receipt;

  const total = receipt.items.reduce(calculateReducer, 0);
  console.log(receiptTotal, total);

  if (total !== receiptTotal) {
    throw new Error(
      "All of the items together, plus the taxes, should add up to the Receipt total."
    );
  }
}

export default function checkReceipt(receipt: any) {
  checkTotal(receipt);
  checkSubItems(receipt.items);
}
