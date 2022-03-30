import { FC } from 'react';

import { AppBar, IconButton, Toolbar, Typography, Button } from '@mui/material';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { dashboard } from 'endpoints';
import { authStore } from 'store/authStore';

export const Navbar: FC = observer(() => {
  const navigate = useNavigate();
  const { logout, isAuth } = authStore;

  const logoutUser = (): void => {
    navigate(dashboard);
    logout();
  };
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Test task persons
        </Typography>
        {isAuth && (
          <Button color="inherit" onClick={logoutUser}>
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
})
