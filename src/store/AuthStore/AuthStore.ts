import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ENDPOINTS } from 'api/endpoint';
import { fetchData } from 'api/fetchData';
import { RequestMethod } from 'api/types';
import rootStore from 'store/RootStore';
import { normalizeUserResponse, UserResponseApi } from 'store/models/User';
import logger from 'utils/logger';
import { ILocalStore } from 'utils/useLocalStore';
import { FormData, FormErrors, ModeType, ModeValue, RequestBody } from './types';

type PrivateFields = '_formData' | '_formErrors' | '_isSubmitting' | '_validate' | '_isSuccess';

export default class AuthStore implements ILocalStore {
  private readonly _mode: ModeType;
  private readonly _isReg: boolean;
  private _formData: FormData;
  private _formErrors: FormErrors = {};
  private _isSubmitting: boolean = false;
  private _isSuccess: boolean = false;

  constructor(mode: ModeType) {
    this._mode = mode;
    this._isReg = mode === ModeValue.REG;
    this._formData = this._getInitialFormData();

    makeObservable<AuthStore, PrivateFields>(this, {
      _formData: observable.ref,
      _formErrors: observable.ref,
      _isSubmitting: observable,
      _isSuccess: observable,
      formData: computed,
      formErrors: computed,
      isSubmitting: computed,
      _validate: action,
      setValue: action,
      submit: action,
    });
  }

  private _getInitialFormData(): FormData {
    let data: FormData = {
      email: '',
      password: '',
    };
    if (this._isReg) {
      data = {
        ...data,
        username: '',
        confirmPassword: '',
      };
    }
    return data;
  }

  get isReg() {
    return this._mode === ModeValue.REG;
  }

  get formData() {
    return this._formData;
  }

  get formErrors() {
    return this._formErrors;
  }

  get isSubmitting() {
    return this._isSubmitting;
  }

  get isSuccess() {
    return this._isSuccess;
  }

  setValue(name: string, value: string) {
    this._formData = {
      ...this._formData,
      [name]: value,
    };
  }

  private _validate(): boolean {
    const newErrors: FormErrors = {};

    if (this._isReg) {
      const username = this._formData.username!;
      if (!username.trim()) {
        newErrors.username = 'Username is required';
      } else if (username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters long';
      }

      if (this._formData.password !== this._formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (!this._formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this._formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!this._formData.password) {
      newErrors.password = 'Password is required';
    } else if (this._formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    this._formErrors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  async submit(): Promise<boolean> {
    if (!this._validate()) {
      return false;
    }

    this._isSubmitting = true;

    const body: RequestBody = {
      password: this._formData.password,
    };

    if (this._isReg) {
      body.email = this._formData.email;
      body.username = this._formData.username;
    } else {
      body.identifier = this._formData.email;
    }

    const response = await fetchData({
      method: RequestMethod.POST,
      pathname: this._isReg ? ENDPOINTS.register() : ENDPOINTS.login(),
      body: body,
    });

    if (!response.success) {
      let errMes: string = 'Error while registration';
      if (response.data.response) {
        errMes = (response.data.response.data as { error: { message: string } }).error.message ?? 'Error on server';
      }

      runInAction(() => {
        const newErrors = {
          ...this._formErrors,
          server: errMes,
        };
        this._isSuccess = false;
        this._formErrors = newErrors;
        this._isSubmitting = false;
      });
      return false;
    }

    try {
      const normData = normalizeUserResponse(response.data as UserResponseApi);
      if (!this._isReg) {
        rootStore.user.login(normData.jwt, normData.user);
      }
    } catch (err) {
      logger.error(err);
    }

    runInAction(() => {
      this._isSuccess = true;
      this._isSubmitting = false;
    });

    return true;
  }

  destroy() {
    this._formData = this._getInitialFormData();
    this._formErrors = {};
  }
}
