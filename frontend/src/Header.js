import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">
            eSale
          </Typography>
          <Button color="inherit">Account</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}