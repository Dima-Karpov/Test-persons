import { FC, ReactElement, useEffect } from 'react';

import 'App.scss';
import { LinearProgress } from '@mui/material';
import { observer } from 'mobx-react';
import { Route, Routes } from 'react-router-dom';

import { Navbar } from 'components/Navbar';
import { dashboard, login } from 'endpoints';
import { Login } from 'pages/Login';
import { PersonsPage } from 'pages/PersonsPage';
import { PrivateRoute } from 'PrevateRoute';
import { authStore } from 'store/authStore';

export const App: FC = observer((): ReactElement => {
  const { updateIsAuth, isAuth, status } = authStore;
  useEffect(() => {
    updateIsAuth();
  }, []);

  return (
    <div className="App">
      <Navbar />
      {status === 'loading' && <LinearProgress />}
      <Routes>
        <Route path={login} element={<Login />} />
        <Route
          path={dashboard}
          element={
            <PrivateRoute isAuth={isAuth}>
              <PersonsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
});
