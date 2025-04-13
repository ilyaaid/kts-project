import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { API_TOKEN, STRAPI_URL } from 'config/api';
import { withQueryParams } from 'utils/withQueryParams';
import { FetchDataResponse, FetchDataParams, StrapiResponse, RequestMethod } from './types';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export async function fetchData<T extends StrapiResponse>({
  method = RequestMethod.GET,
  pathname,
  qparams,
  config,
}: FetchDataParams): Promise<FetchDataResponse<T>> {
  let response: AxiosResponse<T>;

  const fullPath = withQueryParams(pathname, qparams);

  try {
    switch (method) {
      default:
        response = await axiosInstance.get(fullPath, config);
        break;
    }
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const typedError = error as AxiosError;
    return {
      success: false,
      data: typedError,
    };
  }
}
