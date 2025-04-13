import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import * as qs from 'qs';
import { ENDPOINTS } from 'api/endpoint';
import { fetchData } from 'api/fetch';
import { normalizeProduct, ProductModel } from 'store/models/Product';
import logger from 'utils/logger';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_product';

export default class ProductStore implements ILocalStore {
  private _product: null | ProductModel = null;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable,
      product: computed,
      getProduct: action,
    });
  }

  get product() {
    return this._product;
  }

  async getProduct(id: string) {
    const queryStr = qs.stringify({
      populate: ['images', 'productCategory'],
    });

    const { data, success } = await fetchData({ pathname: ENDPOINTS.product(id), qparams: queryStr });
    if (!success) {
      logger.error('getProduct: ', data.cause);
      return;
    }
    try {
      const normData = normalizeProduct(data.data);
      runInAction(() => {
        this._product = normData;
      });
    } catch (err) {
      logger.error(err);
    }
  }

  destroy() {
    logger.log('ProductStore is destroyed');
  }
}
