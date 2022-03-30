import { FC } from 'react';

import { Navigate } from 'react-router-dom';

import { login } from 'endpoints';

type PrivateRouteProps = {
  isAuth: boolean;
};

export const PrivateRoute: FC<PrivateRouteProps> = ({ children, isAuth }) => (
  <div>{isAuth ? children : <Navigate to={login} />}</div>
);
