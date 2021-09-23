const { assert } = require("superstruct");
const Receipt = require("../structs/receipts/Receipt");
const ExternalId = require("../structs/receipts/ExternalId");
const { buildReceiptsUrl } = require("../utils/urls");

const endpointUrl = buildReceiptsUrl();

module.exports = (client) => {
  return {
    create: (params) => {
      assert(params, Receipt);
      return client.put(endpointUrl, params);
    },

    retrieve: (params) => {
      assert(params, ExternalId);
      return client.get(endpointUrl, { params });
    },

    delete: (params) => {
      assert(params, ExternalId);
      return client.delete(endpointUrl, { params });
    },
  };
};
