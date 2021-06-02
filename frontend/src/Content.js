import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';

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
    padding: theme.spacing(2),
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
  const id = open ? 'simple-popover' : undefined;

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
              <IconButton aria-label={`info about ${listing.title}`} className={classes.icon} onClick={handleClick}>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
              >
              <Typography className={classes.typography}>Title: {listing.title}</Typography>
              <Typography className={classes.typography}>Description: {listing.description}</Typography>
              <Typography className={classes.typography}>Seller: {listing.username}</Typography>
              <Typography className={classes.typography}>Contact: {listing.contact}</Typography>
              <Typography className={classes.typography}>Price: ${listing.price}</Typography>
              <Typography className={classes.typography}>Zip Code: {listing.location.zip}</Typography>
              </Popover>
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