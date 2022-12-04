import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, makeStyles, List } from "@material-ui/core";
import { toggleDrawer, fetchLogout } from "core/actions";
import MovieIcon from "@material-ui/icons/LocalMovies";
import PersonIcon from "@material-ui/icons/RecentActors";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { ListItemIcon, ListItemText, ListItem } from "@material-ui/core";

import { selectors } from "core/reducers/index";
import AppDrawerItem from "views/components/AppDrawerItem";
import RouterLink from "views/components/RouterLink";

import { getState } from 'core/store';

import { useLocation } from "react-router-dom";
import useSelectAuthUser from "core/hooks/useSelectAuthUser";

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: 240
  }
}));

function AppDrawer() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const isOpen = useSelector(state => selectors.selectIsDrawerOpen(state));
  const prevLocation = useRef();

  useEffect(() => {
    if (location !== prevLocation.current && isOpen) {
      dispatch(toggleDrawer());
    }
  }, [location, isOpen, dispatch]);

  useEffect(() => {
    prevLocation.current = location;
  });

  function handleClose() {
    dispatch(toggleDrawer());
  }

  function handleLogOut(){
    dispatch(fetchLogout())
  }

  const authUser = getState().users
  // const { isSignedIn, isFetching, authUser } = useSelectAuthUser();

  return (
    <Drawer
      open={isOpen}
      anchor="right"
      classes={{ paper: classes.drawerPaper }}
      onClose={handleClose}
    >
      <List>
        { authUser.access_token &&
          <ListItem
            button
            to={'/liked'}
            component={RouterLink}

          >
            <ListItemIcon><FavoriteIcon/></ListItemIcon>
            <ListItemText primary={"Liked"} />
          </ListItem>
        }

        { authUser.access_token &&
          <ListItem
            button
            to={'/movies'}
            component={RouterLink}
            onClick={handleLogOut}
          >
            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        }

        { !authUser.access_token &&
          <ListItem
            button
            to={'/login'}
            component={RouterLink}

          >
            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
            <ListItemText primary={"SignIn"} />
          </ListItem>
        }
      </List>
    </Drawer>
  );
}

export default AppDrawer;
