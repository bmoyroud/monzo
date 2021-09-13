const url = require("url");

module.exports = {
  encodeData: (data) => new url.URLSearchParams(data).toString(),
  parseResponse: (res) => res.data,
  parseError: (err) => {
    const { status, statusText, data } = err.response;
    return { status, statusText, data };
  },
};
