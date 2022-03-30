import { action, makeObservable, observable, runInAction } from 'mobx';

import { authApi } from 'services/authApi';
import { RequestStatusType, User } from 'services/types';
import { storageUtil } from 'utils/storageUtil';

const initialStoreValues = {
  isAuth: Boolean(storageUtil.getAccessToken()),
  login: '',
  errorMessage: '',
  status: 'idle' as RequestStatusType,
};

class AuthStore {
  isAuth: boolean = initialStoreValues.isAuth;

  login: string = initialStoreValues.login;

  errorMessage: string = initialStoreValues.errorMessage;

  status: RequestStatusType = initialStoreValues.status;

  constructor() {
    makeObservable(this, {
      login: observable,
      errorMessage: observable,
      isAuth: observable,
      status: observable,
      auth: action.bound,
      updateIsAuth: action.bound,
      logout: action.bound,
      resetStoreValues: action.bound,
    });
  }

  resetStoreValues(): void {
    this.errorMessage = initialStoreValues.errorMessage;
  }

  async auth(login: string, password: string): Promise<void> {
    this.status = 'loading';
    try {
      const user: User = await authApi.auth(login, password);
      runInAction(() => {
        if (user) {
          this.login = user.login;
          storageUtil.setToken(user.id);
          this.isAuth = true;
        } else {
          this.errorMessage = 'Data entered incorrectly';
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.status = 'succeeded';
    }
  }

  logout(): void {
    storageUtil.clearToken();
    this.isAuth = false;
    this.login = initialStoreValues.login;
  }

  async updateIsAuth(): Promise<void> {
    this.status = 'loading';
    try {
      this.isAuth = Boolean(storageUtil.getAccessToken());
      const token: string | null = storageUtil.getAccessToken();
      if (token) {
        const user: User = await authApi.getUser(token);
        runInAction(() => {
          if (user) {
            this.login = user.login;
          }
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.status = 'succeeded';
    }
  }
}

export const authStore = new AuthStore();
