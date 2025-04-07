import { action, computed, IReactionDisposer, makeObservable, observable, reaction } from 'mobx';
import * as qs from 'qs';
import rootStore from 'store/RootStore';
import { MetaModel } from 'store/models/Meta';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_meta';

export default class PaginatorStore implements ILocalStore {
  private _meta: MetaModel;

  constructor(initialMeta: MetaModel) {
    this._meta = initialMeta;

    makeObservable<PaginatorStore, PrivateFields>(this, {
      _meta: observable,
      meta: computed,
      setMeta: action,
      getPage: action,
    });
  }

  get meta() {
    return this._meta;
  }

  setMeta(val: MetaModel) {
    this._meta = val;
    if (this._meta.pagination.page > this._meta.pagination.pageCount) {
      this._meta.pagination.page = this._meta.pagination.pageCount;
      this.getPage(this.meta.pagination.page);
    }
  }

  getPage(page: number) {
    this._meta.pagination.page = page;
    rootStore.query.setParam(
      'pagination',
      qs.stringify({
        page: this._meta.pagination.page,
        pageSize: this._meta.pagination.pageSize,
      }),
    );
  }

  _getUrlInitialData() {}
  initialData() {
    this._getUrlInitialData();
  }

  destroy() {
    this._urlCategoriesReaction();
  }

  private readonly _urlCategoriesReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('pagination'),
    (newPagination) => {
      if (newPagination) {
        const parsed = qs.parse(newPagination as string) as qs.ParsedQs;
        this._meta = {
          pagination: {
            page: +(parsed.page as string),
            pageSize: +(parsed.pageSize as string),
            pageCount: this._meta.pagination.pageCount,
            total: this._meta.pagination.total,
          },
        };
      }
    },
  );
}
