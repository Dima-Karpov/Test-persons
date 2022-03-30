import { FC, useEffect, useState } from 'react';
import './index.scss';

import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { observer } from 'mobx-react';
import { v4 } from 'uuid';

import { Person } from 'components/Person';
import { SettingPerson } from 'components/SettinngPerson';
import { AddPersonParam } from 'services/types';
import { personsStore } from 'store/personStore';

export const PersonsPage: FC = observer(() => {
  const { getPersons, persons, addPerson, searchValue, changeSearchValue } = personsStore;

  useEffect(() => {
    getPersons();
  }, []);

  const [isAddPannelVisible, setIsAddPannelVisible] = useState<boolean>(false);
  const initialEditFormValues = { name: '', number: '', url: '' };

  const addNewPerson = (requestParam: AddPersonParam): void => {
    addPerson(requestParam).then(() => setIsAddPannelVisible(false));
  };

  const toggleAddPannelVisible = (): void => {
    setIsAddPannelVisible(!isAddPannelVisible);
  };

  return (
    <Container maxWidth="sm">
      <div className="content">
        {isAddPannelVisible ? (
          <SettingPerson personInfo={initialEditFormValues} saveSettings={addNewPerson} />
        ) : (
          <div className="content__block-search">
            <TextField
              value={searchValue}
              onChange={changeSearchValue}
              label="Search"
              variant="standard"
            />
            <div className="content__block-search__add-button">
              <Button onClick={toggleAddPannelVisible} variant="outlined">
                {isAddPannelVisible ? 'Cancel' : 'Add'}
              </Button>
            </div>
          </div>
        )}

        <div className="persons">
          {persons.map(person => (
            <Person key={v4()} personInfo={person} />
          ))}
        </div>
      </div>
    </Container>
  );
});
