import React from "react";
import styled from "styled-components";
import litloopLogo from "views/assets/litloopLogo3.png";
// import imdbLogo from "views/assets/imdbLogo.svg";
// import { makeStyles } from "@mui/material";

// const useStyles = makeStyles(theme => ({
//   logo: {
//     width: 70,
//     display: "block"
//   }
// }));

const StyledImg = styled.img`
  width: 70px;
  display: block;
`;

function ImdbLogo() {
  // const classes = useStyles();

  return (
    <div>
      <StyledImg

        src={litloopLogo}
        alt="IMDB Logo"

      />
    </div>
  )
}

export default ImdbLogo;
