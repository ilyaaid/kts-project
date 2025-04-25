import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import * as qs from 'qs';
import { ENDPOINTS } from 'api/endpoint';
import { fetchData } from 'api/fetchData';
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
      const meta = normalizeMeta(data.meta);
      if (meta) {
        this.paginator.setParams({
          page: meta.pagination.page,
          pageSize: meta.pagination.pageSize,
          pageCount: meta.pagination.pageCount,
          total: meta.pagination.total,
        });
      }

      runInAction(() => {
        this._products = normData;
      });
      this._setIsLoading(false);
    } catch (err) {
      logger.error(err);
    }
  }

  destroy() {
    this.filters.destroy();
    this.paginator.destroy();
    this._products = getInitialCollectionModel();
    this._urlReaction();
  }

  private readonly _urlReaction: IReactionDisposer = reaction(
    () => {
      return rootStore.query.params;
    },
    () => {
      this.filters.getAllParams();
      this.paginator.getAllParams();
      this._getProducts();
    },
  );
}
