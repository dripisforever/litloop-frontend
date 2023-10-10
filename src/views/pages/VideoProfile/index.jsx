import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// MATERIAL DONE
// import { Typography } from "@mui/material";
import { StyledTypography } from 'views/styledComponents';
import Profile from "views/components/Profile";
import VideoIntroduction from "./VideoIntroduction";
// import MovieImageGridList from "./MovieImageGridList";
// import MovieVideoList from "./MovieVideoList";
// import MovieCastGridList from "./MovieCastGridList";
import Recommendations from "./Recommendations";

// CORE
import { selectors } from "core/reducers/index";
import { verifyCachedData } from "core/utils";
import { fetchMovie } from "core/actions";

const REQUIRED_FIELDS = ["tagline"];

function VideoProfile() {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingMovie(state, movieId)
  );
  const movie = useSelector(state => selectors.selectMovie(state, movieId));

  useEffect(() => {
    dispatch(fetchMovie(movieId, REQUIRED_FIELDS));
  }, [movieId, dispatch]);

  const loading = isFetching || !verifyCachedData(movie, REQUIRED_FIELDS);

  return (
    <Profile
      loading={loading}
      introduction={<VideoIntroduction movieId={movieId} />}
      main={
        <>
          <StyledTypography variant="h6" gutterBottom>
            Videos
          </StyledTypography>
          <StyledTypography variant="h6" gutterBottom>
            Images
          </StyledTypography>
          <StyledTypography variant="h6" gutterBottom>
            Recommendations
          </StyledTypography>
          <Recommendations movieId={movieId} />
        </>
      }

    />
  );
}

export default VideoProfile;
