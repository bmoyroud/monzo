import { object, string, number, assign } from "superstruct";

const Pot = object({
  pot_id: string(),
  amount: number(),
  dedupe_id: string(),
});

export const Deposit = assign(
  Pot,
  object({
    source_account_id: string(),
  })
);

export const Withdraw = assign(
  Pot,
  object({
    destination_account_id: string(),
  })
);
