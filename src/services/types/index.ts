export type User = {
  id: string;
  login: string;
  password: string;
};

export type PersonList = {
  id: string;
  personList: Array<PersonType>;
};

export type PersonType = {
  id: string;
  name: string;
  number: string;
  url: string;
};

export type AddPersonParam = Omit<PersonType, 'id'>;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
