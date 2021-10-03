const { refine, string } = require("superstruct");
const URL = require("url").URL;

module.exports = refine(string(), "URL", (value) => {
  try {
    new URL(value);
    return true;
  } catch (e) {
    return false;
  }
});
