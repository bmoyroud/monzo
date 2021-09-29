import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import List from "../structs/transactions/List";
import Retrieve from "../structs/transactions/Retrieve";
import Annotate from "../structs/transactions/Annotate";
import { Transaction } from "../monzo";
import { buildTransactionsUrl, buildTransactionUrl } from "../utils/urls";
import { encodeData } from "../utils/http";

export default (client: AxiosInstance) => {
  return {
    list: (params: Infer<typeof List>) => {
      assert(params, List);

      const endpointUrl = buildTransactionsUrl();

      return client
        .get<void, { transactions: Transaction[] }>(endpointUrl, { params })
        .then((data) => data.transactions);
    },

    retrieve: (params: Infer<typeof Retrieve>) => {
      assert(params, Retrieve);

      const { transaction_id, expand_merchant } = params;

      const endpointUrl = buildTransactionUrl(transaction_id);

      if (expand_merchant) {
        return client
          .get<void, { transaction: Transaction }>(endpointUrl, {
            params: {
              "expand[]": "merchant",
            },
          })
          .then((data) => data.transaction);
      }

      return client
        .get<void, { transaction: Transaction }>(endpointUrl)
        .then((data) => data.transaction);
    },

    annotate: (params: Infer<typeof Annotate>) => {
      assert(params, Annotate);

      const { transaction_id, annotations } = params;

      const endpointUrl = buildTransactionUrl(transaction_id);

      const data = encodeData({ metadata: annotations });

      return client
        .patch<void, { transaction: Transaction }>(endpointUrl, data)
        .then((data) => data.transaction);
    },
  };
};
