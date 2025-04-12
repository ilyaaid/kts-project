import axios from 'axios';
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import * as qs from 'qs';
import { STRAPI_URL, API_TOKEN } from 'config/api';
import Paginator from 'store/PaginatorStore';
import ProductsFiltersStore from 'store/ProductsFiltersStore';
import rootStore from 'store/RootStore';
import { normalizeMeta } from 'store/models/Meta';
import { normalizeProduct, ProductApi, ProductModel } from 'store/models/Product';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared/collection';
import logger from 'utils/logger';
import { ILocalStore } from 'utils/useLocalStore';
import { ProductsMeta, QOptions } from './types';

type PrivateFields = '_products' | '_meta' | '_setIsLoading';

export default class ProductsStore implements ILocalStore {
  readonly filters: ProductsFiltersStore = new ProductsFiltersStore();
  readonly paginator: Paginator = new Paginator({
    page: 0,
    pageSize: 6,
    pageCount: 0,
    total: 0,
  });

  private _products: CollectionModel<string, ProductModel> = getInitialCollectionModel();
  private _meta: ProductsMeta = {
    loading: true,
  };

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      _meta: observable,
      products: computed,
      meta: computed,
      _getProducts: action,
      _setIsLoading: action,
      destroy: action,
    });
  }

  get products() {
    return linearizeCollection(this._products);
  }

  get meta() {
    return this._meta;
  }

  private _setIsLoading(val: boolean) {
    this._meta.loading = val;
  }

  async _getProducts() {
    const qOptions: QOptions = {
      populate: ['images', 'productCategory'],
      pagination: {
        page: this.paginator.params.page,
        pageSize: this.paginator.params.pageSize,
      },
    };

    if (this.filters.selTitle !== '') {
      qOptions.filters = {
        title: {
          $containsi: this.filters.selTitle,
        },
      };
    }
    if (this.filters.selCategoryKeys.length > 0) {
      qOptions.filters = {
        ...qOptions.filters,
        productCategory: {
          documentId: {
            $in: this.filters.selCategoryKeys,
          },
        },
      };
    }

    this._setIsLoading(true);
    const queryStr = qs.stringify(qOptions);
    const resp = await axios.get(`${STRAPI_URL}/products?${queryStr}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    try {
      const data = normalizeCollection(
        resp.data.data.map((item: ProductApi) => normalizeProduct(item)),
        (el: ProductModel) => el.documentId,
      );
      const meta = normalizeMeta(resp.data.meta);
      this.paginator.setParams({
        page: meta.pagination.page,
        pageSize: meta.pagination.pageSize,
        pageCount: meta.pagination.pageCount,
        total: meta.pagination.total,
      });
      runInAction(() => {
        this._products = data;
      });
      this._setIsLoading(false);
    } catch (err) {
      logger.error(err);
    }
  }

  destroy() {
    this.filters.destroy();
    this._products = getInitialCollectionModel();
    this._urlReaction();
  }

  private readonly _urlReaction: IReactionDisposer = reaction(
    () => rootStore.query.params,
    () => {
      this.filters.getAllParams();
      this.paginator.getAllParams();
      this._getProducts();
    },
  );
}
