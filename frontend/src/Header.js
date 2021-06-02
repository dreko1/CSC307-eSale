import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CreatePost from './createPost';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  
  return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography type="title" color="inherit">
            <b>
              eSale
            </b>
          </Typography>
          <div className={classes.toolbarButtons}>
            <CreatePost credentials={props.credentials}/>
          </div>
        </Toolbar>
      </AppBar>
  );
}