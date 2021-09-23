import qs from "qs";

export const buildHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
});

export const encodeData = (data) => qs.stringify(data);

export const parseResponse = (res) => res.data;

export const parseError = (err) => {
  const { status, statusText, data } = err.response;
  return Promise.reject({ status, statusText, data });
};
