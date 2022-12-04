import { createMuiTheme } from "@material-ui/core";
import { createTheme } from "@material-ui/core";

// const theme = createMuiTheme({
const theme = createTheme({
  overrides: {
    MuiDialogContent: {
      width: "55em",
      color: "red",
    },
    MuiContainer: {
      backgroundColor: "red",
      display: "flex"
    },
  },
  palette: {
    type: "dark"
  },
  root: {

  }
});

export default theme;
