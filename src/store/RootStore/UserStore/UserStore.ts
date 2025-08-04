import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { fetchData } from 'api/fetchData';
import { RequestMethod } from 'api/types';
import { normalizeUser, UserApi, UserModel } from 'store/models/User';
import logger from 'utils/logger';
import { StorageUserKey } from './types';

type PrivateFields = '_user' | '_token';

export default class UserStore {
  private _user: UserModel | null = null;
  private _token: string = '';

  constructor() {
    this._init();
    makeObservable<UserStore, PrivateFields>(this, {
      _user: observable,
      _token: observable,
      token: computed,
      user: computed,
      isAuth: computed,
      login: action,
      logout: action,
    });
  }

  private _init() {
    this.getToken();
    this._loadUser();
  }

  get token() {
    return this._token;
  }

  get user() {
    return this._user;
  }

  get isAuth() {
    return !!this._user;
  }

  async _loadUser() {
    if (!this._token) {
      return;
    }

    const resp = await fetchData({
      method: RequestMethod.GET,
      pathname: 'users/me',
      token: this._token,
    });

    if (!resp.success) {
      if (resp.data.status === 401) {
        this.logout();
      }
      return;
    }

    try {
      const normData = normalizeUser(resp.data as UserApi);
      runInAction(() => {
        this._user = normData;
      });
    } catch (err) {
      logger.error(err);
    }
  }

  setToken(token: string) {
    this._token = token;
    localStorage.setItem(StorageUserKey, token);
  }

  getToken() {
    this._token = localStorage.getItem(StorageUserKey) ?? '';
  }

  deleteToken() {
    this._token = '';
    localStorage.removeItem(StorageUserKey);
  }

  login(token: string, user: UserModel) {
    this.setToken(token);
    this._user = user;
  }

  logout() {
    this.deleteToken();
    this._user = null;
  }
}
