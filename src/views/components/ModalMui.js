import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  closesButton: {

    maxwidth: "2000px",
  },
  // paper: { minWidth: "1280px" },
  paper: { minWidth: "90%" }
}));

function ModalMui({ children, open, fullScreen, onExited, ...rest }) {
  const [showModal, setShowModal] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    if (open) {
      setShowModal(true);
    }
  }, [open]);

  function startExitAnimation() {
    setShowModal(false);
  }

  function onExitAnimationEnd() {
    onExited();
  }

  return (
    <Dialog
      {...rest}
      open={showModal}
      className={classes.closesButton}
      classes={{ paper: classes.paper}}
      maxWidth="lg"
      onClose={startExitAnimation}
      onExited={onExitAnimationEnd}
      transitionDuration={0}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

// MuiModal.propTypes = {
//   ...Dialog.propTypes
// };

export default ModalMui;
