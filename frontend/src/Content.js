import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {makeGetCall} from './axiosMethods';
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
  
  function buildPost(postData){
    //look at the console to see that this function is called for each listing recieved from the server.
    console.log(postData)
    
    return(
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Test"
          height="140"
          image={img}
          title="Test"
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
    )
  }

  return (
    <main className={classes.content}>
    <Toolbar />
    {props.listings.map(buildPost)}
    </main>
  );
}
export default Content;