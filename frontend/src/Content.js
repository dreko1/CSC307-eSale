import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListingPopover from './ListingPopover';

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
  typography: {
    padding: theme.spacing(1),
  },
}));

function Content(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
            actionIcon={<ListingPopover data={listing}/>}
          />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}


export default Content;