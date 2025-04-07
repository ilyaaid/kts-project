import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import * as qs from 'qs';
import { API_TOKEN, STRAPI_URL } from 'config/api';
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

  getProduct(id: string) {
    const queryStr = qs.stringify({
      populate: ['images', 'productCategory'],
    });
    const fetch = async () => {
      const resp = await axios.get(`${STRAPI_URL}/products/${id}?${queryStr}`, {
        headers: {

          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      try {
        const respNorm = normalizeProduct(resp.data.data);
        runInAction(() => {
          this._product = respNorm;
        });
      } catch (err) {
        logger.error(err);
      }
    };

    fetch();
  }

  destroy() {
    logger.log('ProductStore is destroyed');
  }
}
