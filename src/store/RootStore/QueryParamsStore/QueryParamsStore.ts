import { action, computed, makeObservable, observable } from 'mobx';
import * as qs from 'qs';
import logger from 'utils/logger';
import { ValueOf } from 'utils/types';

type PrivateFields = '_params';

export class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _setSearchParams: ((p: string) => void) | null = null;

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
      params: computed,
    });
  }

  get params() {
    return this._params;
  }

  setChangeUrlParamFunc(f: (p: string) => void) {
    this._setSearchParams = f;
  }

  private _changeUrl(params: string) {
    if (this._setSearchParams) {
      this._setSearchParams(params);
    }
  }

  getParam(key: string): ValueOf<qs.ParsedQs> {
    return this._params[key];
  }

  setParam(key: string, value: ValueOf<qs.ParsedQs>) {
    if (Object.is(this._params[key], value)) {
      logger.warning(`setting ${key} in query params with the same value`);
      return;
    }

    const newParams = qs.parse(qs.stringify(this._params));
    newParams[key] = value;
    this._changeUrl(qs.stringify(newParams));
  }

  removeParam(key: string): void {
    if (!(key in this._params)) {
      logger.warning(`the key ${key} cannot be deleted: it is not in query params`);
      return;
    }

    const newParams = qs.parse(qs.stringify(this._params));
    delete newParams[key];
    this._changeUrl(qs.stringify(newParams));
  }

  setSearch(searchStr: string): void {
    const str = searchStr.startsWith('?') ? searchStr.slice(1) : searchStr;
    const parsed = qs.parse(str);
    this._params = parsed;
  }
}
