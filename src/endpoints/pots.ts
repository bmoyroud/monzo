import { AxiosInstance } from "axios";
import { assert, Infer } from "superstruct";
import List from "../structs/pots/List";
import Deposit from "../structs/pots/Deposit";
import Withdraw from "../structs/pots/Withdraw";
import { Pot } from "../monzo";
import {
  buildPotsUrl,
  buildPotsDepositUrl,
  buildPotsWithdrawalUrl,
} from "../utils/urls";
import { encodeData } from "../utils/http";

export default (client: AxiosInstance) => {
  return {
    list: (args: Infer<typeof List>) => {
      assert(args, List);

      const endpointUrl = buildPotsUrl();

      return client
        .get<void, { pots: Pot[] }>(endpointUrl, { params: args })
        .then((data) => data.pots);
    },

    deposit: (args: Infer<typeof Deposit>) => {
      assert(args, Deposit);

      const { pot_id, ...other } = args;

      const endpointUrl = buildPotsDepositUrl(pot_id);

      const data = encodeData(other);

      return client.put<void, Pot>(endpointUrl, data);
    },

    withdraw: (args: Infer<typeof Withdraw>) => {
      assert(args, Withdraw);

      const { pot_id, ...other } = args;

      const endpointUrl = buildPotsWithdrawalUrl(pot_id);

      const data = encodeData(other);

      return client.put<void, Pot>(endpointUrl, data);
    },
  };
};
