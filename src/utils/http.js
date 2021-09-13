const qs = require("qs");

module.exports = {
  encodeData: (data) => qs.stringify(data),
  parseResponse: (res) => res.data,
  parseError: (err) => {
    const { status, statusText, data } = err.response;
    return Promise.reject({ status, statusText, data });
  },
};
