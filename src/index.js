import React from "react";
import ReactDOM from "react-dom";
import { Router, useLocation, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

// MATERIAL
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

// VIEWS
import App from "views/components/app";
import LoginPage from "views/pages/LoginPage";
import ConfigurationProvider from "views/components/ConfigurationProvider";
import theme from "views/theme";
import 'views/style/global';
import GlobalStyle from 'views/style/global';
import * as serviceWorker from "./serviceWorker";
// import store from "./store";


// CORE
import { store, persistor, sagaMiddleware } from 'core/store';



import rootSaga from "core/sagas/index";
// import rootSaga from "core/sagas/SagaIndex";



// import {createBrowserHistory} from 'history';
// export const history = createBrowserHistory();

import history  from "core/services/history";

const login_url = window.location.pathname
// store.runSaga(rootSaga);
sagaMiddleware.run(rootSaga);

const renderApp = () => {

  // const location = useLocation();
  // const login_url = location.pathname
  // return (
    ReactDOM.render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ConfigurationProvider>

              {/*{(login_url === '/login' ) ? (
                <Router history={history}>
                  <Route path="/login" component={LoginPage} />

                </Router>
              ) : (
                <Router history={history}>
                  <App />
                </Router>
              )}*/}

              <Router history={history}>
                <App />
              </Router>
            </ConfigurationProvider>
          </ThemeProvider>

        </PersistGate>
      </Provider>,
      document.getElementById("root")
    )
  // )

}

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("views/components/app/App", renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
