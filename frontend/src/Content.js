import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingTop: 5,
  },
  gridList: {
    width: "100vw",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

function Content(props) {
  const classes = useStyles();
  
  console.log(props.listings);
  return (
    <div className={classes.root}>
      <Toolbar />
      <GridList cellHeight={240} className={classes.gridList} cols={3}>
        {props.listings.map((listing) => (
          <GridListTile key={listing.title}>
          <img src={listing.image}/>
          <GridListTileBar
            title={listing.title}
            subtitle={<span>seller: {listing.username}</span>}
            actionIcon={
              <IconButton aria-label={`info about ${listing.title}`} className={classes.icon}>
                <InfoIcon />
              </IconButton>
            }
          />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}


export default Content;


////////////////////////////////////////////
/*
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';



/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 
export default function TitlebarGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {tileData.map((tile) => (
          
        ))}
      </GridList>
    </div>
  );
}
*/