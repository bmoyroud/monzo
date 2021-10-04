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
