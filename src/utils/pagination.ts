import { Infer } from "superstruct";
import { Pagination } from "../structs/common/Pagination";

const noFilter = () => true;

function limitFilter(limit: number) {
  // TODO: do this or mirror behaviour of /transactions?
  // TODO: test /transactions with limit: -1

  // i.e. if limit = 0, do not filter results
  if (limit === 0) return noFilter;

  // if (limit < 1 || limit > 100)
  //   throw new Error("Limit must be between 1 and 100");

  const callbackFn = (_: any, i: number) => i < limit;
  return callbackFn;
}

// ensure object has .created property
// TODO: move to monzo.ts?
interface ICreated {
  created: string;
}

function sinceFilter(timestamp: string) {
  const sinceDate = new Date(timestamp);
  const callbackFn = (object: ICreated) =>
    sinceDate <= new Date(object.created);
  return callbackFn;
}

function beforeFilter(timestamp: string) {
  const beforeDate = new Date(timestamp);
  const callbackFn = (object: ICreated) =>
    new Date(object.created) < beforeDate;
  return callbackFn;
}

export function filterResults(
  // cannot use ICreated here because Webhook does not have .created property
  arr: any[],
  pagination: Infer<typeof Pagination>
) {
  const { since, before, limit } = pagination;
  return arr
    .filter(since ? sinceFilter(since) : noFilter)
    .filter(before ? beforeFilter(before) : noFilter)
    .filter(limit ? limitFilter(limit) : noFilter);
}

export const isPaginated = (pagination: Infer<typeof Pagination>) =>
  pagination.hasOwnProperty("since") ||
  pagination.hasOwnProperty("before") ||
  pagination.hasOwnProperty("limit");
