import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ENDPOINTS } from 'api/endpoint';
import { fetchData } from 'api/fetch';
import rootStore from 'store/RootStore';
import { normalizeProductCategory, ProductCategoryApi, ProductCategoryModel } from 'store/models/Product';
import {
  getInitialCollectionModel,
  CollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared/collection';
import logger from 'utils/logger';
import { ILocalStore } from 'utils/useLocalStore';
import { QueryParamNames } from './types';

type PrivateFields = '_allCategories' | '_selCategoryKeys' | '_selTitle' | '_getAllCategories';

export default class ProductsFiltersStore implements ILocalStore {
  private _allCategories: CollectionModel<string, ProductCategoryModel> = getInitialCollectionModel();

  private _selTitle: string = '';
  private _selCategoryKeys: string[] = [];

  constructor() {
    makeObservable<ProductsFiltersStore, PrivateFields>(this, {
      _allCategories: observable.ref,
      _selCategoryKeys: observable.ref,
      _selTitle: observable,

      allCategories: computed,
      selCategories: computed,
      selTitle: computed,
      selCategoryKeys: computed,

      setSelCategoryKeys: action,
      setSelTitle: action,
      _getAllCategories: action,

      updateTitleParam: action,
      updateCategoriesParam: action,
      destroy: action,
    });

    this.init();
  }

  async init() {
    this._getAllCategories();
  }

  get allCategories() {
    return linearizeCollection(this._allCategories);
  }

  get selCategories() {
    const cats = this._selCategoryKeys.map((key) => this._allCategories.entities[key]);
    return cats.filter((val) => val !== undefined);
  }

  get selCategoryKeys() {
    return this._selCategoryKeys;
  }

  get selTitle() {
    return this._selTitle;
  }

  setSelCategoryKeys(val: string[]) {
    this._selCategoryKeys = val;
    this.updateCategoriesParam();
  }

  setSelTitle(val: string) {
    this._selTitle = val;
  }

  getAllParams() {
    this._selTitle = this._getTitleParam();
    this._selCategoryKeys = this._getCategoriesParam();
  }

  private _getTitleParam(): string {
    const title = (rootStore.query.getParam(QueryParamNames.TITLE) as string) ?? '';
    if (title === this._selTitle) {
      return this._selTitle;
    }
    return title;
  }

  private _getCategoriesParam(): string[] {
    const categoies = (rootStore.query.getParam(QueryParamNames.CATEGORIES) as string[]) ?? [];
    if (
      categoies.length === this._selCategoryKeys.length &&
      categoies.every((val, ind) => this._selCategoryKeys[ind] === val)
    ) {
      return this._selCategoryKeys;
    }
    return categoies;
  }

  updateTitleParam() {
    const prevTitle = this._getTitleParam();
    if (Object.is(prevTitle, this._selTitle)) {
      return;
    }
    if (this._selTitle === '') {
      rootStore.query.removeParam(QueryParamNames.TITLE);
    } else {
      rootStore.query.setParam(QueryParamNames.TITLE, this._selTitle);
    }
  }

  updateCategoriesParam() {
    const prevCategories = this._getCategoriesParam();
    if (Object.is(prevCategories, this._selCategoryKeys)) {
      return;
    }
    if (this._selCategoryKeys.length === 0) {
      rootStore.query.removeParam(QueryParamNames.CATEGORIES);
    } else {
      rootStore.query.setParam(QueryParamNames.CATEGORIES, this._selCategoryKeys);
    }
  }

  submitForm() {
    this.updateTitleParam();
  }

  private async _getAllCategories() {
    const { data, success } = await fetchData({
      pathname: ENDPOINTS.categories(),
    });
    if (!success) {
      logger.error('getAllCategories:', data.cause);
      return;
    }
    try {
      const normData = normalizeCollection(
        data.data.map((cat: ProductCategoryApi) => normalizeProductCategory(cat)),
        (el: ProductCategoryModel) => el.documentId,
      );
      runInAction(() => {
        this._allCategories = normData;
      });
    } catch (err) {
      logger.error(err);
    }
  }

  destroy() {
    this._allCategories = getInitialCollectionModel();
    this._selTitle = '';
    this._selCategoryKeys = [];
  }
}
