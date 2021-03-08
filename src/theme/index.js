import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  overrides: {
    MuiDialogContent: {
      width: "55em",
      color: "red"
    }
  },
  palette: {
    type: "dark"
  }
});

export default theme;
