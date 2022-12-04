import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbum } from "core/actions";
import { useParams } from "react-router-dom";
import Profile from "views/components/Profile";
import AlbumIntroduction from "./AlbumIntroduction";
// import AlbumImageGridList from "./AlbumImageGridList";
// import AlbumVideoList from "./AlbumVideoList";
import AlbumCastGridList from "./AlbumCastGridList";
import SimilarAlbums from "./SimilarAlbums";
import { selectors } from "core/reducers/index";
import { verifyCachedData } from "core/utils";

const REQUIRED_FIELDS = ["tagline"];

function AlbumProfile({stopSong, pauseSong, resumeSong, audioControl}) {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingAlbum(state, albumId)
  );
  const album = useSelector(state => selectors.selectAlbum(state, albumId));

  useEffect(() => {
    dispatch(fetchAlbum(albumId, REQUIRED_FIELDS));
  }, [albumId, dispatch]);

  const loading = isFetching || !verifyCachedData(album, REQUIRED_FIELDS);

  return (
    <Profile
      loading={loading}
      introduction={<AlbumIntroduction albumId={albumId} />}
      main={
        <>

          <Typography variant="h6" gutterBottom>
            Images
          </Typography>
          <Typography variant="h6" gutterBottom>
            Recommendations
          </Typography>

        </>
      }

    />
  );
}

export default AlbumProfile;
