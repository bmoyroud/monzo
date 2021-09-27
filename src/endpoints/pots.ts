import { assert } from "superstruct";
import List from "../structs/pots/List";
import Deposit from "../structs/pots/Deposit";
import Withdraw from "../structs/pots/Withdraw";
import {
  buildPotsUrl,
  buildPotsDepositUrl,
  buildPotsWithdrawalUrl,
} from "../utils/urls";
import { encodeData } from "../utils/http";

export default (client) => {
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