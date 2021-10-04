import { object, number, assign } from "superstruct";
import { Id } from "./common/id";

const Pot = object({
  pot_id: Id,
  amount: number(),
  dedupe_id: Id,
});

export const Deposit = assign(
  Pot,
  object({
    source_account_id: Id,
  })
);

export const Withdraw = assign(
  Pot,
  object({
    destination_account_id: Id,
  })
);
