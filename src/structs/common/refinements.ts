import { min, number, pattern, refine, string } from "superstruct";
import { URL as NodeURL } from "url";

export const HexColor = pattern(string(), /^#(?:[0-9a-fA-F]{3}){1,2}$/);

export const Integer = refine(number(), "Integer", (value) =>
  Number.isInteger(value)
);

export const Positive = min(number(), 0, { exclusive: true });

// see https://stackoverflow.com/a/24544212/4658957
export const RFC3339 = pattern(
  string(),
  /^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])[Tt]([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(([Zz])|([\+|\-]([01][0-9]|2[0-3]):[0-5][0-9]))$/
);

export const URL = refine(string(), "URL", (value) => {
  try {
    new NodeURL(value);
    return true;
  } catch (e) {
    return false;
  }
});
