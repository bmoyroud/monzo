import { string, Infer } from "superstruct";

export type Id = Infer<typeof Id>;
export const Id = string();
