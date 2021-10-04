import { object, number, optional, assign, size } from "superstruct";
import { RFC3339 } from "./refinements";

const TimeBasedPagination = object({
  since: optional(RFC3339),
  before: optional(RFC3339),
});

export const CursorBasedPagination = object({
  limit: optional(size(number(), 0, 100)),
});

export const Pagination = assign(TimeBasedPagination, CursorBasedPagination);
