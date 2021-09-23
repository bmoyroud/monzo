const { assert } = require("superstruct");
const List = require("../structs/pots/List");
const Deposit = require("../structs/pots/Deposit");
const Withdraw = require("../structs/pots/Withdraw");
const {
  buildPotsUrl,
  buildPotsDepositUrl,
  buildPotsWithdrawalUrl,
} = require("../utils/urls");
const { encodeData } = require("../utils/http");

module.exports = (client) => {
  return {
    list: (params) => {
      assert(params, List);

      const endpointUrl = buildPotsUrl();

      return client.get(endpointUrl, { params }).then((data) => data.pots);
    },

    deposit: (params) => {
      assert(params, Deposit);

      const { pot_id, ...other } = params;

      const endpointUrl = buildPotsDepositUrl(pot_id);

      const data = encodeData(other);

      return client.put(endpointUrl, data);
    },

    withdraw: (params) => {
      assert(params, Withdraw);

      const { pot_id, ...other } = params;

      const endpointUrl = buildPotsWithdrawalUrl(pot_id);

      const data = encodeData(other);

      return client.put(endpointUrl, data);
    },
  };
};
