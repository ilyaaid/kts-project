import { AxiosError, AxiosRequestConfig } from 'axios';

export enum RequestMethod {
  GET = 'get',
  POST = 'post',
}

export type FetchDataParams = {
  method?: RequestMethod;
  pathname: string;
  qparams?: string;
  body?: unknown;
  config?: AxiosRequestConfig;
  token?: string;
};

export type FetchDataResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      data: AxiosError;
    };
