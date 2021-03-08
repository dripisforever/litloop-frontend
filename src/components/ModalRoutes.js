import React from "react";
// import { Route, Redirect } from "react-router-dom";
import { Route, Redirect, useLocation } from "react-router-dom";
import PopularMovies from "pages/PopularMovies";
import MovieProfile  from "pages/MovieProfile";
import PersonProfile from "pages/PersonProfile";
import PopularPeople from "pages/PopularPeople";
import SearchResults from "pages/SearchResults";
import SwitchWithScrollRestoration from "components/SwitchWithScrollRestoration";

import ModalSwitch from "components/ModalSwitch";
import ModalMui    from "components/ModalMui";
import ModalRoute  from "components/ModalRoute";
import ModalMovie  from "components/ModalMovie";

import MovieCard  from "components/MovieCard";



function ModalRoutes() {
  // const location = useLocation();
  return (
    <ModalSwitch
      renderModal={({open, redirectToBack, location }) => (
        <ModalMui open={open} scroll="body" onExited={redirectToBack} location={location}>
          {/*<ModalRoute defaultParentPath="/movies" path="/movies/:id" component={ModalMovie}/>*/}
          {/*<ModalRoute defaultParentPath="/movies" path="/movies/:movieId" component={MovieCard}/>*/}
          <ModalRoute defaultParentPath="/movies" path="/movies/:movieId" component={MovieProfile}/>
        </ModalMui>
      )}
    >
      
    </ModalSwitch>
  );
}

export default ModalRoutes;
