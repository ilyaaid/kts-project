/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosRequestConfig } from 'axios';

export type StrapiResponse = {
  data: any;
  meta: any;
};

export enum RequestMethod {
  GET = 'get',
}

export type FetchDataParams = {
  method?: RequestMethod;
  pathname: string;
  qparams?: string;
  config?: AxiosRequestConfig;
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
