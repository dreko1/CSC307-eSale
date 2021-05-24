import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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

export default function Sidebar() {
  const classes = useStyles();

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
            <ListItem button key={"First Thing"}>
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary={"First Thing"} />
            </ListItem>
            <ListItem button key={"Second Thing"}>
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary={"Second Thing"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key={"Third Thing"}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary={"Third Thing"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
  );
}
