import { object, Infer } from "superstruct";

export type Annotations = Infer<typeof Annotations>;
export const Annotations = object();
