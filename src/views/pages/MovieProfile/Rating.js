import React from "react";

// MATERIAL DONE
// import { CircularProgress, Avatar, makeStyles, colors } from "@mui/material";
import { StyledCircularProgress, StyledAvatar } from 'views/styledComponents';

// const useStyles = makeStyles(theme => ({
//   avatar: {
//     width: 46,
//     height: 46,
//     backgroundColor: colors.common.white
//   },
//   value: theme.typography.button,
//   percent: {
//     fontSize: "50%"
//   }
// }));

function Rating({ value }) {
  // const classes = useStyles();

  return (
    <StyledAvatar
      // className={classes.avatar}
    >
      {/*<CircularProgress
        style={{ position: "absolute" }}
        variant="static"
        value={value}
        color="primary"
        thickness={4}
      />*/}
      <span
        // className={classes.value}
      >
        {value}
        {/*<sup className={classes.percent}>%</sup>*/}
      </span>
    </StyledAvatar>
  );
}

export default Rating;
