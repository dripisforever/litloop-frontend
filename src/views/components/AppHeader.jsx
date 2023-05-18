import React, { useState, useEffect, useContext } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// VIEWS
import RouterLink from "./RouterLink";
import ModalLink from "views/components/ModalLink";
import MovieAndPersonAutoSearch from "views/components/MovieAndPersonAutoSearch";
import DrawerToggleButton from "views/components/DrawerToggleButton";
import AvatarHover from "views/components/AvatarHover";
import litloopLogo from "views/assets/litloopLogo3.png";
import Dropdown from "views/components/Dropdown/Dropdown";

import { TwitchContext, TwitchProvider } from 'views/pages/Auth/twitch/useToken';

// CORE
import useDetectMobile from "core/hooks/useDetectMobile";
import HideOnScroll from "./HideOnScroll";
import { getState } from 'core/store';

const authUser = getState().users;

// STYLED
const StyledAppBar = styled.div`
  width: 100%;
  background: #0a0a0a;
  /* background: white; */
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

  /* grid-gap: 11em; */
  /* grid-template-columns: 540px 600px 99px; */
  /* grid-gap: 100px; /*
`;
const StyledTypography = styled.p`

`;
const StyledLink = styled.a`

`;
const StyledBox = styled.div`
  width: 100%;
  padding-left: 6em;
  padding-right: 20em;
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
  height: 100%;

  div.litloop_logo_title {
    margin-left: 5px;
    margin-top: auto;
    margin-bottom: auto;
  }

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
const LoginBtn = styled(ModalLink)`
  display: flex;
  font-family: Verdana;
  color: white;
  /* background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%); */
  background: linear-gradient(45deg, #673ab7 30%, #3f51b5 90%);


  /* box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3); */

  width: 52px;
  border-radius: 13px;
  padding: 12px 23px;
  text-decoration: none;

`;

const BurgerMenu = styled.div`
  cursor: pointer;
  margin-left: 1em;
  svg.BurgerIcon {
   fill: white;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0px;
  }
`;

const BentoMenu = styled.div`
  cursor: pointer;
  margin-left: 2em;

  .bento-menu {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 2px;
    grid-row-gap: 2px;
    height : 22px;
    width : 22px;
  }

  .bento-dot {
    width : 4px;
    height: 4px;
    border-radius: 999px;
    background: white;
    overflow: hidden;
  }
`;

const StyledImg = styled.img`
  width: 40px;
  border-radius: 30px;
  cursor: pointer;
`;
const AppHeader = React.forwardRef((props, ref) => {
  // const classes = useStyles();
  const isMobile = useDetectMobile();
  const { twitchProfileImage } = useContext(TwitchContext) || {};
  // const { twitchProfileImage } = useContext(TwitchContext);
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const [childMessage, setChildMessage] = useState("");

  const { userProfile } = props;

  const user = useSelector((state) => state.users);

  const authed = getState().users.access_token;
  const oauthed = getState().users.google_oauth.oauthed;


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

  useEffect(() => {
    const childResponse = (event) => {
      if (event?.data) {
        console.log(event.data);
        setChildMessage(event.data);
        console.log(event.data.profileImg);
        setChildMessage(event.data.profileImg)
      }
    };
    window.addEventListener("message", childResponse);
    return () => window.removeEventListener("message", childResponse);

  }, []);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleMenuOne = () => {
    console.log('clicked one');
  };

  const handleMenuTwo = () => {
    console.log('clicked two');
  };

  useEffect(() => {


  })
  const is_authorized = () => {

    console.log(oauthed);
    console.log(authed);
    if (oauthed) {
      <AvatarHover avatarUrl={getState().users.google_oauth.profileImg} />
    } else if (authed) {
      <AvatarHover avatarUrl={getState().users.avatar} />
    } else {
      <LoginWrapper>
        <LoginBtn
          // color="secondary"
          variant="contained"
          to="/login"
          // onClick={()=> {fetchAuthUser(data)}}
          >Log In
        </LoginBtn>
      </LoginWrapper>
    }
  }

  return (
    // <HideOnScroll>

      <StyledAppBar ref={ref}>
        <StyledToolbar
          // className={classes.toolbar}
        >
          <BurgerMenu>
            <svg
              width="24"
              height="24"
              className="BurgerIcon"
              viewBox="0 0 24 24"
              version="1.1"
              aria-hidden="false">
              <desc lang="en-US">navigation menu</desc>
              <path d="M3 16h18v2H3v-2ZM3 6v2h18V6H3Zm0 7h18v-2H3v2Z"></path>
            </svg>
          </BurgerMenu>

          {/*<BurgerMenu>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fit=""
              preserveAspectRatio="xMidYMid meet"
              focusable="false">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </BurgerMenu>*/}
          {/*<BentoMenu>
            <div class="bento-menu">
              <div class="bento-dot"></div>
              <div class="bento-dot"></div>
              <div class="bento-dot"></div>
              <div class="bento-dot"></div>
              <div class="bento-dot"></div>
              <div class="bento-dot"></div>
              <div class="bento-dot"></div>
              <div class="bento-dot"></div>
              <div class="bento-dot"></div>
            </div>
          </BentoMenu>*/}

          {(!isMobile || !isMobileSearch) && (
            <Logo>

              <LogoSpan className="LitLoop">
                <LinkStyled
                  to={"/movies"}
                  color="inherit"
                >
                  <LitLoopLogo src={litloopLogo} />
                  <div className="litloop_logo_title">
                    LitLoop
                  </div>
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


          {/*<Dropdown
            trigger={<button onClick={handleDropdownOpen}>Dropdown</button>}
            menu={[
              <button >Menu 1</button>,
              <button >Menu 2</button>,
            ]}
          />*/}

          {is_authorized()}



          {(!isMobileSearch && authed || oauthed) ?
            // (<AvatarHover avatarUrl={getState().users?.response?.result?.avatar} />) :

            // (<img title='Re-authenticate' src={twitchProfileImage} alt='' />):


            // (<AvatarHover avatarUrl={user.response.result.avatar} />) :
            // (<AvatarHover avatarUrl={getState().users.response.avatar} />) :

            // BACKUP
            (<AvatarHover avatarUrl={getState().users.avatar} />) :
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
                >Log In
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
