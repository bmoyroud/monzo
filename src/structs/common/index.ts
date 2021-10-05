import { string, Infer } from "superstruct";

export type Id = Infer<typeof Id>;
export const Id = string();

export { CursorBasedPagination, Pagination } from "./pagination";

export { HexColor, Positive, RFC3339, URL } from "./refinements";
