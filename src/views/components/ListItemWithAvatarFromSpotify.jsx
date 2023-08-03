import React from "react";
// import {
//   ListItem,
//   ListItemAvatar,
//   Avatar,
//   ListItemText,
//   makeStyles
// } from "@mui/material";
import {
  StyledListItem,
  StyledListItemAvatar,
  StyledAvatar,
  StyledListItemText,
} from 'views/styledComponents';
import { useConfiguration } from "./ConfigurationProvider";

// const useStyles = makeStyles(theme => ({
//   secondaryText: {
//     wordBreak: "break-word"
//   }
// }));

function ListItemWithAvatarFromSpotify({
  avatarUrl,
  primaryText,
  secondaryText,
  artistName,
  ...rest
}) {
  // const classes = useStyles();
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
    <StyledListItem hover alignItems="flex-start" dense {...rest}>
      <StyledListItemAvatar>
        <StyledAvatar src={avatarUrl}  variant={"circular"} />
      </StyledListItemAvatar>

      {/*<StyledListItemText

        primary={primaryText}
        secondary={secondaryText}
      />*/}
      <StyledListItemText

        // primary={primaryText}
        // secondary={secondaryText}
      >
      {primaryText} <br/>

      {artistName.map((item, index) => {
        return item.name
      })} <br/>

      {/*{secondaryText}*/}
      </StyledListItemText>
    </StyledListItem>
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
