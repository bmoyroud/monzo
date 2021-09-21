const { assert } = require("superstruct");
const List = require("../structs/transactions/List");
const Retrieve = require("../structs/transactions/Retrieve");
const Annotate = require("../structs/transactions/Annotate");
const { buildTransactionsUrl, buildTransactionUrl } = require("../utils/urls");
const { encodeData } = require("../utils/http");

module.exports = (client) => {
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
