import { assert } from "superstruct";
import List from "../structs/transactions/List";
import Retrieve from "../structs/transactions/Retrieve";
import Annotate from "../structs/transactions/Annotate";
import { buildTransactionsUrl, buildTransactionUrl } from "../utils/urls";
import { encodeData } from "../utils/http";

export default (client) => {
  return {
    list: (params) => {
      assert(params, List);

      const endpointUrl = buildTransactionsUrl();

      return client
        .get(endpointUrl, { params })
        .then((data) => data.transactions);
    },

    retrieve: (params) => {
      assert(params, Retrieve);

      const { transaction_id, expand_merchant } = params;

      const endpointUrl = buildTransactionUrl(transaction_id);

      if (expand_merchant) {
        return client.get(endpointUrl, {
          params: {
            "expand[]": "merchant",
          },
        });
      }

      return client.get(endpointUrl).then((data) => data.transaction);
    },

    annotate: (params) => {
      assert(params, Annotate);

      const { transaction_id, annotations } = params;

      const endpointUrl = buildTransactionUrl(transaction_id);

      const data = encodeData({ metadata: annotations });

      return client.patch(endpointUrl, data).then((data) => data.transaction);
    },
  };
};
