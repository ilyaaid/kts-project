import { action, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params';

type ValueOf<T> = T[keyof T];

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';

  private _changeQueryParamsUrl: null | ((params: string) => void) = null;

  constructor(changeQueryParamsUrl: (params: string) => void) {
    this._changeQueryParamsUrl = changeQueryParamsUrl;
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
      setParam: action,
    });
  }

  get params() {
    return this._params;
  }

  setChangeUrlFunc(changeQueryParamsUrl: (params: string) => void) {
    this._changeQueryParamsUrl = changeQueryParamsUrl;
  }

  changeUrl() {
    if (this._changeQueryParamsUrl) {
      this._changeQueryParamsUrl(qs.stringify(this._params));
    }
  }

  setParam(param: string, value: ValueOf<qs.ParsedQs>) {
    this._params[param] = value;
    this._params = JSON.parse(JSON.stringify(this._params));
    this.changeUrl();
  }

  getParam(key: string): ValueOf<qs.ParsedQs> {
    return this._params[key];
  }

  setSearch(searchStr: string) {
    const parsed = qs.parse(searchStr.startsWith('?') ? searchStr.slice(1) : searchStr);
    if (this._search !== searchStr) {
      this._params = parsed;
      this._search = searchStr;
    }
  }
}
