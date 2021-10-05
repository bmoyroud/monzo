import { object, number, optional, assign, size, Infer } from "superstruct";
import { RFC3339 } from "./refinements";

const TimeBasedPagination = object({
  since: optional(RFC3339),
  before: optional(RFC3339),
});

export type CursorBasedPagination = Infer<typeof CursorBasedPagination>;
export const CursorBasedPagination = object({
  limit: optional(size(number(), 0, 100)),
});

export type Pagination = Infer<typeof Pagination>;
export const Pagination = assign(TimeBasedPagination, CursorBasedPagination);
