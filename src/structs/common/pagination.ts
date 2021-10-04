import { object, number, max, optional, assign } from "superstruct";
import { RFC3339 } from "./refinements";

const TimeBasedPagination = object({
  since: optional(RFC3339),
  before: optional(RFC3339),
});

export const CursorBasedPagination = object({
  // TODO: add minimum 0?
  limit: optional(max(number(), 100)),
});

export const Pagination = assign(TimeBasedPagination, CursorBasedPagination);
