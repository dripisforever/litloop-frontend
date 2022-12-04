import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import { useConfiguration } from "./ConfigurationProvider";

const useStyles = makeStyles(theme => ({
  secondaryText: {
    wordBreak: "break-word"
  }
}));

function ListItemWithAvatarFromSpotify({
  avatarUrl,
  primaryText,
  secondaryText,
  ...rest
}) {
  const classes = useStyles();
  const { getImageUrlz } = useConfiguration();

  function renderItem(avatarUrl) {
    if (avatarUrl.images.length === 0) {
      return getImageUrlz(avatarUrl);
    } else {
      return (
        avatarUrl
      );
    }
  }

  // return (
  //   <ListItem alignItems="flex-start" dense {...rest}>
  //     <ListItemAvatar>
  //       <Avatar src={renderItem}  variant={"circle"} />
  //     </ListItemAvatar>
  //
  //     <ListItemText
  //       classes={{
  //         secondary: classes.secondaryText
  //       }}
  //       primary={primaryText}
  //       secondary={secondaryText}
  //     />
  //   </ListItem>
  // );

  return (
    <ListItem alignItems="flex-start" dense {...rest}>
      <ListItemAvatar>
        <Avatar src={avatarUrl}  variant={"circular"} />
      </ListItemAvatar>

      <ListItemText
        classes={{
          secondary: classes.secondaryText
        }}
        primary={primaryText}
        secondary={secondaryText}
      />
    </ListItem>
  );

  // return (
  //   <ListItem alignItems="flex-start" dense {...rest}>
  //     <ListItemAvatar>
  //       <Avatar src={getImageUrlz(renderItem)}  variant={"circle"} />
  //     </ListItemAvatar>
  //
  //     <ListItemText
  //       classes={{
  //         secondary: classes.secondaryText
  //       }}
  //       primary={primaryText}
  //       secondary={secondaryText}
  //     />
  //   </ListItem>
  // );
}

export default ListItemWithAvatarFromSpotify;
