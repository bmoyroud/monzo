import { object, optional, assign, Infer, min } from "superstruct";
import { Integer, RFC3339 } from "./refinements";

const TimeBasedPagination = object({
  since: optional(RFC3339),
  before: optional(RFC3339),
});

export type CursorBasedPagination = Infer<typeof CursorBasedPagination>;
export const CursorBasedPagination = object({
  limit: optional(min(Integer, 0)),
});

export type Pagination = Infer<typeof Pagination>;
export const Pagination = assign(TimeBasedPagination, CursorBasedPagination);
