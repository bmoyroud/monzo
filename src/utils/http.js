const url = require("url");

module.exports = {
  encodeData: (data) => new url.URLSearchParams(data).toString(),
  parseResponse: (res) => res.data,
  parseError: (error) => {
    const { status, statusText, data } = error.response;
    return { status, statusText, data };
  },
};
