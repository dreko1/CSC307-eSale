import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import CreatePost from './createPost';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Content() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
    <Toolbar />
    {CreatePost()}
    </main>
  );
}
