import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// MATERIAL DONE
// import { AppBar, Toolbar, Typography, Link, Box, IconButton, Button, } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";
// import { fade } from '@mui/material/styles';
// import { makeStyles } from '@mui/material/styles';

// VIEWS
import RouterLink from "./RouterLink";
import MovieAndPersonAutoSearch from "views/components/MovieAndPersonAutoSearch";
import DrawerToggleButton from "views/components/DrawerToggleButton";
import AvatarHover from "views/components/AvatarHover";
import litloopLogo from "views/assets/litloopLogo3.png";

// CORE
import useDetectMobile from "core/hooks/useDetectMobile";
import HideOnScroll from "./HideOnScroll";
import { getState } from 'core/store';

const authUser = getState().users;

// const useStyles = makeStyles(theme => ({
//   titleLink: {
//     "&:hover": {
//       textDecoration: "none"
//     }
//   },
//   closeMobileSearchButton: {
//     marginRight: theme.spacing(2)
//   },
//   searcher: {
//     maxWidth: 680
//   },
//
//   root: {
//     flexGrow: 1,
//   },
//   toolbar: {
//     height: '80px',
//     // height: '50px',
//     minHeight: '50px',
//     backgroundColor: '#000000'
//   }
// }));

// STYLED
const StyledAppBar = styled.div`
  width: 100%;
  background: #0a0a0a;
  height: 60px;
  z-index: 3;
  position: fixed;


`;
const StyledToolbar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  grid-gap: 11em;
  /* grid-template-columns: 540px 600px 99px; */
  /* grid-gap: 100px; /*
`;
const StyledTypography = styled.p`

`;
const StyledLink = styled.a`

`;
const StyledBox = styled.div`
  width: 100%;
`;
const StyledIconButton = styled.button`

`;
const StyledButton = styled.button`

`;

const StyledSearchIcon = styled.div`

`;
const StyledCloseIcon = styled.div`

`;
const LoginWrapper = styled.div`
  padding-right: 1em;
`;

const LitLoopLogo = styled.img`
  /* width: 48px; */
  display: block;

  width: 30px;
  height: 30px;
  margin-top: auto;
  margin-bottom: auto;

  /* margin-left: auto; */
  /* margin-right: auto; */
`;
const Logo = styled.div`
  display: flex;
  height: 100%;
  padding-left: 1em;
`;
const LogoSpan = styled.span`
  /* display: flex; */
`;

const LinkStyled = styled(RouterLink)`
  display: flex;
  color: white;
  text-decoration: none;
  font-family: Verdana;
`;
const MyButton = styled(RouterLink)`
  /* background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%); */
  background: linear-gradient(45deg, #673ab7 30%, #3f51b5 90%);
  border: 0;
  border-radius: 3px;
  /* box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3); */
  color: white;
  height: 48px;
  /* padding: 0 30px; */
  padding: 15px 30px;
  text-decoration: none;
`;
const LoginBtn = styled(RouterLink)`

  color: white;
  /* background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%); */
  background: linear-gradient(45deg, #673ab7 30%, #3f51b5 90%);
  border: 0;
  border-radius: 18px;
  /* box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3); */


  /* padding: 0 30px; */
  padding: 15px 30px;
  text-decoration: none;

`;


const AppHeader = React.forwardRef((props, ref) => {
  // const classes = useStyles();
  const isMobile = useDetectMobile();
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const { userProfile } = props;

  const user = useSelector((state) => state.users);

  const authed = getState().users.access_token;
  useEffect(() => {
    if (!isMobile) {
      setIsMobileSearch(false);
    }
  }, [isMobile]);

  function showMobileSearch() {
    setIsMobileSearch(true);
  }

  function hideMobileSearch() {
    setIsMobileSearch(false);
  }


  return (
    // <HideOnScroll>

      <StyledAppBar ref={ref}>
        <StyledToolbar
          // className={classes.toolbar}
        >
          {(!isMobile || !isMobileSearch) && (
            <Logo>

              <LogoSpan className="LitLoop">
                <LinkStyled
                  to={"/movies"}
                  color="inherit"
                >
                  <LitLoopLogo src={litloopLogo} />
                  <p className="litloop_logo_title">
                    LitLoop
                  </p>
                </LinkStyled>
              </LogoSpan>
            </Logo>
          )}

          {isMobile ? (
            isMobileSearch ? (
              <>
                <StyledIconButton
                  // className={classes.closeMobileSearchButton}
                  onClick={hideMobileSearch}
                >
                  <StyledCloseIcon />
                </StyledIconButton>
                {/*<MovieAndPersonAutoSearch autoFocus />*/}
              </>
            ) : (
              <>
                <StyledBox flex={1} />
                <StyledIconButton onClick={showMobileSearch}>
                  <StyledSearchIcon />
                </StyledIconButton>
              </>
            )
          ) : (
            <StyledBox
              flex={1}
              mx={2}

              justifyContent="center"
              >
              <MovieAndPersonAutoSearch />
            </StyledBox>
          )}


          {(!isMobileSearch && authed) ?
            (<AvatarHover avatarUrl={getState().users?.response?.result?.avatar} />) :

            // (<AvatarHover avatarUrl={user.response.result.avatar} />) :
            // (<AvatarHover avatarUrl={getState().users.response.avatar} />) :

            // BACKUP
            // (<AvatarHover avatarUrl={getState().users.avatar} />) :
            // <MyButton
            //   color="secondary"
            //   variant="contained"
            //   to="/login"
            //   // onClick={()=> {fetchAuthUser(data)}}
            //   >Login
            // </MyButton>
            <LoginWrapper>
              <LoginBtn
                // color="secondary"
                variant="contained"
                to="/login"
                // onClick={()=> {fetchAuthUser(data)}}
                >Login
              </LoginBtn>
            </LoginWrapper>
          }
        </StyledToolbar>
      </StyledAppBar>
    // </HideOnScroll>
  );
});

// export default AppHeader;
const mapStateToProps = state => ({
  // photos: state.items.photos,
  // nextPhotosLink: state.items.photosAttr.next,
  userProfile: state.users.response,
});

// const mapDispatchToProps = dispatch => {
//     return {
//         login: (creds) => {
//             dispatch(fetchLoginUser(creds))
//         },
//
//     }
// }

export default connect(mapStateToProps, null)(AppHeader)

// export default connect(null, mapDispatchToProps)(withStyles(styles)(Header));
