import React from "react";
import { Switch } from "react-router-dom";
import useScrollRestoration from "hooks/useScrollRestoration";

function SwitchWithScrollRestoration({ children, location }) {
  useScrollRestoration();
  // console.log("location:"+ location.key);
  return (
    <Switch location={location}>
      {children}
    </Switch>
  );
}

export default SwitchWithScrollRestoration;
