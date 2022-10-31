import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

const Header = ({ }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Demo App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;