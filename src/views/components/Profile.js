import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import LoadingIndicator from "./LoadingIndicator";

const useStyles = makeStyles(theme => ({
  flexType: {
    width: "100%",
  }
}));

function Profile({ introduction, main, leftSide, rightSide, loading }) {
  const classes = useStyles();
  return (
    // <LoadingIndicator loading={loading}>
      <Box>
        <Box padding={1}>{introduction}</Box>
        <Box  display="flex" flexWrap="wrap">
          {leftSide && (
            <Box flex={1} flexBasis={240} padding={1}>
              {leftSide}
            </Box>
          )}
          <Box className={classes.flexType}  flex={10} flexBasis={500} padding={1}>
            {main}
          </Box>
          {rightSide && (
            <Box flex={1} flexBasis={260} padding={1}>
              {rightSide}
            </Box>
          )}
        </Box>
      </Box>
    // </LoadingIndicator>
  );
}

export default Profile;
