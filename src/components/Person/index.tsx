import { FC, useState } from 'react';
import './index.scss';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react';

import { SettingPerson } from 'components/SettinngPerson';
import { AddPersonParam, PersonType } from 'services/types';
import { personsStore } from 'store/personStore';

type PersonPropsType = {
  personInfo: PersonType;
};

export const Person: FC<PersonPropsType> = observer(({ personInfo }: PersonPropsType) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { deletePerson, updatePerson } = personsStore;

  const removePerson = (): void => {
    deletePerson(personInfo.id);
  };

  const saveSettings = (requestParam: AddPersonParam): void => {
    updatePerson(requestParam, personInfo.id).then(() => setIsEditMode(false));
  };

  const toggleEditMode = (): void => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div>
      {isEditMode ? (
        <SettingPerson personInfo={personInfo} saveSettings={saveSettings} />
      ) : (
        <Card className="component" sx={{ maxWidth: 345 }}>
          <CardContent className="component__content-card">
            <div className="component__container">
              <Avatar className="avatar" alt="Remy Sharp" src={personInfo.url} />
              <div>
                <Typography component="p">{personInfo.name}</Typography>
                <Typography component="p">{personInfo.number}</Typography>
              </div>
            </div>
          </CardContent>
          <CardActions>
            <Button onClick={toggleEditMode} size="small">
              update
            </Button>
            <Button onClick={removePerson} size="small">
              delete
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
});
