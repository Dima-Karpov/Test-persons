import { FC, useState, ChangeEvent } from 'react';
import './index.scss';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { phoneRegExp } from 'consts';
import { AddPersonParam } from 'services/types';

const validationSchema = yup.object().shape({
  name: yup.string().required('The field is not filled'),
  number: yup.string().matches(phoneRegExp, 'Invalid number'),
  url: yup.string(),
});

type SettingPersonPropsType = {
  saveSettings: (requestParam: AddPersonParam) => void;
  personInfo: AddPersonParam;
};

export const SettingPerson: FC<SettingPersonPropsType> = ({
  saveSettings,
  personInfo,
}) => {
  const [form, setForm] = useState<AddPersonParam>(personInfo);

  const { values, handleChange, submitForm, errors, touched } = useFormik({
    initialValues: {
      name: form.name,
      number: form.number,
      url: form.url,
    },

    async onSubmit(formData) {
      saveSettings(formData);
    },
    validationSchema,
  });

  const changeFormValues = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    handleChange(event);
  };

  return (
    <Card className="component" sx={{ maxWidth: 345 }}>
      <CardContent>
        <TextField
          name="name"
          id="name"
          value={values.name}
          onChange={changeFormValues}
          label="name"
          variant="outlined"
          helperText={touched.name ? errors.name : undefined}
        />
        <br />
        <br />
        <TextField
          id="number"
          name="number"
          value={values.number}
          onChange={handleChange}
          label="phone"
          variant="outlined"
          helperText={touched.number ? errors.number : undefined}
        />
        <br />
        <br />
        <TextField
          name="url"
          id="url"
          value={values.url}
          onChange={handleChange}
          label="URL картинки"
          variant="outlined"
        />
        <br />
      </CardContent>
      <CardActions>
        <Button onClick={submitForm} size="small">
          save
        </Button>
      </CardActions>
    </Card>
  );
};
