import axios from 'axios';
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import { API_TOKEN, STRAPI_URL } from 'config/api';
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

type PrivateFields = '_allCategories' | '_selCategoryKeys' | '_selTitle' | '_getAllCategories' | '_getUrlInitialData';

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
      _getAllCategories: action,
      setSelTitle: action,
      _getUrlInitialData: action,
      initialData: action,
      submitForm: action,
    });
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
    rootStore.query.setParam('categories', val);
  }

  setSelTitle(val: string) {
    this._selTitle = val.trim();
  }

  submitForm() {
    rootStore.query.setParam('title', this._selTitle);
  }

  async initialData() {
    await this._getAllCategories();
    this._getUrlInitialData();
  }

  private _getUrlInitialData() {
    const title = rootStore.query.getParam('title');
    const categories = rootStore.query.getParam('categories');
    if (title) {
      this._selTitle = title as string;
    } else {
      rootStore.query.setParam('title', this._selTitle);
    }
    if (categories) {
      this._selCategoryKeys = categories as string[];
    } else {
      rootStore.query.setParam('categories', this._selCategoryKeys);
    }
  }

  private async _getAllCategories() {
    const resp = await axios.get(`${STRAPI_URL}/product-categories`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    try {
      const data = normalizeCollection(
        resp.data.data.map((cat: ProductCategoryApi) => normalizeProductCategory(cat)),
        (el: ProductCategoryModel) => el.documentId,
      );
      runInAction(() => {
        this._allCategories = data;
      });
    } catch (err) {
      logger.error(err);
    }
  }

  destroy() {
    this._allCategories = getInitialCollectionModel();
    this._selTitle = '';
    this._selCategoryKeys = [];
    this._urlTitleReaction();
    this._urlCategoriesReaction();
  }

  private readonly _urlTitleReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('title'),
    (newTitle) => {
      if (newTitle) {
        this._selTitle = newTitle as string;
      } else {
        this._selTitle = '';
      }
    },
  );

  private readonly _urlCategoriesReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('categories'),
    (newCategories) => {
      if (newCategories) {
        this._selCategoryKeys = newCategories as string[];
      } else {
        this._selCategoryKeys = [];
      }
    },
  );
}
