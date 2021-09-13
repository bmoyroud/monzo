const url = require("url");

module.exports = {
  encodeData: (data) => new url.URLSearchParams(data).toString(),
};
