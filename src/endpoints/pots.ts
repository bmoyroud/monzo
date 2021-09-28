import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import List from "../structs/pots/List";
import Deposit from "../structs/pots/Deposit";
import Withdraw from "../structs/pots/Withdraw";
import {
  buildPotsUrl,
  buildPotsDepositUrl,
  buildPotsWithdrawalUrl,
} from "../utils/urls";
import { encodeData } from "../utils/http";

export default (client: AxiosInstance) => {
  return {
    list: (params: Infer<typeof List>) => {
      assert(params, List);

      const endpointUrl = buildPotsUrl();

      return client
        .get<void, any>(endpointUrl, { params })
        .then((data) => data.pots);
    },

    deposit: (params: Infer<typeof Deposit>) => {
      assert(params, Deposit);

      const { pot_id, ...other } = params;

      const endpointUrl = buildPotsDepositUrl(pot_id);

      const data = encodeData(other);

      return client.put<void, any>(endpointUrl, data);
    },

    withdraw: (params: Infer<typeof Withdraw>) => {
      assert(params, Withdraw);

      const { pot_id, ...other } = params;

      const endpointUrl = buildPotsWithdrawalUrl(pot_id);

      const data = encodeData(other);

      return client.put<void, any>(endpointUrl, data);
    },
  };
};
