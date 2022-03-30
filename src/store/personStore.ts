import { ChangeEvent } from 'react';

import { action, makeObservable, observable, runInAction } from 'mobx';
import { v4 } from 'uuid';

import { personsApi } from 'services/personsApi';
import { AddPersonParam, PersonType } from 'services/types';
import { authStore } from 'store/authStore';
import { storageUtil } from 'utils/storageUtil';

const initialStoreValues = {
  persons: [],
  searchValue: '',
};

class PersonsStore {
  persons: Array<PersonType> = initialStoreValues.persons;

  searchValue: string = initialStoreValues.searchValue;

  constructor() {
    makeObservable(this, {
      persons: observable,
      searchValue: observable,
      getPersons: action.bound,
      deletePerson: action.bound,
      addPerson: action.bound,
      updatePerson: action.bound,
      changeSearchValue: action.bound,
    });
  }

  filterPerson(contacts: Array<PersonType>): Array<PersonType> {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.searchValue.toLowerCase()),
    );
  }

  changeSearchValue(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
    this.searchValue = e.target.value;
    this.getPersons();
  }

  async getPersons(): Promise<void> {
    authStore.status = 'loading';
    try {
      const token = storageUtil.getAccessToken();
      if (token) {
        const persons: Array<PersonType> = await personsApi.getPersons(token);
        const filterPerson = this.filterPerson(persons);
        runInAction(() => {
          this.persons = filterPerson;
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      authStore.status = 'succeeded';
    }
  }

  async addPerson(requestParam: AddPersonParam): Promise<void> {
    const { name, number, url } = requestParam;
    const requestContacts: Array<PersonType> = [
      { id: v4(), name, number, url },
      ...this.persons,
    ];
    authStore.status = 'loading';
    try {
      const token = storageUtil.getAccessToken();
      if (token) {
        const contacts: Array<PersonType> = await personsApi.updatePerson(
          token,
          requestContacts,
        );
        const filterPerson = this.filterPerson(contacts);
        runInAction(() => {
          this.persons = filterPerson;
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      authStore.status = 'succeeded';
    }
  }

  async deletePerson(contactId: string): Promise<void> {
    authStore.status = 'loading';
    try {
      const token = storageUtil.getAccessToken();
      if (token) {
        const requestPerson: Array<PersonType> = this.persons.filter(
          person => person.id !== contactId,
        );
        const persons: Array<PersonType> = await personsApi.updatePerson(
          token,
          requestPerson,
        );
        const filterPerson = this.filterPerson(persons);
        runInAction(() => {
          this.persons = filterPerson;
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      authStore.status = 'succeeded';
    }
  }

  async updatePerson(requestParam: AddPersonParam, id: string): Promise<void> {
    const { name, number, url } = requestParam;
    const requestContacts: Array<PersonType> = [...this.persons];
    const index = requestContacts.findIndex(person => person.id === id);
    requestContacts[index] = { id: v4(), name, number, url };
    authStore.status = 'loading';
    try {
      const token = storageUtil.getAccessToken();
      if (token) {
        const persons: Array<PersonType> = await personsApi.updatePerson(
          token,
          requestContacts,
        );
        const filterPerson = this.filterPerson(persons);
        runInAction(() => {
          this.persons = filterPerson;
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      authStore.status = 'succeeded';
    }
  }
}

export const personsStore = new PersonsStore();
