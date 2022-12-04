import React, { Component } from 'react';
import { getAccessToken } from 'core/actions/user';
import { store } from 'core/store/index';

import history  from "core/services/history";

class UnsplashCallback extends Component {
  componentDidMount() {
    const { dispatch } = store;
    const URLQStrings = new URLSearchParams(history.location.search);
    const token = URLQStrings.has('token') ? URLQStrings.get('token') : '';
    // get access token
    // dispatch(getAccessToken(code));
    // dispatch(setAccessToken(token));

    // const token = getCookie()
    // dispatch(setAccessToken(token));
  }
  // color: #2b7489
  render() {
    return <h1>UNSPLASH DAMN</h1>;
  }
}

export default UnsplashCallback;
