import { Transaction } from "./types/monzo-api";

abstract class Utils {
  static last90Days() {
    // add 4 seconds for call to /transactions to work
    const buffer = 4000;
    const millis = Date.now() - 1000 * 60 * 60 * 24 * 90 + buffer;
    const _90DaysAgo = new Date(millis);
    const encodedTimestamp = _90DaysAgo.toISOString();
    return encodedTimestamp;
  }

  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  static formatTransaction(transaction: Transaction) {
    const { currency, amount } = transaction;
    const formatter = new Intl.NumberFormat(currency, {
      style: "currency",
      currency: currency,
    });
    const formatted = formatter.format(amount / 100);
    return formatted;
  }

  static id() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }
}

export default Utils;
