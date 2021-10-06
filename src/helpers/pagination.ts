import { Pagination } from "../structs/common";

// ensure object has .created property
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

const noFilter = () => true;

function limitFilter(limit: number) {
  // if limit = 0, do not filter results
  if (limit === 0) return noFilter;
  const callbackFn = (_: any, i: number) => i < limit;
  return callbackFn;
}

export function limitResults<T>(arr: T[], limit: number) {
  return arr.filter(limitFilter(limit));
}

export function filterResults<T extends ICreated>(
  arr: T[],
  pagination: Pagination
) {
  const { since, before, limit } = pagination;
  return arr
    .filter(since ? sinceFilter(since) : noFilter)
    .filter(before ? beforeFilter(before) : noFilter)
    .filter(limit ? limitFilter(limit) : noFilter);
}
