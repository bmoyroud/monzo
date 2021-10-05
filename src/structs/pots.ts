import { object, number, assign, Infer } from "superstruct";
import { Id } from "./common/id";

const Pot = object({
  pot_id: Id,
  amount: number(),
  dedupe_id: Id,
});

export type Deposit = Infer<typeof Deposit>;
export const Deposit = assign(
  Pot,
  object({
    source_account_id: Id,
  })
);

export type Withdraw = Infer<typeof Withdraw>;
export const Withdraw = assign(
  Pot,
  object({
    destination_account_id: Id,
  })
);
