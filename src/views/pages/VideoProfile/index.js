import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "core/actions";
import { useParams } from "react-router-dom";
import Profile from "views/components/Profile";
import VideoIntroduction from "./VideoIntroduction";
// import MovieImageGridList from "./MovieImageGridList";
// import MovieVideoList from "./MovieVideoList";
// import MovieCastGridList from "./MovieCastGridList";
import Recommendations from "./Recommendations";
import { selectors } from "core/reducers/index";
import { verifyCachedData } from "core/utils";

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
          <Typography variant="h6" gutterBottom>
            Videos
          </Typography>
          <Typography variant="h6" gutterBottom>
            Images
          </Typography>
          <Typography variant="h6" gutterBottom>
            Recommendations
          </Typography>
          <Recommendations movieId={movieId} />
        </>
      }

    />
  );
}

export default VideoProfile;
