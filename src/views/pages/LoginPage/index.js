
import React, { useState, useEffect, useContext } from 'react'
import { connect, useDispatch, useSelector} from 'react-redux';
// import { Navigate, Link, useNavigate } from 'react-router-dom'
// import { Form, Row, Col, Button } from 'reactstrap'
import { Redirect } from "react-router-dom";

import { FaTwitch } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaSpotify } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaUnsplash } from 'react-icons/fa';
import { FaSoundcloud } from 'react-icons/fa';
import { FaDeezer } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
// import { styled as styledd }  from 'styled-components';
// import * as styledd from 'styled-components';
import styled from 'styled-components';


// MATERIAL
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// VIEWS
// import FormControl from './FormControl'
import { twitchSignInAction, googleSignInAction, appleSignInAction, spotifySignInAction, unsplashSignInAction, deezerSignInAction, instagramSignInAction} from "views/pages/LoginPage/action"
import ReAuthenticateButton from 'views/pages/Auth/ReAuthenticateButton';
import disconnectYoutube from 'views/pages/Auth/youtube/disconnectYoutube';
import disconnectTwitch from 'views/pages/Auth/twitch/disconnectTwitch';


import { TwitchContext } from 'views/pages/Auth/twitch/useToken';
import { YoutubeContext } from 'views/pages/Auth/youtube/useToken';
import { SpotifyContext } from 'views/pages/Auth/spotify/useToken';
import { GoogleContext } from 'views/pages/Auth/google/useToken';

// CORE
import { fetchAuthUser,  } from 'core/actions'
import useHistoryPush from "core/hooks/useHistoryPush";
// import { selectAuth } from 'core/reducers/authSlice';
import { selectors } from "core/reducers/index";
import { feedPreferencesAtom, useFeedPreferences } from 'core/atoms/atoms';

// const MyButton = styled(Button)({
//   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//   border: 0,
//   borderRadius: 3,
//   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   color: 'white',
//   height: 48,
//   padding: '0 30px',
// });

const LoginBtn = styled.button`
  /* background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%); */
  background: linear-gradient(45deg, #673ab7 30%, #3f51b5 90%);
  border: 0;
  border-radius: 3px;
  /* box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3); */
  color: white;
  height: 48px;
  padding: 0 30px;
  cursor: pointer;
`;

const OAuthWrapper = styled.div`

`;

const OAuthLoginButton = styled.button`
  cursor: pointer;
  margin-left: 7em;
  margin-top: 1em;
  display: flex;
  /* height: 30px; */
  width: 50%;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  grid-gap: 10px;
  gap: 10px;
`;

const FaSpotifyIcon = styled(FaSpotify)`
  color: #2fd566;

`
const FaSoundCloudIcon = styled(FaSoundcloud)`
  color: #f50;

`
const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  root: {
    // backgroundColor: '#161616',
  },
  main: {
    // padding: theme.spacing(2),
    // paddingTop: "55px",
    // paddingRight: "16px",
    // paddingBottom: "16px",
    // paddingLeft: "16px",
    // backgroundColor: '#161616',
    // maxWidth: "2560px",
  },
  test: {

    // minHeight: '48px',
    width: '100%',
    margin: '0',
    // backgroundColor: '#161616'
  },
  input: {
    width: '100%',
  },
  arde: {
    // backgroundColor: '#161616'
  }
}));


function LoginForm () {
  const {
    setAutoRefreshEnabled,
    autoRefreshEnabled,
    twitchVideoHoverEnable,
    setTwitchVideoHoverEnable,
    isEnabledOfflineNotifications,
    setIsEnabledOfflineNotifications,
    isEnabledUpdateNotifications,
    setIsEnabledUpdateNotifications,
    setEnableVodVolumeOverlay,
    enableVodVolumeOverlay,
    setTwitchAccessToken,
    twitchAccessToken,
  } = useContext(TwitchContext) || {};
  const {
    youtubeVideoHoverEnable,
    setYoutubeVideoHoverEnable,
    setYoutubeAccessToken,
    youtubeAccessToken,
  } = useContext(YoutubeContext) || {};

  const { toggleEnabled, toggleSidebar } = useFeedPreferences();

  const classes = useStyles();

  const dispatch = useDispatch()
  const historyPush = useHistoryPush();
  // const authSelector = useSelector(selectAuth);
  // const navigate = useNavigate();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState(null)
  const [isError, setIsError] = useState(false);

  const [loginDetail, setLoginDetail] = useState({username: '', password: ''})

  // if (authSelector.authenticated) {
  //   return <Redirect to={"/"} />;
  //   // navigate("/")
  // }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(fetchAuthUser({
      email: email,
      password: password
    }))
  }

  async function handleTwitchButtonClick(e) {
    e.preventDefault();

    try {
      dispatch(twitchSignInAction());
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  }

  async function handleGoogleButtonClick(e) {
    e.preventDefault();

    try {
      dispatch(googleSignInAction());
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  }

  async function handleUnsplashButtonClick(e) {
    e.preventDefault();

    try {
      dispatch(unsplashSignInAction());
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  }

  async function handleAppleButtonClick(e) {
    e.preventDefault();

    try {
      dispatch(appleSignInAction());
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  }

  async function handleSpotifyButtonClick(e) {
    e.preventDefault();

    try {
      dispatch(spotifySignInAction());
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  }

  async function handleDeezerButtonClick(e) {
    e.preventDefault();

    try {
      dispatch(deezerSignInAction());
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  }
  async function handleInstagramButtonClick(e) {
    e.preventDefault();

    try {
      dispatch(instagramSignInAction());
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  }

  const isFetching = useSelector(state =>
    selectors.selectIsFetchingToken(state)
  );

  // useEffect(() => {
  //   dispatch(fetchAuthUser(email, password))
  // }, [dispatch, email, password])

  // render() {
      // const { data, errors } = this.state
  // const classes = useStyles();

  return (
    <Container className={"container"} maxWidth="xs">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container
          spacing={3}
          // className={classes.test}
          >
          {/*// 1*/}
          <Grid
            item xs={12}

          >
            <Grid container spacing={2}>
              <Grid item
                // class={classes.input}
                xs={12}>
                <TextField
                  className={classes.input}
                  name="Email"
                  label="Email"
                  type="text"
                  value={email}
                  // handleChange={handleChange}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  inputProps={{
                    autoComplete: 'on'
                  }}
                    // error={username}
                />
              </Grid>
              <Grid item
                // class={classes.input}
                xs={12}>
                <TextField
                  className={classes.input}
                  name="Password"
                  label="Password"
                  type="password"
                  value={password}
                  // handleChange={handleChange}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  inputProps={{
                    autoComplete: 'on'
                  }}
                    // error={errors.password}
                />
              </Grid>
            </Grid>


          </Grid>

          {/*// 2*/}
          <Grid item xs={12}>
            <LoginBtn
              className={classes.input}
              color="primary"
              variant="contained"
              type="submit"
              // onClick={()=> {fetchAuthUser(data)}}
              >Login
            </LoginBtn>
          </Grid>
        </Grid>
      </form>

      <OAuthWrapper>

        {/*<OAuthLoginButton*/}
          {/*onClick={(e) => handleTwitchButtonClick(e)}*/}
        {/*>*/}
          {/*<FaTwitch/>*/}
          {/*<FontAwesomeIcon icon={faGoogle} />*/}
          {/*Sign in with Twitch*/}
        {/*</OAuthLoginButton>*/}

        <OAuthLoginButton

          onClick={(e) => handleGoogleButtonClick(e)}
        >
          <FcGoogle/>
          {/*<FontAwesomeIcon icon={faGoogle} />*/}
          Sign in with Google
        </OAuthLoginButton>

        <OAuthLoginButton

          onClick={(e) => handleSpotifyButtonClick(e)}
        >
          <FaSpotifyIcon/>
          Sign in with Spotify
        </OAuthLoginButton>

        <OAuthLoginButton

          onClick={(e) => handleAppleButtonClick(e)}
        >
          <FaApple/>
          Sign in with Apple
        </OAuthLoginButton>

        <OAuthLoginButton

          onClick={(e) => handleDeezerButtonClick(e)}
        >
          <FaDeezer/>

          Sign in with Deezer
        </OAuthLoginButton>

        {/*<OAuthLoginButton

          onClick={(e) => handleUnsplashButtonClick(e)}
        >
          <FaUnsplash/>
          Sign in with Unsplash
        </OAuthLoginButton>

        <OAuthLoginButton

          onClick={(e) => handleInstagramButtonClick(e)}
        >
          <FaInstagram />
          Sign in with Instagram
        </OAuthLoginButton>*/}

        <br style={{ height: '24px' }} />


        <ReAuthenticateButton
          disconnect={() =>
            disconnectTwitch({
              setTwitchAccessToken,
              setEnableTwitch: () => toggleEnabled('twitch'),
            })
          }
          serviceName='Twitch'
        />
        <ReAuthenticateButton
          disconnect={() =>
            disconnectYoutube({
              setYoutubeAccessToken,
              setEnableYoutube: () => toggleEnabled('youtube'),
            })
          }
          serviceName='Youtube'
        />

      </OAuthWrapper>
    </Container>
  )
    // }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (creds) => {
            // dispatch(fetchLoginUser(creds))
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginForm)
