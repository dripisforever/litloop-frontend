import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


// MATERIAL DONE
// import { Dialog, DialogContent } from '@mui/material';
import { StyledDialog, StyledDialogContent } from 'views/styledComponents';
// import { makeStyles } from "@mui/material/styles";


// const useStyles = makeStyles(theme => ({
//   closesButton: {
//
//     maxwidth: "2000px",
//   },
//   // paper: { minWidth: "1280px" },
//   paper: { minWidth: "90%" }
// }));

const ReStyledDialog = styled.div`

`;

const ReStyledDialogContent = styled.div`

`;


function ModalCustom({ children, open, fullScreen, onExited, className, ...rest }) {
  const [showModal, setShowModal] = useState(false);
  // const classes = useStyles();
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

    // <Dialog
    //   {...rest}
    //   open={showModal}
    //   className={classes.closesButton}
    //   classes={{ paper: classes.paper}}
    //   maxWidth="lg"
    //   onClose={startExitAnimation}
    //   onExited={onExitAnimationEnd}
    //   transitionDuration={0}
    // >
    //   <DialogContent>{children}</DialogContent>
    // </Dialog>

    <StyledDialog
      {...rest}
      open={showModal}
      // className={classes.closesButton}
      // classes={{ paper: classes.paper}}
      className={className}
      maxWidth="lg"
      onClose={startExitAnimation}
      onExited={onExitAnimationEnd}
      transitionDuration={0}
    >
      <StyledDialogContent>{children}</StyledDialogContent>
    </StyledDialog>
  );
}

// MuiModal.propTypes = {
//   ...Dialog.propTypes
// };

export default ModalCustom;
