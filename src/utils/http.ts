import { AxiosError, AxiosResponse } from "axios";
import qs from "qs";

export const buildHeaders = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});

export const encodeData = (data: object) => qs.stringify(data);

export const parseResponse = (res: AxiosResponse) => res.data;

export const parseError = (err: AxiosError) => {
  const { status, statusText, data } = err.response as AxiosResponse;
  return Promise.reject({ status, statusText, data });
};
