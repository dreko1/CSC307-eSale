import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CreatePost from './createPost';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import img from './dreko.jpg';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root: {
    maxWidth: 300
  },
  paper: {
    padding: theme.spacing(15),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function Content(props) {
  const classes = useStyles();

  return (
    <main className={classes.content}>
    <Toolbar />
	    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Test Listing"
          height="150"
          image={img}
          title="Test Listing"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Test Listing
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Description
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <CreatePost getCredentials={props.getCredentials}/>
    </main>
  );
}
export default Content;