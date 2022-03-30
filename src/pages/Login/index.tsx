import { ChangeEvent, FC } from 'react';
import './index.scss';

import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';

import { authStore } from 'store/authStore';

const validationSchema = yup.object().shape({
  login: yup.string().required('Login is  required'),
  password: yup.string().required('Password is  required'),
});

export const Login: FC = observer(() => {
  const { handleChange, errors, values, submitForm } = useFormik({
    initialValues: {
      login: '',
      password: '',
    },

    async onSubmit(formData) {
      await authStore.auth(formData.login, formData.password);
    },
    validationSchema,
  });

  const changeFormValues = (event: ChangeEvent<HTMLInputElement>): void => {
    authStore.resetStoreValues();
    handleChange(event);
  };

  if (authStore.isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item justifyContent="center">
        <FormControl>
          <FormLabel>
            <p>To enter the test format:</p>
            <p>Login: test-account_1</p>
            <p>Password: test-account_1</p>
          </FormLabel>
          <FormGroup>
            <TextField
              label="Login"
              type="login"
              margin="normal"
              value={values.login}
              required
              onChange={changeFormValues}
              fullWidth
              id="login"
              name="login"
            />
            {errors.login ? <div className="error">{errors.login}</div> : null}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              value={values.password}
              onChange={changeFormValues}
              fullWidth
              required
              id="password"
              name="password"
            />
            {errors.password ? <div className="error">{errors.password}</div> : null}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={submitForm}
            >
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
});
