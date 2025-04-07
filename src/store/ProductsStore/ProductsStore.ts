import axios from 'axios';
import { computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
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
import { QOptions } from './types';

type PrivateFields = '_products';

export default class ProductsStore implements ILocalStore {
  readonly filters: ProductsFiltersStore = new ProductsFiltersStore();
  readonly paginator: Paginator = new Paginator({
    pagination: {
      page: 1,
      pageSize: 9,
      pageCount: 0,
      total: 0,
    },
  });

  private _products: CollectionModel<string, ProductModel> = getInitialCollectionModel();

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      products: computed,
    });
  }

  get products() {
    return linearizeCollection(this._products);
  }

  async updateProducts() {
    const qOptions: QOptions = {
      populate: ['images', 'productCategory'],
      pagination: {
        page: this.paginator.meta.pagination.page,
        pageSize: this.paginator.meta.pagination.pageSize,
      },
    };

    if (this.filters.selTitle.trim() !== '') {
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
      this.paginator.setMeta(meta);
      runInAction(() => {
        this._products = data;
      });
    } catch (err) {
      logger.error(err);
    }
  }

  async initialData() {
    await this.filters.initialData();
    this.paginator.initialData();
  }

  destroy() {
    this._products = getInitialCollectionModel();
    this._urlReaction();
    this.filters.destroy();
  }

  private readonly _urlReaction: IReactionDisposer = reaction(
    () => rootStore.query.params,
    () => {
      this.updateProducts();
    },
  );
}
