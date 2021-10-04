import { pattern, refine, string } from "superstruct";
import { URL as NodeURL } from "url";

export const URL = refine(string(), "URL", (value) => {
  try {
    new NodeURL(value);
    return true;
  } catch (e) {
    return false;
  }
});

export const HexColor = pattern(string(), /^#(?:[0-9a-fA-F]{3}){1,2}$/);

// see https://stackoverflow.com/a/24544212/4658957
export const RFC3339 = pattern(
  string(),
  /^\\d{4}-\\d{2}-\\d{2}T\\d{2}%3A\\d{2}%3A\\d{2}(?:%2E\\d+)?[A-Z]?(?:[+.-](?:08%3A\\d{2}|\\d{2}[A-Z]))?$/
);
