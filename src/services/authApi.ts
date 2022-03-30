import axios from 'axios';

import { User } from './types';

import { baseULR } from 'endpoints';

const firstElement = 0;

class AuthApi {
  auth(login: string, password: string): Promise<User> {
    return axios
      .get(`${baseULR}/users?login=${login}&password=${password}`)
      .then(response => response.data[firstElement])
      .catch(error => error.response && error.response.data);
  }

  getUser(id: string): Promise<User> {
    return axios
      .get(`${baseULR}/users?id=${id}`)
      .then(response => response.data[firstElement])
      .catch(error => error.response && error.response.data);
  }
}

export const authApi = new AuthApi();
