import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_TOKEN, STRAPI_URL } from 'config/api';
import { withQueryParams } from 'utils/withQueryParams';
import { FetchDataResponse, FetchDataParams, RequestMethod } from './types';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchData<T extends Record<string, any>>({
  method = RequestMethod.GET,
  pathname,
  qparams,
  body,
  config,
  token,
}: FetchDataParams): Promise<FetchDataResponse<T>> {
  const fullPath = withQueryParams(pathname, qparams);
  const headers = token ? { ...config?.headers, Authorization: `Bearer ${token}` } : config?.headers;

  try {
    const response = await axiosInstance({
      method,
      url: fullPath,
      data: body,
      headers,
    });
    return { success: true, data: response.data };
  } catch (error) {
    const typedError = error as AxiosError;
    return { success: false, data: typedError };
  }
}
