import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_menuOpen';

export default class HeaderStore implements ILocalStore {
  private _menuOpen: boolean = false;
  constructor() {
    makeObservable<HeaderStore, PrivateFields>(this, {
      _menuOpen: observable,
      menuOpen: computed,
      toggleOpen: action,
      setOpen: action,
    });
  }

  get menuOpen() {
    return this._menuOpen;
  }

  toggleOpen() {
    this._menuOpen = !this._menuOpen;
  }

  setOpen(val: boolean) {
    this._menuOpen = val;
  }

  destroy() {
    this._menuOpen = false;
  }
}
