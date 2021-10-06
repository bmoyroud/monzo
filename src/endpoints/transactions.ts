import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { Id } from "../structs/common";
import { Annotations, ExpandMerchant, Options } from "../structs/transactions";
import { TransactionRes, TransactionsRes } from "../types/monzo-api";
import { buildTransactionsUrl, buildTransactionUrl } from "../helpers/urls";
import { encodeData } from "../helpers/http";

class TransactionsEndpoint extends Endpoint {
  list(accountId: Id, opts: Options = {}) {
    assert(accountId, Id);
    assert(opts, Options);

    const endpointUrl = buildTransactionsUrl();

    const { expandMerchant, ...pagination } = opts;

    const args = {
      account_id: accountId,
      // pagination can be included in opts
      // pagination is handled by the Monzo API for this endpoint
      ...pagination,
    };

    const params = opts?.expandMerchant
      ? { ...args, "expand[]": "merchant" }
      : args;

    return this.client
      .get<void, TransactionsRes>(endpointUrl, { params })
      .then((data) => data.transactions);
  }

  retrieve(transactionId: Id, opts: ExpandMerchant = {}) {
    assert(transactionId, Id);

    const endpointUrl = buildTransactionUrl(transactionId);

    const params = opts?.expandMerchant ? { "expand[]": "merchant" } : {};

    return this.client
      .get<void, TransactionRes>(endpointUrl, { params })
      .then((data) => data.transaction);
  }

  annotate(transactionId: Id, annotations: Annotations) {
    assert(transactionId, Id);
    assert(annotations, Annotations);

    const endpointUrl = buildTransactionUrl(transactionId);

    const data = encodeData({ metadata: annotations });

    return this.client
      .patch<void, TransactionRes>(endpointUrl, data)
      .then((data) => data.transaction);
  }
}

export default TransactionsEndpoint;
