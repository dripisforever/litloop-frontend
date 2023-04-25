import React, {useState} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// MATERIAL DONE
// import { withStyles } from '@mui/material/styles';
// import { IconButton, Avatar, Button, Menu, MenuItem, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  StyledIconButton,
  StyledAvatar,
  StyledButton,
  StyledMenu,
  StyledMenuItem,
  StyledListItem,
  StyledListItemIcon,
  StyledListItemText
} from 'views/styledComponents';

// import MenuIcon from "@mui/icons-material/Menu";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import SendIcon from '@mui/icons-material/Send';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import { StyledMenuIcon, StyledInboxIcon, StyledDraftsIcon, StyledSendIcon, StyledFavoriteIcon } from 'views/styledComponents/icons';

// VIEWS
import RouterLink from "views/components/RouterLink";

// CORE
import { toggleDrawer } from "core/actions";
import ListItemWithAvatarFromSpotify from "views/components/ListItemWithAvatarFromSpotify";
import { getState } from "core/store";

// const StyledMenuOld = withStyles({
//   paper: {
//     border: '1px solid #d3d4d5',
//   },
// })((props) => (
//   <Menu
//     elevation={0}
//     getContentAnchorEl={null}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'center',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'center',
//     }}
//     {...props}
//   />
// ));
//
// const StyledMenuItemOld = withStyles((theme) => ({
//   root: {
//     '&:focus': {
//       backgroundColor: theme.palette.primary.main,
//       '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//         color: theme.palette.common.white,
//       },
//     },
//   },
// }))(MenuItem);










function AvatarHover({avatarUrl}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const authUser = getState().users

  function handleClick() {
    dispatch(toggleDrawer());
  }

  const handleClickz = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const authUser = getState().users

  return (
    <div>
      {/*<Button onClick={handleClick}>
        <Avatar src={avatarUrl}  variant={"circle"} />


      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>*/}

      <StyledIconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <StyledAvatar src={avatarUrl}  variant={"circular"} />

      </StyledIconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <StyledListItemIcon>
            <StyledSendIcon fontSize="small" />
          </StyledListItemIcon>
          <StyledListItemText primary="My Profile" />
        </StyledMenuItem>
        { authUser.access_token &&
          <StyledListItem button to={'/liked'} component={RouterLink}>
            <StyledListItemIcon><StyledFavoriteIcon/></StyledListItemIcon>
            <StyledListItemText primary={"Liked"} />
          </StyledListItem>
        }
        <StyledMenuItem>
          <StyledListItemIcon>
            <StyledDraftsIcon fontSize="small" />
          </StyledListItemIcon>
          <StyledListItemText primary="Liked" />
        </StyledMenuItem>

        <StyledMenuItem>
          <StyledListItemIcon>
            <StyledInboxIcon fontSize="small" />
          </StyledListItemIcon>
          <StyledListItemText primary="Logout" />
        </StyledMenuItem>

      </StyledMenu>
    </div>

  );
}

export default AvatarHover;
