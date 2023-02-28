import React, { useEffect, useContext } from "react";
import { bindActionCreators } from 'redux';
import { Route, useLocation } from 'react-router-dom';
import { connect, useDispatch, useSelector } from "react-redux";
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';

// VIEWS
import LoginPage from "views/pages/LoginPage";
import Container from "views/styles/Container";
import SidebarContainer from "views/styles/SidebarContainer";

import LegacyRoutes from "views/components/Routes/legacy";
import ModalRoutes from "views/components/ModalRoutes";

import LoadingIndicator from "views/components/LoadingIndicator";
import AppHeader from "views/components/AppHeader";
import AppDrawer from "views/components/AppDrawer";
import BackToTopButton from "views/components/BackToTopButton";
import Player from "views/components/player/Player";
import SideMenu from "views/components/SideMenu";
import UserPlaylists from "views/components/UserPlaylists";
import Footer from 'views/components/footer/Footer';
import { maxWidthContent } from 'views/style/util';
// import { stopSongz, pauseSongz, resumeSongz, audioControlz } from './control';

import TwitchAuthCallback from "views/pages/Auth/TwitchAuthCallback";

// YouTube-Clone
import Sidebar from "views/components/Sidebar";
// import Navbar from "views/components/Navbar";

// CORE
import { playSong, stopSong, pauseSong, resumeSong, } from 'core/actions/index';
import { fetchGenres } from "core/actions";
import { selectors } from "core/reducers/index";
import history  from "core/services/history";

// CONTEXT PRO
import { AccountContext, AccountProvider } from 'views/pages/account/AccountContext';
import { TwitchContext, TwitchProvider } from 'views/pages/Auth/twitch/useToken';
import { GoogleContext, GoogleProvider } from 'views/pages/Auth/google/useToken';
import { SpotifyContext, SpotifyProvider } from 'views/pages/Auth/spotify/useToken';
import { MusicPlayerContext, MusicPlayerProvider } from 'views/components/context/MusicPlayerContext';

import { YoutubeContext, YoutubeProvider } from 'views/pages/Auth/youtube/useToken';

import useEventListenerMemo from 'core/hooks2/useEventListenerMemo';


const Wrapper = styled.div`
  height: 100%;
`;

const Wrapperz = styled.div`
  /* position: fixed; */
`;

const Main = styled.div`
  max-width: ${maxWidthContent}px;
  background: #0f0f0f;
  margin: 0 auto;
  width: 100%;
  /* height: 100%; */
  top: 0;
`;

const Content = styled.div`
  margin-top: 15px;
  margin-top: -15px;
  padding: 0px 16px;
`;

const LeftSide = styled.div`
  width: 20%;
  /* position: relative; */
  /* position: fixed; */
  top: 10px;
  left: 10px;
  bottom: 10px;
  width: 180px;
  overflow-y: auto;
  display: table;
`;

const StyledWrapper = styled.div`

`;
const AppRoutesContainer = () => {
  return (
    <React.StrictMode>
    <RecoilRoot>

          {/*<AccountProvider>
            <TwitchProvider>
              <GoogleProvider>
                <MusicPlayerProvider>*/}
                  <App />
                {/*</MusicPlayerProvider>
              </GoogleProvider>
            </TwitchProvider>
          </AccountProvider>*/}

    </RecoilRoot>
    </React.StrictMode>
  );
};

const App = () => {
  let audio;
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => selectors.selectIsFetchingGenres(state));
  const genres = useSelector(state => selectors.selectGenres(state));
  // const genresCount = Object.keys(genres).length;

  useEffect(() => {
    dispatch(fetchGenres());

  }, [dispatch]);



  const { stopSongz, pauseSongz, resumeSongz, audioControlz } = useContext(MusicPlayerContext) || {};
  const { setTwitchAccessToken, setTwitchRefreshToken, setTwitchUserId, setTwitchUsername, setTwitchProfileImage, } = useContext(TwitchContext) || {};
  const { setGoogleAccessToken, setGoogleRefreshToken, setGoogleUsername, setGoogleProfileImage } = useContext(GoogleContext) || {};
  const { setSpotifyAccessToken, setSpotifyRefreshToken, setSpotifyUsername, setSpotifyProfileImage } = useContext(SpotifyContext) || {};
  // const { setUnsplashAccessToken, setUnsplashRefreshToken, setUnsplashUsername, setUnsplashProfileImage } = useContext(UnsplashContext) || {};
  // const { setYoutubeAccessToken, setYoutubeRefreshToken, setYoutubeUsername, setYoutubeProfileImage } = useContext(YoutubeContext) || {};

  useEventListenerMemo('message', receiveMessage, window, true, { capture: false });
  // useEventListenerMemo('message', receiveMessage2, window, true, { capture: false });

  // window.addEventListener('keydown', function(e) {
  //   if(e.keyCode == 32 && e.target == document.body) {
  //     e.preventDefault();
  //   }
  // });

  function receiveMessage(e) {
    if (e.origin.startsWith('http://localhost:3001') && e.data?.access_token && e.data?.service) {
      if (e.data.service === 'twitch') {
        console.log("Receive postMessage TOKEN");
        console.log(e.data);
        if (setTwitchAccessToken) setTwitchAccessToken(e.data.access_token);
        if (setTwitchRefreshToken) setTwitchRefreshToken(e.data.refresh_token);
        if (setTwitchUsername) setTwitchUsername(e.data.username);
        if (setTwitchUserId) setTwitchUserId(e.data.userId);
        if (setTwitchProfileImage) setTwitchProfileImage(e.data.profileImg);
        // RELOAD
        history.push('/');
      } else if (e.data.service === 'google') {
        if (e.data.access_token && setGoogleAccessToken) setGoogleAccessToken(e.data.access_token);
        if (e.data.username && setGoogleUsername) setGoogleUsername(e.data.username);
        if (e.data.profileImg && setGoogleProfileImage) setGoogleProfileImage(e.data.profileImg);
        // toggleEnabled('youtube', true);
      } else if (e.data.service === 'spotify') {
        if (e.data.access_token && setSpotifyAccessToken) setSpotifyAccessToken(e.data.access_token);
        if (e.data.username && setSpotifyUsername) setSpotifyUsername(e.data.username);
        if (e.data.profileImg && setSpotifyProfileImage) setGoogleProfileImage(e.data.profileImg);
        // toggleEnabled('youtube', true);
      }
    }
  }

  return (
    <>
    <StyledWrapper>
    {/*<React.Fragment>*/}
      {/*<Route path="/login" component={LoginPage} />*/}


      {/*<RecoilRoot>*/}


      {/*<AccountProvider>
        <TwitchProvider>
          <GoogleProvider>
            <MusicPlayerProvider>*/}
      {(pathname === '/login') ? null : (<AppHeader />)}

      {/*<AppDrawer />*/}

      {/*REFERENCE*/}
      {/*/Users/driptamine/Desktop/frontend/Spotify/react-spotify-pau1fitz/src/App.js*/}

      {/*<LeftSide className="left-side-section">
        <Wrapperz>
          <SideMenu />
          <UserPlaylists />
        </Wrapperz>
      </LeftSide>*/}

      {(pathname === '/login' && '/signup') ? null : (<Sidebar />)}


      {(pathname === '/login' && '/signup') ? (
        <SidebarContainer>
          {/*<Route path="auth/twitch/callback" element={<TwitchAuthCallback />} />*/}

          <ModalRoutes
            // stopSong={stopSong}
            // pauseSong={pauseSong}
            // resumeSong={resumeSong}
            // audioControl={audioControl}

            stopSong={stopSongz}
            pauseSong={pauseSongz}
            resumeSong={resumeSongz}
            audioControl={audioControlz}
            // videoControl={videoControlz}
          />
          {/*<LegacyRoutes />*/}
        </SidebarContainer>
      ) : (
        <Container gotsidebar={true} >

          {/*<Route path="auth/twitch/callback" element={<TwitchAuthCallback />} />*/}

          <ModalRoutes
            // stopSong={stopSong}
            // pauseSong={pauseSong}
            // resumeSong={resumeSong}
            // audioControl={audioControl}

            stopSong={stopSongz}
            pauseSong={pauseSongz}
            resumeSong={resumeSongz}
            audioControl={audioControlz}
            // videoControl={videoControlz}
          />
          {/*<LegacyRoutes />*/}
        </Container>
      )}



      {/*REFERENCE pau1fitz/react-spotify-master*/}

      {/*{(pathname === '/login' && '/signup') ? null : (
        <Footer
          stopSong={stopSongz}
          pauseSong={pauseSongz}
          resumeSong={resumeSongz}
          audioControl={audioControlz}
        />
      )}*/}

      <Player />
      {/*<BackToTopButton />*/}

      {/*</YoutubeProvider>*/}

        {/*</MusicPlayerProvider>
        </GoogleProvider>
        </TwitchProvider>
        </AccountProvider>*/}
      {/*</RecoilRoot>*/}
    {/*</React.Fragment>*/}
    </StyledWrapper>
    </>
  );
}


// App.audio = {};
// App.audio = ({ }) => {
//
// }

// export default connect(null, {
//   // playSong,
//   // stopSong,
//   // pauseSong,
//   // resumeSong,
//
//   playSong: playSong,
//   stopSong: stopSong,
//   pauseSong: pauseSong,
//   resumeSong: resumeSong,
// })(App);

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       // fetchUser,
//       // setToken,
//       playSong,
//       stopSong,
//       pauseSong,
//       resumeSong,
//     },
//     dispatch
//   );
// };

// export default connect(
//   null,
//   {
//     playSongzz: playSong,
//     stopSong: stopSong,
//     pauseSongzz: pauseSong,
//     resumeSong: resumeSong,
//   }
// )(App);

// export default connect(
//   null,
//   mapDispatchToProps
// )(App);
// export default App;

export default AppRoutesContainer;
// export default App;
