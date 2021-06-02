import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import ComputerIcon from '@material-ui/icons/Computer';
import HomeIcon from '@material-ui/icons/Home';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SportsIcon from '@material-ui/icons/Sports';
import BuildIcon from '@material-ui/icons/Build';
import ToysIcon from '@material-ui/icons/Toys';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import {makeGetCall} from './axiosMethods'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    }
}));

export default function Sidebar(props) {
  const classes = useStyles();

  function reloadListings(route){
    makeGetCall(route).then((posts)=>{
      console.log(posts);
      props.setListings(posts);
    });
  }
  
  return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key={"All"} onClick={(e)=>reloadListings('/browse/All')}>
              <ListItemIcon><AllInclusiveIcon /></ListItemIcon>
              <ListItemText primary={"All"} />
            </ListItem>
            <ListItem button key={"Auto"} onClick={(e)=>reloadListings('/browse/Auto')}>
              <ListItemIcon><DriveEtaIcon /></ListItemIcon>
              <ListItemText primary={"Auto"} />
            </ListItem>
            <ListItem button key={"Bikes"} onClick={(e)=>reloadListings('/browse/Bikes')}>
              <ListItemIcon><DirectionsBikeIcon /></ListItemIcon>
              <ListItemText primary={"Bikes"} />
            </ListItem>
            <ListItem button key={"Boats"} onClick={(e)=>reloadListings('/browse/Boats')}>
              <ListItemIcon><DirectionsBoatIcon /></ListItemIcon>
              <ListItemText primary={"Boats"} />
            </ListItem>
            <ListItem button key={"Computers"} onClick={(e)=>reloadListings('/browse/Computers')}>
              <ListItemIcon><ComputerIcon /></ListItemIcon>
              <ListItemText primary={"Computers"} />
            </ListItem>
            <ListItem button key={"Household Items"} onClick={(e)=>reloadListings('/browse/Household%20Items')}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary={"Household Items"} />
            </ListItem>
            <ListItem button key={"Music"} onClick={(e)=>reloadListings('/browse/Music')}>
              <ListItemIcon><MusicNoteIcon /></ListItemIcon>
              <ListItemText primary={"Music"} />
            </ListItem>
            <ListItem button key={"Sports"} onClick={(e)=>reloadListings('/browse/Sports')}>
              <ListItemIcon><SportsIcon /></ListItemIcon>
              <ListItemText primary={"Sports"} />
            </ListItem>
            <ListItem button key={"Tools"} onClick={(e)=>reloadListings('/browse/Tools')}>
              <ListItemIcon><BuildIcon /></ListItemIcon>
              <ListItemText primary={"Tools"} />
            </ListItem>
            <ListItem button key={"Toys"} onClick={(e)=>reloadListings('/browse/Toys')}>
              <ListItemIcon><ToysIcon /></ListItemIcon>
              <ListItemText primary={"Toys"} />
            </ListItem>
            <ListItem button key={"Video Games"} onClick={(e)=>reloadListings('/browse/Video%20Games')}>
              <ListItemIcon><SportsEsportsIcon /></ListItemIcon>
              <ListItemText primary={"Video Games"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
  );
}
