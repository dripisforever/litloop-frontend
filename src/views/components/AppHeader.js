import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// MATERIAL
import { AppBar, Toolbar, Typography, Link, Box, IconButton, Button, } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';

// VIEWS
import RouterLink from "./RouterLink";
import MovieAndPersonAutoSearch from "views/components/MovieAndPersonAutoSearch";
import DrawerToggleButton from "views/components/DrawerToggleButton";
import AvatarHover from "views/components/AvatarHover";
// CORE
import useDetectMobile from "core/hooks/useDetectMobile";
import HideOnScroll from "./HideOnScroll";
import { getState } from 'core/store';

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
const LoginBtn = styled(Link)`
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

const authUser = getState().users

const useStyles = makeStyles(theme => ({
  titleLink: {
    "&:hover": {
      textDecoration: "none"
    }
  },
  closeMobileSearchButton: {
    marginRight: theme.spacing(2)
  },
  searcher: {
    maxWidth: 680
  },

  root: {
    flexGrow: 1,
  },
  toolbar: {
    height: '80px',
    // height: '50px',
    minHeight: '50px',
    backgroundColor: '#000000'
  }
}));

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: 1300,
    },
   //search props for search bar
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
        backgroundColor: '#EAE9E8'
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
})

// STYLED
const AppBarStyled = styled.div`
  background: #0a0a0a;
  /* height: 60px; */
`;

const ToolbarStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1.5rem;
  grid-gap: 11em;
  /* grid-template-columns: 540px 600px 99px; */
  /* grid-gap: 100px; /*
`;

const BoxStyled = styled.div`
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
`;

const LogoSpan = styled.span`
  /* display: flex; */
`;


const AppHeader = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const isMobile = useDetectMobile();
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const { userProfile } = props;

  const  user  = useSelector((state) => state.users);

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

      <AppBarStyled ref={ref} color="default">
        <ToolbarStyled
          // className={classes.toolbar}
        >
          {(!isMobile || !isMobileSearch) && (
            <Logo>
              <LogoSpan className="LitLoop">
                <Link
                  className={classes.titleLink}
                  to="/movies"
                  color="inherit"
                  component={RouterLink}
                >
                  <Typography variant="h6">LitLoop</Typography>
                </Link>
              </LogoSpan>
            </Logo>
          )}

          {isMobile ? (
            isMobileSearch ? (
              <>
                <IconButton
                  className={classes.closeMobileSearchButton}
                  onClick={hideMobileSearch}
                >
                  <CloseIcon />
                </IconButton>
                <MovieAndPersonAutoSearch autoFocus />
              </>
            ) : (
              <>
                <Box flex={1} />
                <IconButton onClick={showMobileSearch}>
                  <SearchIcon />
                </IconButton>
              </>
            )
          ) : (
            <BoxStyled
              flex={1}
              mx={2}
              display="flex"
              justifyContent="center"
              >
              <MovieAndPersonAutoSearch className={classes.searcher} />
            </BoxStyled>
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
            <LoginBtn
              color="secondary"
              variant="contained"
              href="/login"
              // onClick={()=> {fetchAuthUser(data)}}
              >Login
            </LoginBtn>
          }
        </ToolbarStyled>
      </AppBarStyled>
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
