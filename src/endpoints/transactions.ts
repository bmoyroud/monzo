import { assert } from "superstruct";
import Endpoint from "./endpoint";
import { Id, Pagination } from "../structs/common";
import { Annotations } from "../structs/transactions";
import { TransactionRes, TransactionsRes } from "../types/monzo-api";
import { buildTransactionsUrl, buildTransactionUrl } from "../utils/urls";
import { encodeData } from "../utils/http";

class TransactionsEndpoint extends Endpoint {
  list(accountId: Id, pagination?: Pagination) {
    assert(accountId, Id);
    assert(pagination, Pagination);

    const endpointUrl = buildTransactionsUrl();

    // pagination is handled by Monzo API
    const args = {
      account_id: accountId,
      ...pagination,
    };

    return this.client
      .get<void, TransactionsRes>(endpointUrl, { params: args })
      .then((data) => data.transactions);
  }

  retrieve(transactionId: Id, expandMerchant = false) {
    assert(transactionId, Id);

    const endpointUrl = buildTransactionUrl(transactionId);

    const params = expandMerchant ? { "expand[]": "merchant" } : {};

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
