import axios, { AxiosResponse } from 'axios';

import { baseULR } from 'endpoints';
import { PersonType, PersonList } from 'services/types';

class PersonsApi {
  getPersons(id: string): Promise<Array<PersonType>> {
    return axios
      .get(`${baseULR}/persons/${id}`)
      .then((response: AxiosResponse<PersonList>) => response.data.personList);
  }

  updatePerson(
    id: string,
    requestPersons: Array<PersonType>,
  ): Promise<Array<PersonType>> {
    return axios
      .patch(`${baseULR}/persons/${id}`, { personList: requestPersons })
      .then((response: AxiosResponse<PersonList>) => response.data.personList);
  }
}

export const personsApi = new PersonsApi();
