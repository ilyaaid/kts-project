import _ from 'lodash';
import { action, computed, makeObservable, observable, runInAction, toJS } from 'mobx';
import * as qs from 'qs';
import { ENDPOINTS } from 'api/endpoint';
import { fetchData } from 'api/fetchData';
import { QOptions } from 'store/ProductsStore';
import { ProductModel, normalizeProduct, ProductApi } from 'store/models/Product';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared/collection';
import fixedPrecision from 'utils/fixedPrecision';
import logger from 'utils/logger';
import { StorageCartKey, TotalType } from './types';

type PrivateFields = '_product2cnt' | '_productCollection';

type CartProductsType = {
  [key: string]: number;
};

export default class CartStore {
  private _product2cnt: CartProductsType = {};
  private _productCollection: CollectionModel<string, ProductModel> = getInitialCollectionModel();

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _product2cnt: observable.ref,
      _productCollection: observable.ref,
      product2cnt: computed,
      productCollection: computed,
      loadProduct2cnt: action,
      loadProductCollection: action,
      addProduct: action,
      decProduct: action,
    });
    this.init();
  }

  init() {
    this.loadProduct2cnt();
    this.loadProductCollection();
  }

  loadProduct2cnt() {
    const cartVal = localStorage.getItem(StorageCartKey);
    if (!cartVal) {
      this._product2cnt = {};
      return;
    }
    const productModels = JSON.parse(cartVal) as CartProductsType;
    this._product2cnt = productModels;
  }

  async loadProductCollection() {
    if (this.getProductsKeys().length === 0) {
      return;
    }
    const qOptions: QOptions = {
      populate: ['images', 'productCategory'],
      filters: {
        documentId: {
          $in: this.getProductsKeys(),
        },
      },
    };

    const queryStr = qs.stringify(qOptions);
    const { data, success } = await fetchData({
      pathname: ENDPOINTS.products(),
      qparams: queryStr,
    });
    if (!success) {
      logger.error('getProducts: ', data.cause);
      return;
    }
    try {
      const normData = normalizeCollection(
        data.data.map((item: ProductApi) => normalizeProduct(item)),
        (el: ProductModel) => el.documentId,
      );

      runInAction(() => {
        this._productCollection = normData;
      });
    } catch (err) {
      logger.error(err);
    }
  }

  get product2cnt() {
    return this._product2cnt;
  }

  get productCollection(): ProductModel[] {
    return linearizeCollection(this._productCollection);
  }

  getProductsKeys(): string[] {
    return Object.keys(toJS(this._product2cnt));
  }

  getProductsCnt(): number {
    return Object.values(this._product2cnt).reduce((sum, count) => sum + count, 0);
  }

  getProductKey(product: ProductModel) {
    return product.documentId;
  }

  _updateLocalStorage() {
    if (Object.keys(this._product2cnt).length === 0) {
      localStorage.removeItem(StorageCartKey);
    } else {
      localStorage.setItem(StorageCartKey, JSON.stringify(this._product2cnt));
    }
  }

  _setNewCnt(key: string, cnt: number) {
    const newProducts = _.cloneDeep(this._product2cnt);
    newProducts[key] = cnt;
    if (cnt <= 0) {
      delete newProducts[key];
    }
    this._product2cnt = newProducts;
    this._updateLocalStorage();
  }

  addProduct(product: ProductModel) {
    const key = this.getProductKey(product);
    const cnt = this.getProductCnt(product);
    this._setNewCnt(key, cnt + 1);
    if (cnt === 0) {
      const newProductCollection = _.cloneDeep(this._productCollection);
      newProductCollection.entities[key] = product;
      newProductCollection.order.push(key);
      this._productCollection = newProductCollection;
    }
  }

  decProduct(product: ProductModel) {
    const key = this.getProductKey(product);
    const cnt = this.getProductCnt(product);
    this._setNewCnt(key, cnt - 1);
    if (cnt === 1) {
      const newProductCollection = _.cloneDeep(this._productCollection);
      delete newProductCollection.entities[key];
      newProductCollection.order = newProductCollection.order.filter((k) => k !== key);
      this._productCollection = newProductCollection;
    }
  }

  getProductCnt(product: ProductModel) {
    const key = this.getProductKey(product);
    if (key in this._product2cnt) {
      return this._product2cnt[key];
    }
    return 0;
  }

  getTotal(): TotalType {
    const ans: TotalType = {
      count: this.getProductsCnt(),
      price: this._productCollection.order.reduce(
        (cum, key) => cum + this._product2cnt[key] * this._productCollection.entities[key].price,
        0,
      ),
      discountNum: this._productCollection.order.reduce(
        (cum, key) => cum + this._product2cnt[key] * this._productCollection.entities[key].discountNum,
        0,
      ),
      priceDiscount: 0,
    };
    ans.price = fixedPrecision(ans.price, 2);
    ans.discountNum = fixedPrecision(ans.discountNum, 2);
    ans.priceDiscount = fixedPrecision(ans.price - ans.discountNum, 2);

    return ans;
  }
}
