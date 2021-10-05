import { assert, Infer } from "superstruct";
import Endpoint from "./endpoint";
import { Id } from "../structs/common/id";
import { Pagination } from "../structs/common/pagination";
import { Retrieve, Annotate } from "../structs/transactions";
import { Transaction } from "../types/monzo";
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
      .get<void, { transactions: Transaction[] }>(endpointUrl, {
        params: args,
      })
      .then((data) => data.transactions);
  }

  retrieve(args: Infer<typeof Retrieve>) {
    assert(args, Retrieve);

    const { transaction_id, expand_merchant } = args;

    const endpointUrl = buildTransactionUrl(transaction_id);

    // TODO: simplify this?
    if (expand_merchant) {
      return this.client
        .get<void, { transaction: Transaction }>(endpointUrl, {
          params: {
            "expand[]": "merchant",
          },
        })
        .then((data) => data.transaction);
    }

    return this.client
      .get<void, { transaction: Transaction }>(endpointUrl)
      .then((data) => data.transaction);
  }

  annotate(args: Infer<typeof Annotate>) {
    assert(args, Annotate);

    const { transaction_id, annotations } = args;

    const endpointUrl = buildTransactionUrl(transaction_id);

    const data = encodeData({ metadata: annotations });

    return this.client
      .patch<void, { transaction: Transaction }>(endpointUrl, data)
      .then((data) => data.transaction);
  }
}

export default TransactionsEndpoint;
