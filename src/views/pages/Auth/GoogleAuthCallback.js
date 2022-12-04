import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from "styled-components";
import axios from 'axios';

import { AddCookie, getCookie } from 'views/utils';
import LoadingIndicatorz from 'views/pages/LoadingIndicatorz';
import GoogleAPI from './google/API';
import litloopAPI from './litloop/API';
import { GoogleContext } from './google/useToken';
import Alert from 'views/pages/Alert';
import { footerVisibleAtom, navigationBarVisibleAtom } from 'views/pages/Auth/navigation/atoms';


const GoogleAuthCallback = () => {
  const [error, setError] = useState();
  const { setGoogleAccessToken, setGoogleRefreshToken, setGoogleUserId, setGoogleUsername, setGoogleProfileImage, } = useContext(GoogleContext) || {};
  // const setNavigationBarVisible = useSetRecoilState(navigationBarVisibleAtom);
  // const setFooterVisible = useSetRecoilState(footerVisibleAtom);

  const getAccessToken = useCallback(
    async (url) => {
      const authCode = url.searchParams.get('code');
      console.log(authCode);
      // const requestAccessToken = await litloopAPI.getGoogleAccessToken(authCode);
      const res = await axios.put('http://localhost:8000/auth/google/token', { code: authCode });

      const accessToken = res.data.access_token;
      const refreshToken = res.data.refresh_token;
      // if (setGoogleAccessToken) setGoogleAccessToken(accessToken);
      // if (setGoogleRefreshToken) setGoogleRefreshToken(refreshToken);

      // const MyGoogle = await GoogleAPI.getMe({ accessToken: accessToken }).then(async (res) => {
      //   const user = res?.data?.data?.[0];
      //   setGoogleUserId(user.id);
      //   setGoogleUsername(user.login);
      //   setGoogleProfileImage(user.profile_image_url);
      //
      //   // await litloopAPI.updateGoogleUserData(
      //   //   {
      //   //     Username: user.login,
      //   //     Id: user.id,
      //   //     Profile: user.profile_image_url,
      //   //   },
      //   //   accessToken,
      //   //   refreshToken
      //   // );
      //
      //   return {
      //     Username: user.login,
      //     ProfileImg: user.profile_image_url,
      //     userId: user.id,
      //   };
      // });

      // return { access_token: accessToken, refresh_token: refreshToken, ...MyGoogle };
      return { access_token: accessToken, refresh_token: refreshToken };
    },
    [
      setGoogleAccessToken,
      setGoogleRefreshToken,
      setGoogleUserId,
      setGoogleUsername,
      setGoogleProfileImage,
    ]
  );

  const handleRes = (res) => {
    console.log('successfully authenticated to Google.');
    if (res.access_token) AddCookie('Google-access_token', res.access_token);

    window.opener.postMessage(
      {
        service: 'google',
        access_token: res.access_token,
        refresh_token: res.refresh_token,
        // username: res.Username,
        // profileImg: res.ProfileImg,
        // userId: res.userId,
      },
      '*'
    );

    if (res.access_token) {
      setTimeout(() => window.close(), 100);
    }
  }

  useEffect(() => {
    console.log("DAMNED");
    // setNavigationBarVisible(false);
    // if (setFooterVisible) setFooterVisible(false);
    (async function () {
      try {
        const url = new URL(window.location.href);
        console.log(`URL IS : `);
        if (url.pathname === '/auth/google/callback') {
          console.log(`URL IS : CALLBACK `);

          if (url.searchParams.get('state') === getCookie('Google-myState')) {
            console.log(`URL IS : STATE COOKIE `);
            console.log(url);

            await getAccessToken(url).then((res) => { handleRes(res) })


          } else {
            setError({
              title: 'Google authentication failed.',
              message: "Request didn't come from this website.!",
            });
          }
        } else {
          setError({
            title: 'Google authentication failed.',
            message: 'Authenticate to Google failed.',
          });
        }

      } catch (error) {
        setError(error);
      }
    })();
  }, [getAccessToken ]);

  console.log('google auth callback error:', error);
  if (error) {
    return (
      <Alert data={error} />
    )
  }
  return (
    <div>
      {console.log("AYO CONDUCTOR")}
      <LoadingIndicatorz
        height={150}
        width={150}
        text={'Authenticating..'}
        smallText={'Talking with Google..'}
      />
    </div>
  );
};

export default GoogleAuthCallback;
