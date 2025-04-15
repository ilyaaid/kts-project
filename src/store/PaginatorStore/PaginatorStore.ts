import * as _ from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import * as qs from 'qs';
import rootStore from 'store/RootStore';
import { QueryParamType } from 'store/RootStore/QueryParamsStore';
import { ILocalStore } from 'utils/useLocalStore';
import { ParamsType, QPSchema, QPType, QueryParamNames } from './types';

type PrivateFields = '_params';

export default class PaginatorStore implements ILocalStore {
  private _params: ParamsType;
  private _initialParams: ParamsType;

  constructor(initialParams: ParamsType) {
    this._params = _.cloneDeep(initialParams);
    this._initialParams = _.cloneDeep(initialParams);

    makeObservable<PaginatorStore, PrivateFields>(this, {
      _params: observable,
      params: computed,

      getPage: action,
      setParams: action,
      destroy: action,
    });
  }

  get params() {
    return this._params;
  }

  setParams(params: ParamsType) {
    this._params = params;
    if (this._params.page > this._params.pageCount) {
      this.getPage(this._params.pageCount);
    }
  }

  getAllParams() {
    this._params = this._getParamsQueryParam();
  }

  private _getParamsQueryParam(): ParamsType {
    const normalizeParams = (from: QueryParamType): ParamsType => {
      const strFrom = (from as string) ?? '';
      const parsed = qs.parse(strFrom) ?? {};
      const res = QPSchema.safeParse(parsed);
      if (!res.success) {
        return this._params;
      }
      const to: ParamsType = {
        ...this._params,
        page: res.data.page,
      };
      return to;
    };

    const prevParams = normalizeParams(rootStore.query.getParam(QueryParamNames.PAGINATE));
    if (_.isEqual(prevParams, this._params)) {
      return this._params;
    }
    return prevParams;
  }

  updateParamsQueryParam() {
    const prevParams = this._getParamsQueryParam();
    if (Object.is(prevParams, this._params)) {
      return;
    }
    if (this._params.page <= 1) {
      rootStore.query.removeParam(QueryParamNames.PAGINATE);
    } else {
      const newParams: QPType = {
        page: this._params.page,
      };
      rootStore.query.setParam(QueryParamNames.PAGINATE, qs.stringify(newParams));
    }
  }

  getPage(page: number) {
    const prevPage = this._params.page;
    this._params.page = page;
    if (prevPage !== page) {
      this.updateParamsQueryParam();
    }
  }

  destroy() {
    this._params = _.cloneDeep(this._initialParams);
  }
}
