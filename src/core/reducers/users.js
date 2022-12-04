import { combineReducers } from "redux";
import * as actions from "core/actions";
import createIsFetching from "./higherOrderReducers/createIsFetching";
import createByKey from "./higherOrderReducers/createByKey";
import { REHYDRATE } from 'redux-persist/lib/constants';

// import { USER_LOGGEDIN, USER_LOGGEDOUT } from '../config/actionTypes'
const initialState = null
// import * as types from '../actions';

// export const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case actions.fetchAuthUser:
//       return action.data
//
//     case actions.fetchLogout:
//       return initialState
//
//     default:
//       return state
//   }
// };

// export default function(state = [], action) {



// const initialState = {
//     id: null,
//     token: null,
// }

export default function(state = initialState, action) {
  const response = action.payload;

  switch(action.type) {
    // case REHYDRATE:
      // return {  };
    case REHYDRATE:
      return { ...state, ...response };
    // case REHYDRATE:
      // return { ...state, response };
    // case REHYDRATE:
      // return  initialState;

    case actions.fetchAuthUser:
      return { ...state, response };
    // case actions.setAccessToken:
    case "setToken/fetch":
      console.log("setToken/fetch");
      return { ...state, ...response };

    case "token/get":
      console.log("GET_access");
      return { ...state, ...response };

    case actions.fetchLogout:
      return { ...state, response };

    case 'USER_LOGGEDOUT':
      return initialState;

    case "user/setUserProfile":
      console.log("SETT");
      return { ...state, ...response };

    case "user/fetchCurrentUser/succeeded":
      console.log("SETT");
      return { ...state, ...response };
    // case types.LOGIN_USER_ERROR:
    //   return { ...state, response };

    case 'user/SE_ACCESS_TOKEN': {
      const { scope, ...others } = action.payload;
      return Object.assign({}, state, {
        isAuthorized: true,
        token: {
          ...others,
          user_scope: scope.split(' '),
        },
      });
    }
    // setUserProfile
    // case 'user/SE_USER_PROFILE': {
    //   const { links, ...others } = action.payload;
    //   const userProfile = Object.assign({}, camelCaseKeys(others));
    //   // like > state.user.userProfile
    //   return Object.assign({}, state, {
    //     userProfile,
    //     links,
    //   });
    // }

    default:
      return state;
  }
};

// export function clientReducer(state = initialState, action ) {
//     switch(action.type) {
//         // case CLIENT_SET:
//         case "setToken/fetch":
//             return {
//                 id: action.payload.token.userId,
//                 token: action.payload.token,
//             }
//         // case CLIENT_UNSET:
//         case "USER_LOGGEDOUT":
//             return {
//                 id: null,
//                 token: null,
//             }
//         default:
//             return state
//     }
// }

export const selectors = {
  // selectMovie,
  // token: createIsFetching(actions.fetchAuthUser),
  // selectMovies: (state, movieIds) =>
  //   movieIds.map(movieId => selectMovie(state, movieId)),

};
